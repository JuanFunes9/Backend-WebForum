const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');

//-------------------S3 CLIENT-------------------------//
const client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_PUBLIC_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
});

//-------------------S3 Methods-------------------------//
const uploadFile = async (file) => {
  const stream = fs.createReadStream(file);
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.name,
    Body: stream
  }

  const command = new PutObjectCommand( uploadParams );
  const response = await client.send(command);

  console.log(response);
}

module.exports = {
  uploadFile
}