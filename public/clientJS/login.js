let loginSignup = document.querySelector(".nav")
let signupBtn = loginSignup.children[0];
let loginBtn = loginSignup.children[1];

let userType = document.querySelector(".typeField");
let submitBtn = document.querySelector("#submit");


signupBtn.addEventListener("click", ()=>{
    signupBtn.style.backgroundColor = "rgba(250, 128, 114, 0.411)"
    loginBtn.style.backgroundColor = "unset"
    userType.style.display = "block";
    submitBtn.value = "Sign-up"; 
})

loginBtn.addEventListener("click", ()=>{
    loginBtn.style.backgroundColor = "rgba(250, 128, 114, 0.411)"
    signupBtn.style.backgroundColor = "unset"
    userType.style.display = "none";
    submitBtn.value = "Login"; 
})

submitBtn.addEventListener("click", ()=>{
    event.preventDefault();
})

