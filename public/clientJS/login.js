
let loginSignup = document.querySelector(".nav")
let signupBtn = loginSignup.children[0];
let loginBtn = loginSignup.children[1];

let userType = document.querySelector(".typeField");
let submitBtn = document.querySelector("#submit");
let nameField = document.querySelector(".nameField");

signupBtn.addEventListener("click", ()=>{
    signupBtn.style.backgroundColor = "rgba(250, 128, 114, 0.411)"
    loginBtn.style.backgroundColor = "unset"
    userType.style.display = "block";
    submitBtn.value = "Sign-up"; 
    nameField.style.display = "block";
})

loginBtn.addEventListener("click", ()=>{
    loginBtn.style.backgroundColor = "rgba(250, 128, 114, 0.411)"
    signupBtn.style.backgroundColor = "unset"
    userType.style.display = "none";
    email.style.border = "";
    password.style.border = "";
    submitBtn.value = "Login"; 
    nameField.style.display = "none";
})
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let type =  document.querySelector("#userType")
let name =  document.querySelector("#name")

submitBtn.addEventListener("click", (event)=>{
    event.preventDefault();

    //gather fields
    let bodyObject = {
        email: email.value,
        password: password.value,
        type: type.value ,
        name: name.value
    }

    if (submitBtn.value == "Sign-up"){
        let message = document.querySelector(".message-container"); 
        if (!email.value) {
            email.style.border =  "2px solid rgba(255, 0, 0, 0.801)"
            message.children[0].innerHTML = "Error: Some fields are still required"
            message.style.opacity = "1";
        }
        if (!password.value){
            password.style.border =  "2px solid rgba(255, 0, 0, 0.801)"
            message.children[0].innerHTML = "Error: Some fields are still required"
            message.style.opacity = "1";
        }
        if (password.value && email.value){
            //POST request
            fetch("/login/newUser",{
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(bodyObject)
            })
            .then(response=>{
                return response.json(); //convert to JSON Object
            })
            .then(data=>{
                //depending on response, either complete, or fail
                if (data.errorCode == 11000){
                    email.style.border =  "2px solid rgba(255, 0, 0, 0.801)"
                    message.style.opacity = "1";
                    message.children[0].innerHTML = "Error: Email address already exists"
                } else if (data.errorCode == 1020){
                    email.style.border =  "2px solid rgba(255, 0, 0, 0.801)"
                    message.style.opacity = "1";
                    message.children[0].innerHTML = "Error: Invalid email"    
                }
                else{
                    message.children[0].innerHTML = "User Created! You can now login!"
                    message.style.opacity = "1";
                    email.value = ""
                    password.value = ""
                    let clickEvent = new Event ("click");
                    loginBtn.dispatchEvent(clickEvent);
                }
                console.log(data)
            })
            .catch(error=>{
                console.log(error);
            })
        }
        
    } //end if



  
})

email.addEventListener("keypress",()=>{
    email.style.border = "";
})
password.addEventListener("keypress",()=>{
    password.style.border = "";
})

