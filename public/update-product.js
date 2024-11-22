const productform = document.getElementById("product-form")
const productname = document.getElementById("product-name")
const productDescription = document.getElementById("product-description")
const productprice = document.getElementById("product-price")
const productquantity = document.getElementById("product-quantity")
const productimage = document.getElementById("product-image")


const task_id = new URLSearchParams(window.location.search).get("id")


const GetProduct = async function(){
    const response = await fetch(`/api/product/${task_id}`)
    const data = await response.json()
    productname.value = data.product.name
    productDescription.value = data.product.description
    productprice.value = data.product.price
    productquantity.value = data.product.quantity

   
}
GetProduct() 


productform.addEventListener('submit',async (e) => {
    
    e.preventDefault()
    const body = {
        name : productname.value,
        description : productDescription.value,
        price : productprice.value,
        quantity : productquantity.value,
    }

    const response = await fetch(`/api/products/update/${task_id}`, {
        method: 'PUT',
        headers : {"Content-Type": "application/json"},
        body: JSON.stringify(body),
    });

    const data = await response.json()

    if(data.successful){
        window.location.href = data.redirected_url
        return;
    }
})