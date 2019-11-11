resource "aws_vpc" "main" {
    cidr_block = "10.0.0.0/16"
}

resource "aws_internet_gateway" "main" {
    vpc_id = "${aws_vpc.main.id}"
}

resource "aws_subnet" "main_1a" {
    vpc_id = "${aws_vpc.main.id}"
    cidr_block = "10.0.0.0/24"
    availability_zone = "us-east-1a"
    map_public_ip_on_launch = true
}

resource "aws_subnet" "main_1b" {
    vpc_id = "${aws_vpc.main.id}"
    cidr_block = "10.0.1.0/24"
    availability_zone = "us-east-1b"
    map_public_ip_on_launch = true
}

resource "aws_route_table" "main" {
    vpc_id = "${aws_vpc.main.id}"
    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = "${aws_internet_gateway.main.id}"
    }
}

resource "aws_route_table_association" "main_1a" {
    subnet_id = "${aws_subnet.main_1a.id}"
    route_table_id = "${aws_route_table.main.id}"
}

resource "aws_route_table_association" "main_1b" {
    subnet_id = "${aws_subnet.main_1b.id}"
    route_table_id = "${aws_route_table.main.id}"
}

resource "aws_security_group" "main" {
    description = "ECS Allowed Ports"
    vpc_id = "${aws_vpc.main.id}"
    ingress {
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = [
            "0.0.0.0/0"
        ]
    }
    
    ingress {
        from_port = 443
        to_port = 443
        protocol = "tcp"
        cidr_blocks = [
            "0.0.0.0/0"
        ]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = -1
        cidr_blocks = [
            "0.0.0.0/0"
        ]
    }
}

resource "aws_security_group" "alb" {
    description = "Personal Site ALB Security Group"
    vpc_id = "${aws_vpc.main.id}"
    ingress {
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = [
            "0.0.0.0/0"
        ]
    }
    
    ingress {
        from_port = 443
        to_port = 443
        protocol = "tcp"
        cidr_blocks = [
            "0.0.0.0/0"
        ]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = -1
        cidr_blocks = [
            "0.0.0.0/0"
        ]
    }
}