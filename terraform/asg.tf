// We need to specifically use an ECS-optimized Amazon Linux image in order to take advantage of all ECS features.
// Turns out that it's a bitch to find images, but this simple filter should do it for us.
data "aws_ami" "ecs-optimized" {
    owners = ["amazon"]
    // This ensures that we end up with exactly one image, and as an added bonus each time we deploy
    // we will update to the newest image.
    most_recent = true

    // This seems to be the only way to filter explicitly for these ECS-optimized images
    filter {
        name = "name"
        values = ["amzn2-ami-ecs-hvm-*"]
    }

    // These images are available for both x86 and amd64, so we need to filter for that
    filter {
        name = "architecture"
        values = ["x86_64"]
    }
}

// This is the configuration that the autoscaling group will use to launch instances
resource "aws_launch_configuration" "ecs-launch-configuration" {
    image_id                    = data.aws_ami.ecs-optimized.id
    // t3.micro seems to be a good cheap starting size.
    // If it isn't enough, we can bump up the min/max size of the autoscaling group 
    // and reserve another instance until the current reservation is up, then use a bigger instance type.
    instance_type               = "t3.micro"
    iam_instance_profile        = aws_iam_instance_profile.ecs-instance-profile.arn

    ebs_block_device {
        device_name = "/dev/xvdcz"
        volume_type = "gp2"
        volume_size = 22
        delete_on_termination = false
    }

    lifecycle {
        create_before_destroy = true
    }

    security_groups             = [aws_security_group.main.id]
    associate_public_ip_address = "true"
    // The name of the key pair that I created for this service
    key_name                    = "personal-site"
    // This is the bit that actually registers these instances with the ECS cluster.
    // This is simply a script that runs when the instance starts up, and the ECS agent
    // reads it when it initializes.
    user_data                   = <<EOF
                                  #!/bin/bash
                                  echo ECS_CLUSTER=${aws_ecs_cluster.main-cluster.name} >> /etc/ecs/ecs.config
                                  EOF
}

// The autoscaling group is what spins up instances for us.
resource "aws_autoscaling_group" "ecs-autoscaling-group" {
    // The ASG will never launch more than this many instances
    max_size                    = 1
    // The ASG will never have fewer than this many instances running
    min_size                    = 0
    // This is the initial number of instances that we would like running.
    // I don't quite see the difference between this and `min_size` so I just keep them equal.
    desired_capacity            = 1
    // Ensure that we launch instances in both availability zones
    vpc_zone_identifier         = [aws_subnet.main_1a.id, aws_subnet.main_1b.id]
    launch_configuration        = aws_launch_configuration.ecs-launch-configuration.name
    // I'm not entirely sure what this does, it may just defer to the load balancer for health checking.
    // I don't know how the ASG knows which ELB to talk to though.
    health_check_type           = "EC2"
    health_check_grace_period = 0

    lifecycle {
        create_before_destroy = true
    }
}
