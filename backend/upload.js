import AWS from 'aws-sdk';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// Configure AWS
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = 'cake-factory-db';

console.log('Importing products into DynamoDB. Please wait.');

// Read and parse the JSON file
const products = JSON.parse(fs.readFileSync('src/data/master-data.json', 'utf8'));

products.forEach((product) => {
  const params = {
    TableName: tableName,
    Item: {
      ...product,
    },
  };

  docClient.put(params, (err, data) => {
    if (err) {
      console.error(`Unable to add product ${product.name}. Error JSON:`, JSON.stringify(err, null, 2));
    } else {
      console.log(`Successfully uploaded: ${product.name}`);
    }
  });
});