//======================================
// LOADER
//======================================

function showLoader(){

    loader.classList.remove("hidden");

}

function hideLoader(){

    loader.classList.add("hidden");

}

//======================================
// TOAST
//======================================

function showToast(message){

    alert(message);

}

//======================================
// COPY
//======================================

function copyText(text){

    navigator.clipboard.writeText(text);

}

//======================================
// PRICE
//======================================

function formatPrice(price){

    return "₹"+price;

}

//======================================
// DATE
//======================================

function formatDate(date){

    return new Date(date).toLocaleDateString();

}