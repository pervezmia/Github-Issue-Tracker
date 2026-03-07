const userNameInput = document.getElementById("userNameInput");
const userPasswordInput = document.getElementById("userPasswordInput");
const signInBtn = document.getElementById("signInBtn");

signInBtn.addEventListener("click", () => {
    const userNameInputValue = userNameInput.value;
    const userPasswordInputValue = userPasswordInput.value;
    if(userNameInputValue === "admin" && userPasswordInputValue === "admin123"){
        alert ("Login Success");
        // window.location.replace("./dashboard.html");
        window.location.assign("./dashboard.html");
    } else {
        alert ("Login Failed");
        return;
    }
})