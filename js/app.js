//=====================================================
// Interview Prep For Insiders
// app.js
//=====================================================

let allProjects = [];

let filteredProjects = [];

const productGrid = document.getElementById("productGrid");

const loader = document.getElementById("loader");

const searchBox = document.getElementById("searchBox");

const tabs = document.querySelectorAll(".tab");
//======================================
// GLOBAL VARIABLES
//======================================

let currentOrder = null;

let currentProjectId = "";

let currentProductType = "";

//=====================================================
// INITIALIZE
//=====================================================

window.addEventListener("DOMContentLoaded", () => {

    loadProjects();

});


//=====================================================
// LOAD JSON FILES
//=====================================================

async function loadProjects(){

    try{

       showLoader();

        allProjects = await loadProducts();

        filteredProjects = [...allProjects];

        renderProjects(filteredProjects);

    }
    catch(error){

        console.error(error);

    }
    finally{

       hideLoader();

    }

}


//=====================================================
// RENDER PRODUCTS
//=====================================================

function renderProjects(projects){

    productGrid.innerHTML = "";

    if(projects.length===0){

        productGrid.innerHTML =

        "<h2>No Products Found.</h2>";

        return;

    }

    projects.forEach(project=>{

        productGrid.appendChild(

            createCard(project)

        );

    });

}


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

searchBox.addEventListener("input",function(){

    const keyword=this.value

    .trim()

    .toLowerCase();

    filteredProjects=

    allProjects.filter(project=>{

        return(

            project.name

            .toLowerCase()

            .includes(keyword)

            ||

            project.desc

            .toLowerCase()

            .includes(keyword)

        );

    });

    renderProjects(filteredProjects);

});


//=====================================================
// CATEGORY FILTER
//=====================================================

tabs.forEach(tab=>{

    tab.addEventListener("click",()=>{

        tabs.forEach(t=>

            t.classList.remove("active")

        );

        tab.classList.add("active");

        const type=

        tab.dataset.type;

        if(type==="all"){

            filteredProjects=[

                ...allProjects

            ];

        }

        else{

            filteredProjects=

            allProjects.filter(project=>

                project.type===type

            );

        }

        renderProjects(filteredProjects);

    });

});