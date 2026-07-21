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

    const base64Url =
    response.credential
    .split(".")[1];

    const base64 =
    base64Url
    .replace(/-/g,"+")
    .replace(/_/g,"/");

    const payload =
    JSON.parse(
        new TextDecoder().decode(
            Uint8Array.from(
                atob(base64),
                c=>c.charCodeAt(0)
            )
        )
    );

    console.log(
        payload
    );

    console.log(
        payload.name
    );
    
    console.log(
        payload.email
    );

    localStorage.setItem(
        "memberEmail",
        payload.email
    );

    localStorage.setItem(
        "isLogin",
        "true"
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
        "https://script.google.com/macros/s/AKfycbyjyjZ891V-eMkAtImiB1Cl3fUTubcDhb_6sF6MPezzAdaIXr3_N1q5kZ5SbHpPHDhC/exec"
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

                loadMemberData(
                    payload.email
                );

            }

            else{

                window.location.href =
                "complete-profile.html";

            }

        }
    );

}

function loadMemberData(
    email
){

    fetch(
        "https://script.google.com/macros/s/AKfycbyjyjZ891V-eMkAtImiB1Cl3fUTubcDhb_6sF6MPezzAdaIXr3_N1q5kZ5SbHpPHDhC/exec"
        +
        "?action=getMember"
        +
        "&email="
        +
        encodeURIComponent(
            email
        )
    )
    .then(
        response=>response.json()
    )
    .then(
        member=>{

            localStorage.setItem(
                "memberName",
                member.name
            );

            localStorage.setItem(
                "memberPhone",
                member.phone
            );

            localStorage.setItem(
                "memberBirthday",
                member.birthday
            );

            window.location.href =
            "profile.html";

        }
    );

}
