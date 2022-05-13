const firebase = require('firebase-admin')
const AWS = require("aws-sdk");
const ssm = new AWS.SSM();
const { v4: uuidv4 } = require('uuid')

exports.handler = async (event) => {
    const paramaters = await ssm.getParameters({
      Names: ['staging-firebase-config']
    }).promise();
    const jsonFirebaseConfig = JSON.parse(paramaters.Parameters[0].Value);
    if(firebase.apps.length == 0) { 
      firebase.initializeApp({
        credential: firebase.credential.cert({
            projectId: jsonFirebaseConfig.project_id,
            privateKey: jsonFirebaseConfig.private_key, 
            clientEmail: jsonFirebaseConfig.client_email 
          })
        })
    }

    for (const element of event.Records) {
      const record = JSON.parse(element.body);
      const title = record.title;
      const body = record.body;
      const token = record.token;
      const messageObj = {
        apns: {
          payload: {
            aps: {
              'content-available': 1,
              'apns-priority': 10
            }
          }
        },
        notification: { title, body },
        data: {
          id: uuidv4()
        },
        token,
      }
      return firebase.messaging()
        .send(messageObj)
        .then((response) => {
        const error = response.results
        if (error) {
          console.log(error)
        } else {
          console.log('Sent', response)
        }
      })
      .catch((error) => {
        console.log('Error sending message:', error)
      })
    }
};
