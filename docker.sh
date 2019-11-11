#!/bin/bash

# Log in to the ECR repository
which aws
$(aws ecr get-login --no-include-email --region us-east-1)

# Build the image
docker build -t personal-site .

# Add tags
docker tag personal-site:latest 289214495984.dkr.ecr.us-east-1.amazonaws.com/personal-site:latest

# Push the image
docker push 289214495984.dkr.ecr.us-east-1.amazonaws.com/personal-site:latest
