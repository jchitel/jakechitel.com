// The HTTPS certificate, which is registered to the load balancer
resource "aws_acm_certificate" "jakechitel_com" {
    domain_name = "*.jakechitel.com"
    validation_method = "DNS"
}
