resource "aws_route53_zone" "jakechitel_com" {
    name = "jakechitel.com."
}

resource "aws_route53_record" "root-to-www" {
  zone_id = aws_route53_zone.jakechitel_com.zone_id
  name    = "jakechitel.com."
  type    = "A"

  alias {
    name                   = aws_route53_record.alb_route_record.name
    zone_id                = aws_route53_zone.jakechitel_com.zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "alb_route_record" {
  zone_id = aws_route53_zone.jakechitel_com.zone_id
  name    = "www.jakechitel.com."
  type    = "A"

  alias {
    name                   = aws_alb.ecs-load-balancer.dns_name
    zone_id                = aws_alb.ecs-load-balancer.zone_id
    evaluate_target_health = false
  }
}