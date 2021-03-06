const aws = require("@pulumi/aws");
const pulumi = require("@pulumi/pulumi");
const mime = require("mime");

let siteBucket = new aws.s3.Bucket("s3-website-bucket", {
  website: {
    indexDocument: "index.html",
  },
});

function publicReadPolicyForBucket(bucketName) {
  return JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: ["s3:GetObject"],
        Resource: [
          `arn:aws:s3:::${bucketName}/*`, // policy refers to bucket name explicitly
        ],
      },
    ],
  });
}

// Set the access policy for the bucket so all objects are readable
let bucketPolicy = new aws.s3.BucketPolicy("bucketPolicy", {
  bucket: siteBucket.bucket, // depends on siteBucket -- see explanation below
  policy: siteBucket.bucket.apply(publicReadPolicyForBucket),
  // transform the siteBucket.bucket output property -- see explanation below
});

let siteDir = "dist"; // directory for content files

// For each file in the directory, create an S3 object stored in `siteBucket`
for (let item of require("fs").readdirSync(siteDir)) {
  let filePath = require("path").join(siteDir, item);
  let object = new aws.s3.BucketObject(item, {
    bucket: siteBucket,
    source: new pulumi.asset.FileAsset(filePath), // use FileAsset to point to a file
    contentType: mime.getType(filePath) || undefined, // set the MIME type of the file
  });
}

exports.bucketName = siteBucket.bucket; // create a stack export for bucket name
exports.websiteUrl = siteBucket.websiteEndpoint; // output the endpoint as a stack output
