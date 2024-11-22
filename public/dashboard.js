//lsit products
const nameproduct = document.getElementById("name-product")
const tablebody = document.getElementById("table-body")
const ListProducts = async function(){
    const response = await fetch('/api/products/all');
    const data = await response.json()
    
    var product_list = ""
    for (let product = data.products.length - 1; product >= 0; product--) {
        product_list += `<tr id="product-box">
            <td><a href="product.html?id=${data.products[product]._id}">${data.products[product].name}</a></td>
            <td>
              <button class="update-btn"><a href="update-product.html?id=${data.products[product]._id}">Update</a></button>
              <button class="delete-btn" id="${data.products[product]._id}" onclick="DeleteProduct('${data.products[product]._id}')">Delete</button>
            </td>
          </tr>` 
    }
    tablebody.innerHTML = product_list
}
//lsit products

//create product
const productform = document.getElementById("product-form")
const productname = document.getElementById("product-name")
const productDescription = document.getElementById("product-description")
const productprice = document.getElementById("product-price")
const productquantity = document.getElementById("product-quantity")
const productimage = document.getElementById("product-image")
const productcategory = document.getElementById("product-category")



productform.addEventListener('submit',async (e) => {
    e.preventDefault()

    const formData = new FormData();//create new objetc of FormData to take form data
    formData.append('name', productname.value);//append key name with value productname.value to the formData
    formData.append('description', productDescription.value)
    formData.append('price', productprice.value);
    formData.append('quantity', productquantity.value);
    formData.append('category', productcategory.value);
    formData.append('image', productimage.files[0]); 

    const response = await fetch('/api/products/create', {
        method: 'POST',
        body: formData,//send post request to the endpoint with the formData as body
    });

    productname.value = ""
    productDescription.value = ""
    productprice.value = ""
    productquantity.value = ""
    productimage.value = ""
    productcategory.value = "";

    alert('new product has been added')
    ListProducts()
})


//delete product
const DeleteProduct = async function(task_id){
    const response = await fetch(`/api/products/delete/${task_id}`, {
        method: 'DELETE',
    });

    const data = await response.json()
    if(data.status === 200){
        document.getElementById(task_id).closest("#product-box").remove()
    }
    alert(data.message)
}
//delete product



//list products endpoint
ListProducts()
