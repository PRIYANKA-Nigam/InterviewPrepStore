//======================================
// API CONFIGURATION
//======================================

// const API_URL =
// "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";

//======================================
// GLOBAL VARIABLES
//======================================

let currentOrder = null;

let currentProjectId = "";

let currentProductType = "";

//======================================
// POST REQUEST
//======================================

async function apiPost(data){

    const response = await fetch(API_URL,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

    });

    return await response.json();

}

//======================================
// CREATE ORDER
//======================================

async function createOrder(order){

    return await apiPost({

        action:"saveOrder",

        ...order

    });

}

//======================================
// UPLOAD SCREENSHOT
//======================================

async function uploadPaymentScreenshot(data){

    return await apiPost({

        action:"uploadScreenshot",

        ...data

    });

}