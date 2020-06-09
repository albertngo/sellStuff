let newProduct = document.querySelector(".newProduct");
let newProductBtn = document.querySelector(".newBtn");
let uploadBox = document.querySelector(".upload-content");
let exitSpan = document.querySelector(".exit");
let submitBtn = document.querySelector("#submit");
let form = document.querySelector(".inputFields");
let allInputFields = document.querySelectorAll(".Field input")


newProductBtn.addEventListener("click",()=>{
    for (let input of Array.from(allInputFields)){
        input.value = "";
    }
    newProduct.style.display = "block";

})

exitSpan.addEventListener("click",()=>{
    newProduct.style.display = "none";
    window.location.reload();
})

submitBtn.addEventListener("click",()=>{
    event.preventDefault();
    
    let price = document.querySelector("#price");
    let data = new FormData(form);
    fetch("/salepage/new-Product",{
        method: "POST",
        body: data
    }).then(response=>{
        console.log(response);
        if (response.status=== 200){
            //notify it has been added
            alert("Product Added!")
        } else {
            alert("All Fields Required!")
        }
    })
    .catch(error=>{
        console.log(error);
    })
    console.log("Request Sent")
    
    
    
})

let deleteItem = document.querySelectorAll(".delete");

for (let item of Array.from(deleteItem)){
   
    item.addEventListener("click",()=>{
        let id = {
            id:item.children[0].innerHTML
        }
        console.log(id)
        fetch("/salepage",{
            method:"delete",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(id)
        })
        .then(response=>{
            return response.json(); 
        })
        .then(data=>{
            console.log(data.message);
            window.location.reload();
        })
        .catch(error=>{
            console.log(error);
        })
    })
    
}




