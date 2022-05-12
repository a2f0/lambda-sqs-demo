#!/bin/bash
set -e
npm install
zip -r ../lambda-sqs-demo.zip *
cd .. 
aws lambda update-function-code --function-name StagingSendPushNotification --zip-file fileb://lambda-sqs-demo.zip
rm -rf lambda-sqs-demo.zip 
