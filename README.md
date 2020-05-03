# PublishAWSIOTWssRest
npm install

Create IOT in AWS console and copy all the pem, crt, pfx files to the project certfiles folder

Mention the cert files location in test-iot.js file 

npm test-iot.js

Comment / uncomment the code as required (IOT rest call / IOTMQTTClient call with shadow / IOTMQTTWSSClient call)
