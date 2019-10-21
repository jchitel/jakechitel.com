# Service Role
resource "aws_iam_role" "ecs-service-role" {
    assume_role_policy = "${data.aws_iam_policy_document.ecs-service-assume-role-policy}"
}

resource "aws_iam_role_policy_attachment" "ecs-service-role-policy" {
    role = "${aws_iam_role.ecs-service-role.name}"
    policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceRole"
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

# Instance Role
resource "aws_iam_role" "ecs-instance-role" {
    assume_role_policy = "${data.aws_iam_policy_document.ecs-instance-assume-role-policy}"
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

resource "aws_iam_role_policy_attachemnt" "ecs-instance-role-policy" {
    role = "${aws_iam_role.ecs-instance-role.name}"
    policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

resource "aws_iam_instance_profile" "ecs-instance-profile" {
    roles = ["${aws_iam_role.ecs-instance-role.id}"]
}