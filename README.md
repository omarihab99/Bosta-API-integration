## This is a simple guide for integrating Bosta API with Amazon for delivery and shipping.
### For the comprehensive guide, please refer to the documentation ( https://docs.bosta.co/ )

#### 1.    Delivery (Cash on Delivery):
Bosta provides API endpoint for handling delivery requests ( http://app.bosta.co/api/v2/deliveries ). When provided with authentication token ( or API_KEY ), you can send a POST request providing required delivery details to this endpoint for creating a delivery with COD. An example for delivery details you can provide:
- Package type.
- COD amount.
- Webhook URL for delivery status updates along with webhook custom header which may contains authuntication token.
- returnAddress ( which you will need if you want to make a return ).
#### 2.    Pickup request:
For creating a pickup request, you can use the API endpoint ( http://app.bosta.co/api/v2/pickups ) to send POST request which requires authentication token ( or API_KEY ) and pickup details such as the following:
- BusinesslocationID.
- scheduleDate.
#### 3.    Handling delivery updates:
Using the webhook URL provided in step 1, Bosta can send POST request to this url every time an update occurs for your delivery. This request will contain all the information related to the delivery such as:
- Order ID.
- Tracking number.
- State ( code that represents the delivery status).
- COD ( the cash amount collected from the customer).
- Timestamp at which state was updated.

After using an authentication middleware for authentication, you can use the data in the request body to know the status of the delivery and take further actions.

