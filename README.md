# Results

- 30 - S3 bucket has been created and configured properly. The app has been uploaded to the bucket and is available though the Internet. Nothing else has been done.
- 40 - In addition to the previous work a CloudFront distribution is created and configured properly and the site is served now with CloudFront and is available through the Internet over CloudFront URL, not S3-website link (due to changes in bucket’s policy...).

- 30 - S3 bucket creation, website deployment, CloudFront Distribution and Invalidation added and configured by using AWS CDK. The app can be built and deployed by running npm script command. (Link to CloudFront website is provided. PR with all changes is submitted in the YOUR OWN frontend repository and its link is provided for review.

# Links

- [Deploy to S3 Bucket](http://rs-school-shop-bucket.s3-website.eu-north-1.amazonaws.com/)
- [Deploy to CloudFront](https://d3jquy3xxdhpdz.cloudfront.net/)
- [Deploy to CloudFront using aws-cdk with newly created S3 Bucket to statically host the website](https://d219anjo9nkjx5.cloudfront.net)
