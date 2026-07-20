const loginBtn =
document.getElementById(
    "loginBtn"
);

if(loginBtn){

    loginBtn.addEventListener(
        "click",
        () => {

            localStorage.setItem(
                "isLogin",
                "true"
            );

            window.location.href =
            "profile.html";

        }
    );

}
