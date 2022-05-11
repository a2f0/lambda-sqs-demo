const admin = require('firebase-admin')
const AWS = require("aws-sdk");
const ssm = new AWS.SSM();

exports.handler = async (event) => {
    const data= await ssm.getParameters({
        Names: ['staging-firebase-project-id', 'staging-firebase-private-key', 'staging-firebase-client-email' ]
    }).promise();
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: data.Parameters[0].Value,
        privateKey: privateKey,
        clientEmail: data.Parameters[2].Value,
      })
    })
};
