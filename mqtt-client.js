

const awsIot = require('aws-iot-device-sdk');
const fs = require('fs');


class IOTMQTTClient {
    // constructor
    constructor(keyPath, certPath,caPath, host, region) {
       
        
        this.keyPath = __dirname + keyPath;
        this.certPath = __dirname + certPath;
        this.caPath = __dirname + caPath;
        this.host =  host,
        this.region = region
    }

    publishMessage(topic, message) {
        this.topic = topic;
        this.device = awsIot.device({
            keyPath: this.keyPath,
            certPath: this.certPath,
            caPath:    this.caPath,
            clientId: '*',
            port : 8883,
            region: this.region,
            host : this.host
        });
        console.log(JSON.stringify(this.device));

        this.device.on('connect', () => {
            console.log('Connected');
            console.log('Publishing on topic : ' + this.topic);
            var DataPublished = {"Data" : []}
            this.device.publish(this.topic, JSON.stringify(DataPublished) , {qos: 1},
                (error,message)=>{
                    if(error){
                        console.log(error);
                    }
                    else {
                        console.log('message is successfully submitted ', message);
                    }
                });

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

    publishMessageToShadow(topic, message) {
        var thingName='iotTestDevice';
        this.topic = topic;
        var thingShadows = awsIot.thingShadow({
            keyPath: this.keyPath,
            certPath: this.certPath,
            caPath:    this.caPath,
            clientId: '*',
            port : 8883,
            region: this.region,
            host : this.host
        });
        console.log(JSON.stringify(thingShadows));
        var clientTokenUpdate;
        var rval = 187;
        var gval = 114;
        var bval = 222;

        thingShadows.on('connect', function() {
            console.log('Connected');
            thingShadows.get(thingName);
            thingShadows.register( thingName, {}, function() {
                    var rgbLedLampState = {"state":{"desired":{"red":rval,"green":gval,"blue":bval}}};
                    setTimeout( function() {
                        // clientTokenUpdate = thingShadows.update(thingName, rgbLedLampState  );
                        // console.log("Update:" + clientTokenUpdate);
                        thingShadows.ge
                        }, 2500 );
                    });
                });

                thingShadows.on('status', function(thingName, stat, clientToken, stateObject) {
                   console.log('received '+stat+' on '+thingName+': '+
                               JSON.stringify(stateObject));
                });
                thingShadows.on('delta', function(thingName, stateObject) {
                   console.log('received delta on '+thingName+': '+
                               JSON.stringify(stateObject));
            });
            thingShadows.on('timeout', function(thingName, clientToken) {
                   console.log('received timeout on '+thingName+
                               ' with token: '+ clientToken);
            });

    }

    checkClientSubscribed() {
        var thingName='$aws/events/presence/connected/1234-test-device-store';
        var clientTokenUpdate;
        var rval = 187;
        var gval = 114;
        var bval = 222;

       this.device = awsIot.device({
            keyPath: this.keyPath,
            certPath: this.certPath,
            caPath:    this.caPath,
            clientId: '*',
            port : 8883,
            region: this.region,
            host : this.host
        });
        console.log(JSON.stringify(this.device));

        this.device.on('connect', () => {
            console.log('Connected');

            this.device.subscribe(thingName,
            (error,res)=>{
                if(error){
                    console.log(error);
                }
                else{
                    console.log(res);
                }
            });
        });
        
    }
}

module.exports = IOTMQTTClient;