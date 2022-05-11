#!/bin/bash
set -e
rm -f ../lambda-sqs-demo.zip 
zip -r ../lambda-sqs-demo.zip *
cd .. 
aws lambda update-function-code --function-name StagingSendPushNotification --zip-file fileb://lambda-sqs-demo.zip
