output "s3_bucket_name" {
  value = data.aws_s3_bucket.web_s3_bucket.bucket
}

output "s3_bucket_website_endpoint" {
  value = data.aws_s3_bucket.web_s3_bucket.website_endpoint
}

output "cloudfront_endpoint_fqdn" {
  value = aws_route53_record.app.fqdn
}
