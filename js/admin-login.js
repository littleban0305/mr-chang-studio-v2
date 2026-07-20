const loginBtn =
document.getElementById(
    "adminLoginBtn"
);

loginBtn.addEventListener(
    "click",
    ()=>{

        const password =
        document.getElementById(
            "adminPassword"
        ).value;

        if(
            password === "mrchang123"
        ){

            localStorage.setItem(
                "isAdmin",
                "true"
            );

            window.location.href =
            "admin.html";

        }else{

            alert(
                "密碼錯誤"
            );

        }

    }
);
