data "aws_ecr_repository" "repo" {
    name = "personal-site"
}

data "aws_ecr_image" "personal-site" {
    repository_name = data.aws_ecr_repository.repo.name
    image_tag = "latest"
}

resource "aws_ecs_cluster" "main-cluster" {
    name = "personal-site-cluster"
}

data "aws_ecs_task_definition" "taskdef" {
    task_definition = aws_ecs_task_definition.taskdef.family
}

resource "aws_ecs_task_definition" "taskdef" {
    family                = "personal-site-task"
    network_mode          = "awsvpc"
    cpu                   = 512
    memory                = 256

    requires_compatibilities = ["EC2"]

    

    container_definitions = <<DEFINITION
[{
    "name": "node-service",
    "image": "${data.aws_ecr_repository.repo.repository_url}@${data.aws_ecr_image.personal-site.image_digest}",
    "cpu": 512,
    "memoryReservation": 256,
    "portMappings": [{
        "containerPort": 80,
        "hostPort": 80,
        "protocol": "tcp"
    }],
    "essential": true,
    "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
            "awslogs-group": "/ecs/personal-site-task",
            "awslogs-region": "us-east-1",
            "awslogs-stream-prefix": "ecs"
        }
    }
}]
DEFINITION
}

resource "aws_ecs_service" "service" {
    name            = "personal-site-service"
  	cluster         = aws_ecs_cluster.main-cluster.id
  	task_definition = "${aws_ecs_task_definition.taskdef.family}:${max(aws_ecs_task_definition.taskdef.revision, data.aws_ecs_task_definition.taskdef.revision)}"
  	desired_count   = 1
    health_check_grace_period_seconds = 0

    deployment_controller {
        type = "ECS"
    }

  	load_balancer {
        target_group_arn  = aws_alb_target_group.ecs-target-group.arn
        container_port    = 80
        container_name    = "node-service"
	}

    network_configuration {
        assign_public_ip = false
        security_groups  = [
            "sg-00f4bdd09a511017f",
        ]
        subnets          = [
            "subnet-02ca1f0cbc9de7e8b",
            "subnet-05566a151df16ddfc",
        ]
    }

    ordered_placement_strategy {
        field = "attribute:ecs.availability-zone"
        type  = "spread"
    }

    ordered_placement_strategy {
        field = "instanceId"
        type  = "spread"
    }
}