//====================================================
// Interview Prep For Insiders
// payment.js
//====================================================

//================ CONFIGURATION =====================


const API_URL =
"https://script.google.com/macros/s/AKfycbyJ-WqvSwix4tuPeq-f76_m6bIlE5Z5mfiK5d9ePzFcMABHeFQJJWS-nZx33adrk8t1ww/exec";

let currentProjectId = "";
let currentProductType = "";
let currentOrder = null;
//======================================
// GLOBAL VARIABLES
//======================================


//====================================================
// OPEN PAYMENT POPUP
//====================================================

function launchPayment(projectId, productType){

    currentProjectId = projectId;
    currentProductType = productType;

    createPaymentPopup();

}


//====================================================
// CREATE POPUP
//====================================================

function createPaymentPopup(){

    let modal =
    document.getElementById("paymentModal");

    modal.innerHTML = `

    <div class="payment-box">

        <div class="payment-header">

            <h2>Interview Prep For Insiders</h2>

            <button
            class="close-btn"
            onclick="closePayment()">

            ✕

            </button>

        </div>

        <div id="paymentBody">

            <h3>Purchase Details</h3>

            <p>

            Enter your details before payment.

            </p>

            <input
            id="customerName"
            type="text"
            placeholder="Full Name">

            <input
            id="customerEmail"
            type="email"
            placeholder="Email Address">

            <button
            class="btn btn-primary"
            onclick="submitOrder()">

            Continue

            </button>

        </div>

    </div>

    `;

    modal.classList.remove("hidden");

}


//====================================================
// CLOSE POPUP
//====================================================

function closePayment(){

    document
    .getElementById("paymentModal")
    .classList
    .add("hidden");

}


//====================================================
// VALIDATE EMAIL
//====================================================

function validEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    .test(email);

}


//====================================================
// SHOW MESSAGE
//====================================================

function showMessage(msg){

    alert(msg);

}


//====================================================
// SUBMIT ORDER
//====================================================

async function submitOrder(){

    const name =
    document
    .getElementById("customerName")
    .value
    .trim();

    const email =
    document
    .getElementById("customerEmail")
    .value
    .trim();

    if(name===""){

        showMessage("Enter your name.");

        return;

    }

    if(!validEmail(email)){

        showMessage("Enter valid email.");

        return;

    }

    const button =
    document.querySelector(
    "#paymentBody button"
    );

    button.disabled = true;

    button.innerHTML =
    "Creating Order...";


    try{

        const result = await createOrder({

    name: name,

    email: email,

    projectId: currentProjectId,

    productType: currentProductType,

    customerIp: ""

});


        if(!result.success){

            throw result.message;

        }


        currentOrder =
        result.data;


        showPaymentScreen(
        name,
        email
        );


    }

    catch(ex){

        console.error(ex);

        showMessage(ex);

        button.disabled=false;

        button.innerHTML="Continue";

    }

}

//====================================================
// SHOW PAYMENT SCREEN
//====================================================

function showPaymentScreen(customerName, customerEmail){

    const body = document.getElementById("paymentBody");

    const upiLink =
    "upi://pay?pa=" +
    encodeURIComponent(currentOrder.upiId) +
    "&pn=" +
    encodeURIComponent(currentOrder.upiName) +
    "&am=" +
    currentOrder.amount +
    "&cu=INR";

    // const qrUrl =
    // "https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=" +
    // encodeURIComponent(upiLink);

    body.innerHTML = `

    <h3>Order Created Successfully</h3>

    <p>

    <b>Order ID:</b>

    ${currentOrder.orderId}

    </p>

    <p>

    <b>Amount:</b>

    ₹${currentOrder.amount}

    </p>

    <div class="qr-container">

       <div
id="qrcode"
class="qr-image">

</div>

    </div>

    <div class="upi-box">

        ${currentOrder.upiId}

    </div>

   <div class="payment-buttons">

<button
class="btn btn-primary"
onclick="openUPI()">

Pay Now

</button>

<button
class="btn btn-secondary"
onclick="copyUPI()">

Copy UPI

</button>

</div>

<div class="payment-buttons">

<button
class="btn btn-secondary"
onclick="copyOrderId()">

Copy Order ID

</button>

<button
class="btn btn-secondary"
onclick="shareWhatsapp()">

WhatsApp

</button>

</div>

<div class="payment-buttons">

<button
class="btn btn-secondary"
onclick="mailSupport()">

Email Screenshot

</button>

</div>
<hr style="margin:25px 0;">

<h3>Upload Payment Screenshot</h3>

<p style="font-size:14px;color:#666;">
Supported formats: JPG, JPEG, PNG (Max 5 MB)
</p>

<input
type="file"
id="paymentScreenshot"
accept="image/png,image/jpeg,image/jpg">

<button
class="btn btn-primary"
style="margin-top:15px;"
onclick="uploadScreenshot()">

📤 Upload Screenshot

</button>

<div
id="uploadStatus"
style="margin-top:15px;"></div>
    </div>

    <div class="payment-note">

        <h4>

        Payment Instructions

        </h4>

        <ul>

            <li>

            Scan QR using any UPI App.

            </li>

            <li>

            Complete payment.

            </li>

            <li>

            Save payment screenshot.

            </li>

            <li>

            If files are not received within
            24 hours,
            share screenshot.

            </li>

        </ul>

    </div>

    `;

    new QRCode(

document.getElementById("qrcode"),

{

text:upiLink,

width:220,

height:220,

correctLevel:QRCode.CorrectLevel.H

}

);

}

//====================================================
// PAY NOW
//====================================================

function payNow(){

    const url =
    "upi://pay?pa=" +
    encodeURIComponent(currentOrder.upiId) +
    "&pn=" +
    encodeURIComponent(currentOrder.upiName) +
    "&am=" +
    currentOrder.amount +
    "&cu=INR";

    window.location.href = url;

}


//====================================================
// COPY UPI
//====================================================

function copyUPI(){

    navigator.clipboard.writeText(

        currentOrder.upiId

    );

    alert(

        "UPI ID copied."

    );

}

//====================================================
// OPEN UPI
//====================================================

function openUPI(app){

    const url =
    "upi://pay?pa="+
    encodeURIComponent(currentOrder.upiId)+
    "&pn="+
    encodeURIComponent(currentOrder.upiName)+
    "&am="+
    currentOrder.amount+
    "&cu=INR";

    window.location.href=url;

}



//====================================================
// COPY ORDER ID
//====================================================

function copyOrderId(){

navigator.clipboard.writeText(

currentOrder.orderId

);

alert(

"Order ID copied."

);

}



//====================================================
// SHARE EMAIL
//====================================================

function mailSupport(){

const subject=

encodeURIComponent(

"Payment Screenshot : "+

currentOrder.orderId

);

const body=

encodeURIComponent(

"Order ID : "+

currentOrder.orderId+

"\n\nPayment completed."

);

 window.location.href =
        "mailto:priyankanigam25041999@gmail.com?subject=" +
        subject +
        "&body=" +
        body;
}



//====================================================
// WHATSAPP
//====================================================

function shareWhatsapp(){
const phone = "919129520224"
const msg=

encodeURIComponent(

"Order ID : "+

currentOrder.orderId+

"\n\nI have completed the payment."+


"\n\nAttached is my payment screenshot."

);

window.open(

"https://wa.me/"+ phone + "?text="+msg,

"_blank"

);

}

//====================================================
// UPLOAD SCREENSHOT
//====================================================

async function uploadScreenshot(){

    const fileInput =
    document.getElementById("paymentScreenshot");

    if(fileInput.files.length===0){

        alert("Please select a screenshot.");

        return;

    }

    const file = fileInput.files[0];

    // Validate file type
    if(!file.type.startsWith("image/")){

        alert("Only JPG, JPEG or PNG images are allowed.");

        return;

    }

    // Validate file size (5 MB max)
    if(file.size > 5 * 1024 * 1024){

        alert("Maximum file size is 5 MB.");

        return;

    }

    const status =
    document.getElementById("uploadStatus");

    status.innerHTML = "Uploading...";

    const reader = new FileReader();

    reader.onload = async function(){

        try{

           const result = await uploadPaymentScreenshot({

    orderId: currentOrder.orderId,

    fileName: file.name,

    mimeType: file.type,

    fileData: reader.result

});

            if(result.success){

                status.innerHTML =
                "<span style='color:green;'>✅ Screenshot uploaded successfully. Please wait while we verify your payment.</span>";

            }else{

                status.innerHTML =
                "<span style='color:red;'>"+result.message+"</span>";

            }

        }catch(e){

            console.error(e);

            status.innerHTML =
            "<span style='color:red;'>Upload failed.</span>";

        }

    };

    reader.readAsDataURL(file);

}