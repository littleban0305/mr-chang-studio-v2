const navMenu =
document.getElementById(
    "mobileMenu"
);

const loginStatus =
localStorage.getItem(
    "isLogin"
);

if(navMenu){

    if(loginStatus){

        navMenu.innerHTML = `
            <a href="index.html">
                首頁
            </a>

            <a href="profile.html">
                會員中心
            </a>

            <a href="#" id="logoutLink">
                登出
            </a>
        `;

    }else{

        navMenu.innerHTML = `
            <a href="index.html">
                首頁
            </a>

            <a href="login.html">
                登入
            </a>

            <a href="register.html">
                註冊會員
            </a>
        `;

    }

}

document.addEventListener(
    "click",
    (e)=>{

        if(
            e.target.id ===
            "logoutLink"
        ){

            localStorage.removeItem(
                "isLogin"
            );

            location.href =
            "index.html";

        }

    }
);
