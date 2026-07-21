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

function handleCredentialResponse(
    response
){

    const payload =
    JSON.parse(
        atob(
            response.credential
            .split(".")[1]
        )
    );

    console.log(
        payload
    );

    localStorage.setItem(
        "memberEmail",
        payload.email
    );

    localStorage.setItem(
        "memberGoogleName",
        payload.name
    );

    checkMember(
        payload.email
    );

}

function checkMember(
    email
){

    fetch(
        "你的AppsScript網址"
        +
        "?action=checkMember"
        +
        "&email="
        +
        encodeURIComponent(
            email
        )
    )
    .then(
        response=>response.text()
    )
    .then(
        result=>{

            if(
                result === "exists"
            ){

                window.location.href =
                "profile.html";

            }

            else{

                window.location.href =
                "complete-profile.html";

            }

        }
    );

}
