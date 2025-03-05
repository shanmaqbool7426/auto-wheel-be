import AWS from 'aws-sdk';

// Configure AWS with your credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, 
});

const s3 = new AWS.S3();

export const uploadToS3 = async (buffer, fileName) => {
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${Date.now()}_${fileName}`,
    Body: buffer,
  };
  
  try {
    const uploadResult = await s3.upload(uploadParams).promise();
    return uploadResult.Location; // Returns the URL of the uploaded file
  } catch (err) {
    throw new Error(err.message);
  }
};

