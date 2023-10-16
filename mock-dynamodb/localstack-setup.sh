#!/bin/sh

awslocal dynamodb create-table \
    --table-name main-table \
    --attribute-definitions \
    AttributeName=PK,AttributeType=S AttributeName=SK,AttributeType=S \
    --key-schema AttributeName=PK,KeyType=HASH AttributeName=SK,KeyType=RANGE \
    --provisioned-throughput ReadCapacityUnits=250,WriteCapacityUnits=250 \
    --global-secondary-indexes \
        "[
            {
                \"IndexName\": \"GSI1\",
                \"KeySchema\": [{\"AttributeName\":\"SK\",\"KeyType\":\"HASH\"},
                                {\"AttributeName\":\"PK\",\"KeyType\":\"RANGE\"}],
                \"Projection\": {
                    \"ProjectionType\":\"ALL\"
                },
                \"ProvisionedThroughput\": {
                    \"ReadCapacityUnits\": 250,
                    \"WriteCapacityUnits\": 250
                }
            }
        ]"

cd /etc/localstack/init/ready.d/

npm install

node index.js