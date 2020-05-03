const awsIot = require('aws-iot-device-sdk');
const fs = require('fs');


class IOTMQTTWSSClient {
    // constructor
    constructor(accessKeyId, secretKey, sessionToken, host, region) {
       
        
        // this.keyPath = __dirname + keyPath;
        // this.certPath = __dirname + certPath;
        // this.caPath = __dirname + caPath;
        this.accessKeyId = accessKeyId,
        this.secretKey = secretKey,
        this.sessionToken = sessionToken,
        this.host =  host,
        this.region = region
    }
   
   
    publishMessage(topic,message) {
        
        this.topic = topic;

        this.device = awsIot.device({
            // keyPath: this.keyPath,
            // certPath: this.certPath,
            // caPath:    this.caPath,
            clientId: Date.now(),
            port : 443,
            protocol:'wss',
            region: this.region,
            host : this.host,
            accessKeyId : this.accessKeyId,
            secretKey : this.secretKey,   
            sessionToken : this.sessionToken,
           // baseReconnectTimeMs: constants.IOT_RECONNECT_TIME,
            // keepalive: constants.IOT_KEEP_ALIVE,
            // protocol: constants.IOT_PROTOCOL,
            // port: constants.IOT_PORT,
            // host: constants.IOT_HOST,
        });
   

        this.device.on('connect', () => {
            console.log('Connected');
            console.log('Publishing on topic : ' + this.topic); 

            this.device.publish(topic, JSON.stringify(message),
            (error,msg)=>{
                if(error){
                    console.log(error);
                }else{
                    console.log('published successfully : ' + msg);
                }
            });
            this.device.notifyTheClient = true;

            setTimeout(() => {
                console.log('Killing client after publishing');
                this.device.end(function () {
                    console.log('ending client connection');
                });                   
            }, 500);

        });

        this.device.on('reconnect', (topic, message) => {
            console.log('Trying to reconnect !!! ', message);
        });

        this.device.on('error', (error) => {
            console.log('Error connecting !!! ', error);            
        });
        this.device.on('close', () => {
            console.log('Closing');
            console.log('Killing client from close');          
        });
    }
}

module.exports = IOTMQTTWSSClient;
