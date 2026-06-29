//======================================
// GLOBAL VARIABLES
//======================================

let currentOrder = null;

let currentProjectId = "";

let currentProductType = "";

//======================================
// PRODUCTS CACHE
//======================================

//======================================
// PRODUCTS CACHE
//======================================

//======================================
// PRODUCTS CACHE
//======================================

let allProjects = [];

//======================================
// BLOGGER JSON URLS
//======================================

// const ANDROID_JSON_URL =
// "https://interviewprepforinsiders.blogspot.com/p/project-data.html";

// const PHP_JSON_URL =
// "https://interviewprepforinsiders.blogspot.com/p/project-php-data.html";

//======================================
// LOAD PROJECTS
//======================================

async function loadProducts(){

    const android = await loadBloggerJson(
        ANDROID_JSON_URL
    );

    const php = await loadBloggerJson(
        PHP_JSON_URL
    );

    allProjects = [

        ...android,

        ...php

    ];

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

function getProduct(projectId, productType){

    return allProjects.find(

        p =>

        p.id === projectId &&

        p.type === productType

    );

}