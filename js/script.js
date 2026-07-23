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

    }
);
