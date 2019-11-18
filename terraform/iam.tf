# Service Role
resource "aws_iam_role" "ecs-service-role" {
    description           = "Role to enable Amazon ECS to manage your cluster."
    assume_role_policy = data.aws_iam_policy_document.ecs-service-assume-role-policy.json
    path = "/aws-service-role/ecs.amazonaws.com/"
}

resource "aws_iam_role_policy_attachment" "ecs-service-role-policy" {
    role = aws_iam_role.ecs-service-role.name
    policy_arn = "arn:aws:iam::aws:policy/aws-service-role/AmazonECSServiceRolePolicy"
}

data "aws_iam_policy_document" "ecs-service-assume-role-policy" {
    statement {
        actions = ["sts:AssumeRole"]
        principals {
            type = "Service"
            identifiers = ["ecs.amazonaws.com"]
        }
    }
}

# Role used by the autoscaling group launch configuration so that it can run the ECS agent
resource "aws_iam_role" "ecs-instance-role" {
    assume_role_policy = data.aws_iam_policy_document.ecs-instance-assume-role-policy.json
}

data "aws_iam_policy_document" "ecs-instance-assume-role-policy" {
    statement {
        actions = ["sts:AssumeRole"]
        principals {
            type = "Service"
            identifiers = ["ec2.amazonaws.com"]
        }
    }
}

resource "aws_iam_role_policy_attachment" "ecs-instance-role-policy" {
    role = aws_iam_role.ecs-instance-role.name
    policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

// This is what the launch configuration actually uses to get the role
resource "aws_iam_instance_profile" "ecs-instance-profile" {
    role = aws_iam_role.ecs-instance-role.id
}