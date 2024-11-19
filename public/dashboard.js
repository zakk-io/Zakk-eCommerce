//create product
const productform = document.getElementById("product-form")
const productname = document.getElementById("product-name")
const productDescription = document.getElementById("product-description")
const productprice = document.getElementById("product-price")
const productquantity = document.getElementById("product-quantity")
const productimage = document.getElementById("product-image")


productform.addEventListener('submit',async (e) => {
    e.preventDefault()

    const formData = new FormData();//create new objetc of FormData to take form data
    formData.append('name', productname.value);//append key name with value productname.value to the formData
    formData.append('description', productDescription.value)
    formData.append('price', productprice.value);
    formData.append('quantity', productquantity.value);
    formData.append('image', productimage.files[0]); 

    const response = await fetch('/api/products/create', {
        method: 'POST',
        body: formData,//send post request to the endpoint with the formData as body
    });

    alert('new product has been added')  
})
