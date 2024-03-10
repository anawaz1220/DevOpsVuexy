locals {
  cloudfront_endpoint = "web.${terraform.workspace}.efaci-saas.net"
  acm_cert_domain     = "${lookup(var.subdomain, terraform.workspace)}.${var.route53_domain}"
}

locals {
  cloudfront_origin_id = data.aws_s3_bucket.web_s3_bucket.website_endpoint
}

data "aws_route53_zone" "frontend" {
  name         = var.route53_domain
  private_zone = false
}

# cloud front certificates have to be deployed in us-east-1 certificate manager
provider "aws" {
  region = "us-east-1"
  alias  = "us-east-1"
}

data "aws_acm_certificate" "app" {
  domain   = local.acm_cert_domain
  provider = aws.us-east-1
}

resource "aws_cloudfront_response_headers_policy" "security_headers_policy" {
  name = "content-security-policy"
  security_headers_config {
    content_security_policy {
      content_security_policy = "frame-ancestors 'self';"
      override                = true
    }
  }
}

resource "aws_cloudfront_distribution" "app" {
  origin {
    domain_name = local.cloudfront_origin_id
    origin_id   = local.cloudfront_origin_id
    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_protocol_policy   = "http-only"
      origin_ssl_protocols     = ["TLSv1.2"]
      origin_keepalive_timeout = 5
      origin_read_timeout      = 30
    }
  }
  enabled         = true
  is_ipv6_enabled = true
  comment         = local.cloudfront_endpoint

  aliases = [local.cloudfront_endpoint]

  default_cache_behavior {
    allowed_methods            = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods             = ["HEAD", "GET"]
    target_origin_id           = local.cloudfront_origin_id
    response_headers_policy_id = aws_cloudfront_response_headers_policy.security_headers_policy.id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
  }

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Name = local.cloudfront_endpoint
  }

  viewer_certificate {
    acm_certificate_arn      = data.aws_acm_certificate.app.arn
    minimum_protocol_version = "TLSv1.2_2018"
    ssl_support_method       = "sni-only"
  }
}

resource "aws_route53_record" "app" {
  zone_id = data.aws_route53_zone.frontend.zone_id
  name    = local.cloudfront_endpoint
  type    = "CNAME"
  ttl     = "900"
  records = [aws_cloudfront_distribution.app.domain_name]
}
