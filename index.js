const axios = require('axios');
const dotenv = require('dotenv');
const express = require('express');
dotenv.config();
const API_KEY = process.env.API_KEY;
const API_URL = "http://app.bosta.co/api/v2/";
const notificationToken = process.env.NOTIFICATION_TOKEN; 
const token = '123';
const app = express();
app.use(express.json());
const deliveryCOD = async (cashAmount) => {
    try {
        const url = `${API_URL}deliveries`;
        const response = await axios.post(url, {
            headers: {
                "Authorization": `${API_KEY}`,
            },
            data: {
                "type": 10, //number
                "specs" : {
                    "packageType" : "Parcel",
                    "packageDetails" : {
                        "itemCounts" : 2,
                        "description" : "Test",
                    }
                },
                "cod": cashAmount, //amount
                "dropOffAddress" : {
                    "city" : "testCity",
                    "zoneID" : "testZone",
                    "districtID": "testDistrict",
                    "firstLine": "testFirstLine",
                    "secondLine": "testSecondLine",
                },
                "returnAddress" : { //In case of return
                    "city" : "testCity2",
                    "zoneID" : "testZone2",
                    "districtID": "testDistrict2",
                    "firstLine": "testFirstLine2",
                    "secondLine": "testSecondLine2",
                },
                "webhookUrl" : "http://www.amazon.com/notifications/test", // Webhook example for the purpose of future notification when the deliveries got updated
                "webhookCustomHeaders" : {
                    "Authorization" : `Bearer ${notificationToken}`
                }
            }
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }

}
const pickupRequest = async () => {
    try {
        const response = await axios.post(`${API_URL}pickups`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            data: {
                "businessLocationID": "testBusinessLocationID",
                "scheduledDate": "2023-01-01",
                "contactPerson":{ //Optional
                    "name" : "testName", 
                    "phone" : "0123456789",
                    "email" : "testEmail@example.com",
                },
                "repeatedData":{  // Optional (for repeated pickups)

                }
        }   
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const updateNotification = async () => {
    try{
        app.post("http://www.amazon.com/notifications/test", authMiddleware, notificationHandler);
    }
    catch(error){
        console.error(error);
    }
}
const notificationHandler = async (req,res) => {
    try{
        const data = req.body;
        const deliveryState = data.state; // These state-value mappings are defined in https://docs.bosta.co/docs/how-to/get-delivery-status-via-webhook
        const isDelivered = data.isConfirmedDelivery;
        takeAction(); // Using the data from request body, client can take further actions.
        res.status(200).json();
    }
   catch(error){
        console.error(error);
        res.status(500).json(error);
    }

}
const authMiddleware = (req,res,next) =>{
    try{
        const authHeader = req.headers['Authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(!token || token !== notificationToken){
            return res.status(401).json('Unauthorized');
        }
        next();
    }
    catch(error){
        res.status(500).json(error);
    }
}
module.exports = {
    pickupRequest,
    deliveryCOD,
    updateNotification
}