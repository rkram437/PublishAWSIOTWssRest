//const sendIOTRestMessage = require('rest-client');
const keyFile  =  ''; // private.pem.key
const certFile = ''; //certificate.pem.crt
const caFile   = ''; //rootca.pem
const host = '' // aws host
const IOTMQTTClient = require('./mqtt-client');
const topicName = ''; // iot topic name
const region = ''; //region name

const messageId = Date.now();

// IOT rest call
const IOTRESTClient = require('./rest-client');
const iotRestClient = new IOTRESTClient(keyFile, certFile,caFile,host,region);
iotRestClient.publishMessage(topicName, {"id" : messageId,  "message" : "Call from Rest client"});

// IOTMQTTClient call with shadow
const iotMqttClient = new IOTMQTTClient(keyFile, certFile,caFile,host,region);
iotMqttClient.publishMessage(topicName,{"id" : messageId,  "message" : "Testing for qos4"});
iotMqttClient.publishMessageToShadow(topicName,{"id" : messageId,  "message" : "Shadow Message - Call from Mqtt client"});

// IOTMQTTWSSClient call
const IOTMQTTWSSClient = require('./mqtt-over-wss-client');
const iotMqttWssClient = new IOTMQTTWSSClient(accessKeyId, secretKey,sessionToken, host,region);
iotMqttWssClient.publishMessage(topicName,{"id" : messageId,  "message" : "A - Call from Mqtt over wss client"});