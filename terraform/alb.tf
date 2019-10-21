resource "aws_alb" "ecs-load-balancer" {
    security_groups = ["${aws_security_group.main.id}"]
    subnets = [
        "${aws_subnet.main_1a.id}",
        "${aws_subnet.main_1b.id}"
    ]
}