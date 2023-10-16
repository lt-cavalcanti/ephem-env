// const fs = require("fs");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const customers = require("./src/main-table/items/customers");

// ============================================================
// Create DynamoDB client
// ============================================================
const client = new DynamoDBClient({
  region: "localhost",
  endpoint: "http://localhost:4566",
});
const ddbDocClient = DynamoDBDocumentClient.from(client);

// ============================================================
// Get all "main-table" items that need to be inserted
// ============================================================
// const mainTableItems = fs.readdirSync("./src/main-table/items").map((file) => {
//   return require(`./src/main-table/items/${file}`);
// });

// ============================================================
// Insert all "main-table" items inside inside DynamoDB
// ============================================================
customers.forEach(async (item) => {
  try {
    await ddbDocClient.send(
      new PutCommand({
        TableName: "main-table",
        Item: item,
      })
    );
    console.log(item.SK, "inserted");
  } catch (err) {
    console.error(err);
  }
});
