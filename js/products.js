

const BLOGGER_JSON = {

    android : ANDROID_JSON_URL,

    php : PHP_JSON_URL

};

async function loadProducts(category){

    const url = BLOGGER_JSON[

        category.toLowerCase()

    ];

    if(!url){

        throw new Error(

            "Unknown category."

        );

    }

    allProjects = await loadBloggerJson(url);

    return allProjects;

}

//======================================
// LOAD BLOGGER JSON
//======================================

async function loadBloggerJson(url){

    const response = await fetch(url);

    const html = await response.text();

    const parser = new DOMParser();

    const doc = parser.parseFromString(

        html,

        "text/html"

    );

    const script =

        doc.getElementById("projects-data");

    if(!script){

        throw new Error(

            "projects-data not found."

        );

    }

    return JSON.parse(

        script.textContent

    );

}
//======================================
// GET PRODUCT
//======================================
//======================================
// GET PRODUCT
//======================================

function getProduct(projectId, productType){

    const project = allProjects.find(

        p => p.id === projectId

    );

    if(!project){

        return null;

    }

    const selectedProduct = project.products.find(

        p =>

        p.productType.toUpperCase() ===
        productType.toUpperCase()

    );

    if(!selectedProduct){

        return null;

    }

    return{

        id:project.id,

        name:project.name,

        desc:project.desc,

        icon:project.icon,

        type:project.type,

        features:project.features,

        productType:selectedProduct.productType,

        price:selectedProduct.price,

        deliveryType:selectedProduct.deliveryType

    };

}