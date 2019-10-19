terraform {
  backend "remote" {
    organization = "jake-chitel"

    workspaces {
      name = "jakechitel-com"
    }
  }
}

provider "aws" {
  profile    = "default"
  region     = "us-east-1"
}