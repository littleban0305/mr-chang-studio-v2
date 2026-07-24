const isMobile =
/Android|iPhone|iPod/i
.test(
    navigator.userAgent
);

if(
    !isMobile
){

    document.body.innerHTML = `

        <div class="desktop-coming">

            <h1>
                🚧 電腦版與平板版開發中
            </h1>

            <p>
                目前請使用手機瀏覽
            </p>

        </div>

    `;

}

const menuBtn =
document.getElementById("menuBtn");

const mobileMenu =
document.getElementById("mobileMenu");

const isLogin =
localStorage.getItem(
    "isLogin"
);

if(menuBtn && mobileMenu){

    menuBtn.addEventListener(
        "click",
        ()=>{

            if(
                mobileMenu.style.display
                ===
                "flex"
            ){

                mobileMenu.style.display =
                "none";

            }

            else{

                mobileMenu.style.display =
                "flex";

            }

        }
    );

}

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

function showLoading(text){

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

if(
    notificationBtn
){

    if(
        !isLogin
    ){

        notificationBtn.style.display =
        "none";

    }

    else{

        notificationBtn.style.display =
        "flex";

        notificationBtn.addEventListener(
            "click",
            ()=>{

                if(
                    notificationPanel &&
                    notificationPanel.style.display
                    ===
                    "block"
                ){

                    notificationPanel.style.display =
                    "none";

                }

                else if(
                    notificationPanel
                ){

                    notificationPanel.style.display =
                    "block";

                }

                markNotificationsRead();

            }
        );

    }

}
