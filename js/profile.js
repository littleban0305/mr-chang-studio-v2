const memberName =
localStorage.getItem(
    "memberName"
);

const memberPhone =
localStorage.getItem(
    "memberPhone"
);

const memberBirthday =
localStorage.getItem(
    "memberBirthday"
);

const nameText =
document.getElementById(
    "profileName"
);

const phoneText =
document.getElementById(
    "profilePhone"
);

const birthdayText =
document.getElementById(
    "profileBirthday"
);

if(
    memberName &&
    nameText
){

    nameText.textContent =
    memberName;

}

if(
    memberPhone &&
    phoneText
){

    phoneText.textContent =
    memberPhone;

}

if(
    memberBirthday &&
    birthdayText
){

    birthdayText.textContent =
    memberBirthday;

}

const logoutBtn =
document.getElementById(
    "logoutBtn"
);

if(logoutBtn){

    logoutBtn.addEventListener(
        "click",
        ()=>{

            localStorage.removeItem(
                "isLogin"
            );

            location.href =
            "index.html";

        }
    );

}
