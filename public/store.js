
//list prodcts
const productlist = document.getElementById("product-list")
let category = new URLSearchParams(window.location.search).get("category")
if(!category){
    category = "all"
}
const ListProducts = async function(){
    const response = await fetch(`/api/products/${category}`);
    const data = await response.json()
    
    var product_list = ""
    for (let product = data.products.length - 1; product >= 0; product--) {
        product_list += `<div class="product-item" id="${data.products[product]._id}">
                <div class="image-wrapper">
                    <img src=".${data.products[product].image}" alt="Croissant">
                </div>
                <div class="product-info">
                    <h2>${data.products[product].name}</h2>
                    <p class="price">${data.products[product].price}</p>
                    <button><a href="product.html?id=${data.products[product]._id}">Buy</a></button>
                </div>
            </div>` 
    }
    productlist.innerHTML = product_list
}

ListProducts()