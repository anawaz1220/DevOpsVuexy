variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "prefix" {
  default = "ezzton"
}

variable "project" {
  default = "ezzton-frontend"
}

variable "contact" {
  default = "nelo@efaci.ca"
}

variable "route53_domain" {
  default = "efaci-saas.net"
}

variable "s3_bucket_name" {
  default = "web-ezzton.dev.efaci-saas.net"
}

variable "subdomain" {
  description = "Subdomain per environment"
  type        = map(string)
  default = {
    production = "web"
    staging    = "web.staging"
    dev        = "web.dev"
  }
}
