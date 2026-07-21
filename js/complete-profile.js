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

        const email =
        localStorage.getItem(
            "memberEmail"
        );

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

        const formData =
        new URLSearchParams();

        formData.append(
            "action",
            "registerMember"
        );

        formData.append(
            "email",
            email
        );

        formData.append(
            "name",
            name
        );

        formData.append(
            "phone",
            phone
        );

        formData.append(
            "birthday",
            birthday
        );

        fetch(
            "https://script.google.com/macros/s/AKfycbyjyjZ891V-eMkAtImiB1Cl3fUTubcDhb_6sF6MPezzAdaIXr3_N1q5kZ5SbHpPHDhC/exec",
            {
                method:"POST",
                body:formData
            }
        )
        .then(
            response=>response.text()
        )
        .then(
            ()=>{

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

    }
);
