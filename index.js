const firebase = require('firebase-admin')
const AWS = require("aws-sdk");
const ssm = new AWS.SSM();
const { v4: uuidv4 } = require('uuid')



exports.handler = async (event) => {
    const data= await ssm.getParameters({
      Names: ['staging-firebase-project-id', 'staging-firebase-private-key', 'staging-firebase-client-email' ]
    }).promise();

    if(firebase.apps.length == 0) { 
      firebase.initializeApp({
        credential: firebase.credential.cert({
            projectId: data.Parameters[0].Value,
            privateKey: data.Parameters[1].Value,
            clientEmail: data.Parameters[2].Value,
          })
        })
    }

    for (const element of event.Records) {
      console.log(element.body.token);
      // const messageObj = {
      //   apns: {
      //     payload: {
      //       aps: {
      //         'content-available': 1,
      //         'apns-priority': 10
      //       }
      //     }
      //   },
      //   notification: { event.title, event.body },
      //   data: {
      //     id: uuidv4()
      //   },
      //   element.body.token
      // }
    }
    
  
    // return admin.messaging()
    //   .send(messageObj)
    //   .then((response) => {
    //     const error = response.results
    //     if (error) {
    //       raise error
    //     }
    //   })
    //   .catch((error) => {
    //     console.log('Error sending message:', error)
    //   })
};
