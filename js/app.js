
let currentProjectId = "";
let currentCategory = "";
let currentProductType = "";
let currentRef = "";
let currentCampaign = "";

 let currentOrder = null;



const params = new URLSearchParams(window.location.search);

currentProjectId = params.get("projectId") || "";

currentCategory = params.get("category") || "";

currentProductType = params.get("productType") || "";

currentRef = params.get("ref") || "";

currentCampaign = params.get("campaign") || "";


 let allProjects = [];


document.addEventListener(

    "DOMContentLoaded",

    initializeCheckout

);

//======================================
// INITIALIZE CHECKOUT
//======================================

async function initializeCheckout(){

    const orderId = new URLSearchParams(location.search).get("orderId");

if(orderId){

    const response = await fetchOrder(orderId);

    if(!response.success){

        showToast(response.message);

        return;

    }

    currentOrder = response.order;

    currentProjectId = currentOrder.projectId;

    currentProductType = currentOrder.productType;

}

   if (!currentProjectId || !currentProductType) {

    if (
        location.hostname === "127.0.0.1" ||
        location.hostname === "localhost"
    ) {

        currentProjectId = "Novel";
        currentProductType = "SOURCE";

    } else {

        showToast("Invalid product link.");
        return;

    }


}
    try{

        showLoader();

     const response = await fetchProduct(

    currentProjectId,

    currentProductType

);
console.log(response);

if(!response.success){

    throw new Error(response.message);

}


        const product = response.product;

        populateProduct(product);
console.log(document.getElementById("buyButton"));
document
    .getElementById("buyButton")
    .onclick = function(){

        launchPayment(

            currentProjectId,

            currentProductType

        );

    };

    }

    catch(error){

        console.error(error);

        showToast(error.message);

    }

    finally{

        hideLoader();

    }

}
// function populateProduct(product){

//     document.getElementById(

//         "productIcon"

//     ).src = product.icon;

//     document.getElementById(

//         "productName"

//     ).textContent = product.name;

//     document.getElementById(

//         "productDescription"

//     ).textContent = product.desc;

//     document.getElementById(

//         "productType"

//     ).textContent = product.productType;

//     document.getElementById(

//         "productPrice"

//     ).textContent = formatPrice(product.price);

// }
function populateProduct(product){

    document.getElementById("productIcon").src =
        product.icon;

    document.getElementById("productName").textContent =
        product.name;

    document.getElementById("productType").textContent =
        product.productType;

    document.getElementById("productPrice").textContent =
        formatPrice(product.price);

    document.getElementById("productDescription").textContent =
        product.description;

    const words =
        product.description.split(" ");

    document.getElementById("productShortDesc").textContent =
        words.slice(0,20).join(" ") + "...";

   const featureList = document.getElementById("productFeatures");

featureList.innerHTML = "";

if (product.features && product.features.length) {

    product.features.forEach(feature => {

        featureList.innerHTML += `
            <li>
                <span class="tick">✔</span>
                ${feature}
            </li>
        `;

    });

} else {

    featureList.innerHTML = `
        <li>
            <span class="tick">✔</span>
            Complete source code with documentation
        </li>

        <li>
            <span class="tick">✔</span>
            Easy to understand project structure
        </li>

        <li>
            <span class="tick">✔</span>
            Ready to build and deploy
        </li>

        <li>
            <span class="tick">✔</span>
            Interview preparation material
        </li>

        <li>
            <span class="tick">✔</span>
            Lifetime access after approval
        </li>
    `;
}

}
window.addEventListener("DOMContentLoaded", () => {

   // loadProjects();

});


function createCard(project){

    const card = document.createElement("div");

    card.className="product-card";

    let features="";

    if(project.features){

        features="<ul class='feature-list'>";

        project.features.forEach(f=>{

            features+="<li>"+f+"</li>";

        });

        features+="</ul>";

    }

    let buttons="";

    project.products.forEach(product=>{

        buttons+=`

        <button

            class="btn btn-primary"

            onclick="launchPayment(

            '${project.id}',

            '${product.productType}'

            )">

            Buy ${product.productType}

            ₹${product.price}

        </button>

        `;

    });

    card.innerHTML=`

    <div class="product-image">

        <img

        src="${project.icon}"

        alt="${project.name}">

    </div>

    <div class="product-content">

        <h2 class="product-title">

        ${project.name}

        </h2>

        <p class="product-desc">

        ${project.desc}

        </p>

        ${features}

        <div class="btn-group">

        ${buttons}

        </div>

    </div>

    `;

    return card;

}


