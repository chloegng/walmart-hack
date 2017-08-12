var twilio = require('twilio');

var twilioAccountSid = "AC0f9f3128f739dda1853bcad74bc6b576";
var twilioAuthToken = "578dc02fbe0a1993539def066a24c38b";

var twilio = require('twilio');
var twilioClient = twilio(twilioAccountSid, twilioAuthToken);

var jarrenNumber = "+19518949217";
sendText("hello", jarrenNumber);


function sendText(message, phoneNumber)
{
    twilioClient.messages.create({
        body: message,
        to: phoneNumber,
        from: '+18582810718'
    }).then((message) => console.log(message.sid));
}

