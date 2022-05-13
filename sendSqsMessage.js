#!/usr/bin/env node
console.info('sending SQS notification')
const aws = require('aws-sdk');
aws.config.update({region: 'us-east-1'});

const sqs = new aws.SQS({apiVersion: '2012-11-05'});

const params = {
    MessageBody: JSON.stringify({
        token: "drRkHQqGJEdEt3_fQM8Lk8:APA91bE6nlC0qMjDOVAQSNeofCXoGd0GVb1p7BWdfpE8kl-BEoDERVXin4Z-2WKohYToho-asQrRiIcAxkEHnFQjXkQ5z-ftE4VW--RraBvsy8zWk65hlxV_mDuK7_8ZtLw_kXJLli8P",
        title: "push notification title",
        body: "push notification body"

    }),
    QueueUrl: `${process.env.SQS_URL}`
};

sqs.sendMessage(params, function(err, data) {
    console.log("Done sendMessage")
    if (err) {
     console.log("Error", err);
    } else {
     console.log("Success", data);
    }
});
