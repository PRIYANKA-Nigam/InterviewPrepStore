
    async function fetchOrder(orderId){

        return await apiPost({

             action: "getOrderById",

            orderId:orderId

        });

    }
    async function apiPost(data){

        const formData = new URLSearchParams();

        Object.keys(data).forEach(key=>{
            formData.append(key,data[key]);
        });

        const response = await fetch(API_URL,{
            method:"POST",
            body:formData
        });

        console.log("HTTP Status =", response.status);

        const text = await response.text();

        console.log("RAW RESPONSE =", text);

        return JSON.parse(text);

    }
    //======================================
    // CREATE ORDER
    //======================================

    async function createOrder(order){

        const result = await apiPost({

            action: "saveOrder",

            ...order

        });

        return result;

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

    //======================================
    // GET PRODUCT
    //======================================

    async function fetchProduct(projectId, productType){

        return await apiPost({

            action:"getProduct",

            projectId,

            productType

        });

    }

    async function fetchOrder(orderId){

    return await apiPost({

        action:"getOrderById",

        orderId:orderId

    });

}