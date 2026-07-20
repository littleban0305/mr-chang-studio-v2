const saveBtn =
document.getElementById(
    "saveProfileBtn"
);

saveBtn.addEventListener(
    "click",
    ()=>{

        const name =
        document.getElementById(
            "memberName"
        ).value;

        const phone =
        document.getElementById(
            "memberPhone"
        ).value;

        const birthday =
        document.getElementById(
            "memberBirthday"
        ).value;

        if(
            !name ||
            !phone ||
            !birthday
        ){

            alert(
                "請填寫完整資料"
            );

            return;

        }

        localStorage.setItem(
            "memberName",
            name
        );

        localStorage.setItem(
            "memberPhone",
            phone
        );

        localStorage.setItem(
            "memberBirthday",
            birthday
        );

        alert(
            "會員資料已完成"
        );

        location.href =
        "profile.html";

    }
);
