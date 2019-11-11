terraform {
  backend "remote" {
    hostname = "app.terraform.io"
    organization = "jake-chitel"

    workspaces {
      name = "jakechitel-com"
    }
  }
}

provider "aws" {
  region     = "us-east-1"
}