import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import {
  CloudFrontWebDistribution,
  OriginAccessIdentity,
} from "aws-cdk-lib/aws-cloudfront";
import { CanonicalUserPrincipal, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

export class StaticSiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const cloudfrontOAI = new OriginAccessIdentity(this, "MyStaticSiteOAI");

    const bucket = new Bucket(this, "MyStaticSiteBucket", {
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
    });

    const bucketPolicy = new PolicyStatement({
      actions: ["s3:GetObject"],
      resources: [bucket.arnForObjects("*")],
      principals: [
        new CanonicalUserPrincipal(
          cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
        ),
      ],
    });

    bucket.addToResourcePolicy(bucketPolicy);

    const distribution = new CloudFrontWebDistribution(
      this,
      "MyStaticSiteDistribution",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket,
              originAccessIdentity: cloudfrontOAI,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
        defaultRootObject: "index.html",
      }
    );

    new BucketDeployment(this, "MyStaticSiteDeployment", {
      sources: [Source.asset("./dist")],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ["/*"],
    });

    new CfnOutput(this, "bucket", { value: bucket.bucketName });
    new CfnOutput(this, "distribution", {
      value: distribution.distributionDomainName,
    });
  }
}
