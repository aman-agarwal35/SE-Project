import {userEmail,passEmail} from '../constants.js'
import nodemailer from 'nodemailer'


function getOrderMessage(cartItems,customerName,customerEmail,address){
    var receipt = []
    for(var x=0;x<cartItems.length;x++){
        receipt.push("Customer Name : "+customerName+"\n"+"Customer Email : "+customerEmail+"\n"+"Address : "+address+"\n"+"Product Name : "+ cartItems[x].name + " Price - "  + cartItems[x].price + " Quantity - " + cartItems[x].qty)
    }
    return receipt
}

function getFullReceipt(cartItems){
    var mail = "Your Order Summary\n"
    for(var x=0;x<cartItems.length;x++){
        mail=mail+"Product Name : "+cartItems[x].name+" "+"Product Price : Rs"+cartItems[x].price+" Quantity : "+cartItems[x].qty+" Seller Email : "+cartItems[x].sellerMail+"\n"
    }
    mail= mail+"\nThank You for Shopping from our website. Do visit us again!. "+"❤️"
    return mail
}


function getMailIds(cartItems){
    var mailIds = []
    for(var x=0;x<cartItems.length;x++){
        mailIds.push(cartItems[x].sellerMail)
        
    }
    return mailIds
}

function sendEmailHelper(email,message,subject){   
    let transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "chiragarunsharma@gmail.com",
          pass: "sharmaarunchirag"
        }
     });

    const mailOptions = {
        from: 'chiragarunsharma@gmail.com', // Sender address
        to: email, // List of recipients
        subject: subject, // Subject line
        text: message, // Plain text body
   };
   
   transport.sendMail(mailOptions, function(err, info) {
       if (err) {
         console.log(err)
       } else {
         console.log(info);
       }
   });

}

export const sendEmail = (req,res)=>{    
    const { userInfo,
            cart
    } 
        = req.body;                     
    const {name,email} = userInfo
    const {cartItems,shippingAddress} = cart  
    console.log(name)
    console.log(email)
    console.log(cartItems)
    console.log(shippingAddress)  
    const address = shippingAddress.address + " " + shippingAddress.city + " " + shippingAddress.postalCode + " " + shippingAddress.country + " "
    const receipt = getOrderMessage(cartItems,name,email,address)
    const mailIds = getMailIds(cartItems)  
    console.log(mailIds)
    for(var x=0;x<mailIds.length;x++) {
        sendEmailHelper(mailIds[x],receipt[x],"New Order!")
    }
    const customerEmailBody = getFullReceipt(cartItems)
    console.log(customerEmailBody)
    sendEmailHelper(email,customerEmailBody,"Your Order Summary.")
    res.status(201).json({'status' : 'sent'})    
}