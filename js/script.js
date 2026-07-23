const menuBtn =
document.getElementById("menuBtn");

const mobileMenu =
document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {

    if(
        mobileMenu.style.display === "flex"
    ){
        mobileMenu.style.display = "none";
    }else{
        mobileMenu.style.display = "flex";
    }

});

function markNotificationsRead(){

    const email =
    localStorage.getItem(
        "memberEmail"
    );

    if(
        !email
    ){
        return;
    }

    const formData =
    new URLSearchParams();

    formData.append(
        "action",
        "markNotificationsRead"
    );

    formData.append(
        "email",
        email
    );

    fetch(
        "https://script.google.com/macros/s/AKfycbyjyjZ891V-eMkAtImiB1Cl3fUTubcDhb_6sF6MPezzAdaIXr3_N1q5kZ5SbHpPHDhC/exec",
        {
            method:"POST",
            body:formData
        }
    );

}

function showLoading(
    text
){

    const overlay =
    document.getElementById(
        "loadingOverlay"
    );

    const loadingText =
    document.getElementById(
        "loadingText"
    );

    if(
        loadingText
    ){

        loadingText.textContent =
        text;

    }

    if(
        overlay
    ){

        overlay.classList.add(
            "show"
        );

    }

}

function hideLoading(){

    const overlay =
    document.getElementById(
        "loadingOverlay"
    );

    if(
        overlay
    ){

        overlay.classList.remove(
            "show"
        );

    }

}

const notificationBtn =
document.getElementById(
    "notificationBtn"
);

const notificationPanel =
document.getElementById(
    "notificationPanel"
);

notificationBtn?.addEventListener(
    "click",
    ()=>{

        if(
            notificationPanel.style.display
            ===
            "block"
        ){

            notificationPanel.style.display =
            "none";

        }

        else{

            notificationPanel.style.display =
            "block";

        }

        markNotificationsRead();

    }
);
