'use strict';

const superagent = require('superagent');
const fs = require('fs');


class IOTRESTClient {
    // constructor
    constructor(keyPath, certPath,caPath, host, region) {
       
        
        this.keyFilePath = __dirname + keyPath;
        this.certFilePath = __dirname + certPath;
        this.caFilePath = __dirname + caPath;
        this.host =  host,
        this.region = region
    }
   
   
    publishMessage(topic,message) {

       
        let url = `https://${this.host}/topics/${topic}`

        var key  = fs.readFileSync(this.keyFilePath);
        var cert =  fs.readFileSync(this.certFilePath);
        var ca   = fs.readFileSync(this.caFilePath);
        //var body = "{ \"serialNumber\": \"G030JF053216F1BS\", \"clickType\": \"SINGLE\", \"batteryVoltage\": \"2000mV\" }" ;
        var body = JSON.stringify(message);
        console.log(body);
        
        return new Promise((resolve, reject) => {
    
            superagent.post(url)
                .key(key)
                .cert(cert)
                .ca(ca)
                .send(body)
                .set('Content-Type', 'application/json')
                .end((err,res) => {
                    if(err){
                        console.log("iot message publish error", err )
                        reject(err);                    
                    } else {
                        console.log("iot message publish status ", res.status)
                        console.log(res.body);
                        resolve(res);
                    }
                });
    
                // .end((error, res) => {
                //     error ? reject(error) : resolve(res);
                // });
        });
        
    }
}

module.exports = IOTRESTClient;




