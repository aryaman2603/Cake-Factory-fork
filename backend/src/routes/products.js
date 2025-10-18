import express from 'express';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Configure AWS SDK
AWS.config.update({ region: process.env.AWS_REGION });
const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = 'cake-factory-db';

// GET all products
router.get('/', async (req, res) => {
  const params = {
    TableName: tableName,
  };
  try {
    const data = await docClient.scan(params).promise();
    res.json(data.Items);
  } catch (error) {
    console.error('DynamoDB Error:', error);
    res.status(500).json({ error: 'Could not fetch products' });
  }
});

// GET a single product by ID
router.get('/:id', async (req, res) => {
  const params = {
    TableName: tableName,
    Key: {
      id: parseInt(req.params.id),
    },
  };
  try {
    const data = await docClient.get(params).promise();
    if (data.Item) {
      res.json(data.Item);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('DynamoDB Error:', error);
    res.status(500).json({ error: 'Could not fetch product' });
  }
});

// POST (add) a new product
router.post('/', async (req, res) => {
  const { name, price, description, image, category, inStock } = req.body;
  const newProduct = {
    id: Date.now(), // Use a timestamp for a unique ID
    name,
    price,
    description,
    image,
    category,
    inStock
  };
  const params = {
    TableName: tableName,
    Item: newProduct,
  };
  try {
    await docClient.put(params).promise();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('DynamoDB Error:', error);
    res.status(500).json({ error: 'Could not add product' });
  }
});

// PUT (update) a product by ID
router.put('/:id', async (req, res) => {
    const { name, price, description } = req.body;
    const params = {
        TableName: tableName,
        Key: {
            id: parseInt(req.params.id)
        },
        UpdateExpression: 'set #n = :n, price = :p, description = :d',
        ExpressionAttributeNames: {
            '#n': 'name' // 'name' is a reserved word in DynamoDB
        },
        ExpressionAttributeValues: {
            ':n': name,
            ':p': price,
            ':d': description
        },
        ReturnValues: 'ALL_NEW'
    };

    try {
        const data = await docClient.update(params).promise();
        res.json(data.Attributes);
    } catch (error) {
        console.error('DynamoDB Error:', error);
        res.status(500).json({ error: 'Could not update product' });
    }
});

// DELETE a product by ID
router.delete('/:id', async (req, res) => {
    const params = {
        TableName: tableName,
        Key: {
            id: parseInt(req.params.id)
        }
    };

    try {
        await docClient.delete(params).promise();
        res.status(204).send(); // 204 No Content is a standard success response for delete
    } catch (error) {
        console.error('DynamoDB Error:', error);
        res.status(500).json({ error: 'Could not delete product' });
    }
});


export default router;