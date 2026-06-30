//=====================================================
// Interview Prep For Insiders
// app.js
//=====================================================
//======================================
// URL PARAMETERS
//======================================
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

    //======================================
// VALIDATE URL
//======================================

// if(!currentProjectId || !currentProductType){

//     document.body.innerHTML = `

//         <div class="container">

//             <h2>Invalid Product</h2>

//             <p>

//                 Please purchase through our official Blogger website.

//             </p>

//             <a href="https://interviewprepforinsiders.blogspot.com">

//                 Go to Website

//             </a>

//         </div>

//     `;

//     throw new Error("Invalid checkout URL.");

// }

if(!currentProjectId || !currentProductType){

    document.body.innerHTML = `
        <div style="padding:40px;text-align:center;">
            <h2>Invalid Product Link</h2>
            <p>Please purchase through our official website.</p>
        </div>
    `;

    throw new Error("Invalid product link.");

}

 let allProjects = [];

// let filteredProjects = [];

// const productGrid = document.getElementById("productGrid");

// const loader = document.getElementById("loader");

// const searchBox = document.getElementById("searchBox");

// const tabs = document.querySelectorAll(".tab");
//======================================
// GLOBAL VARIABLES
//======================================


//=====================================================
// INITIALIZE
//=====================================================

document.addEventListener(

    "DOMContentLoaded",

    initializeCheckout

);

//======================================
// INITIALIZE CHECKOUT
//======================================

async function initializeCheckout(){

     if(!currentProjectId || !currentProductType){

    throw new Error("Invalid product link.");

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
function populateProduct(product){

    document.getElementById(

        "productIcon"

    ).src = product.icon;

    document.getElementById(

        "productName"

    ).textContent = product.name;

    document.getElementById(

        "productDescription"

    ).textContent = product.desc;

    document.getElementById(

        "productType"

    ).textContent = product.productType;

    document.getElementById(

        "productPrice"

    ).textContent = formatPrice(product.price);

}

window.addEventListener("DOMContentLoaded", () => {

   // loadProjects();

});


//=====================================================
// LOAD JSON FILES
//=====================================================

// async function loadProjects(){

//     try{

//        showLoader();

//         allProjects = await loadProducts();

//         filteredProjects = [...allProjects];

//         renderProjects(filteredProjects);

//     }
//     catch(error){

//         console.error(error);

//     }
//     finally{

//        hideLoader();

//     }

// }


//=====================================================
// RENDER PRODUCTS
//=====================================================

// function renderProjects(projects){

//     productGrid.innerHTML = "";

//     if(projects.length===0){

//         productGrid.innerHTML =

//         "<h2>No Products Found.</h2>";

//         return;

//     }

//     projects.forEach(project=>{

//         productGrid.appendChild(

//             createCard(project)

//         );

//     });

// }


//=====================================================
// CREATE CARD
//=====================================================

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


//=====================================================
// SEARCH
//=====================================================

// searchBox.addEventListener("input",function(){

//     const keyword=this.value

//     .trim()

//     .toLowerCase();

//     filteredProjects=

//     allProjects.filter(project=>{

//         return(

//             project.name

//             .toLowerCase()

//             .includes(keyword)

//             ||

//             project.desc

//             .toLowerCase()

//             .includes(keyword)

//         );

//     });

//     renderProjects(filteredProjects);

// });


//=====================================================
// CATEGORY FILTER
//=====================================================

// tabs.forEach(tab=>{

//     tab.addEventListener("click",()=>{

//         tabs.forEach(t=>

//             t.classList.remove("active")

//         );

//         tab.classList.add("active");

//         const type=

//         tab.dataset.type;

//         if(type==="all"){

//             filteredProjects=[

//                 ...allProjects

//             ];

//         }

//         else{

//             filteredProjects=

//             allProjects.filter(project=>

//                 project.type===type

//             );

//         }

//         renderProjects(filteredProjects);

//     });

// });