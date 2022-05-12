#!/bin/sh
set -e
aws lambda invoke \
    --function-name StagingSendPushNotification \
    --cli-binary-format raw-in-base64-out \
    --payload file://lambdaPayload.json \
    response.json \
    --log-type Tail \
    --query 'LogResult' --output text | base64 -d

