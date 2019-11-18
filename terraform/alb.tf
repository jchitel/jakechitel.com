resource "aws_alb" "ecs-load-balancer" {
    security_groups = [aws_security_group.alb.id]
    subnets = [
        aws_subnet.main_1a.id,
        aws_subnet.main_1b.id
    ]
}

resource "aws_alb_listener" "port-80" {
    load_balancer_arn = aws_alb.ecs-load-balancer.arn
    port = "80"
    protocol = "HTTP"

    default_action {
        type = "redirect"

        redirect {
            port        = "443"
            protocol    = "HTTPS"
            status_code = "HTTP_301"
        }
    }
}

resource "aws_alb_listener_rule" "http-root-to-www" {
    listener_arn = aws_alb_listener.port-80.arn
    priority = 1

    condition {
        field = "host-header"
        values = ["jakechitel.com"]
    }

    action {
        type = "redirect"

        redirect {
            host = "www.jakechitel.com"
            port = 443
            protocol = "HTTPS"
            status_code = "HTTP_301"
        }
    }
}

resource "aws_alb_listener" "port-443" {
    load_balancer_arn = aws_alb.ecs-load-balancer.arn
    port              = "443"
    protocol          = "HTTPS"

    certificate_arn = aws_acm_certificate.jakechitel_com.arn

    default_action {
        target_group_arn = aws_alb_target_group.ecs-target-group.arn
        type             = "forward"
    }
}

resource "aws_alb_listener_rule" "https-root-to-www" {
    listener_arn = aws_alb_listener.port-443.arn
    priority = 1

    condition {
        field = "host-header"
        values = ["jakechitel.com"]
    }

    action {
        type = "redirect"

        redirect {
            host = "www.jakechitel.com"
            status_code = "HTTP_301"
        }
    }
}

resource "aws_alb_target_group" "ecs-target-group" {
    port = 80
    protocol = "HTTP"
    vpc_id = aws_vpc.main.id
    target_type = "ip"

    health_check {
        healthy_threshold = 5
        unhealthy_threshold = 2
        interval = 30
        matcher = 200
        path = "/health-check"
        port = 80
        protocol = "HTTP"
        timeout = 5
    }

    lifecycle {
        create_before_destroy = true
    }
}
