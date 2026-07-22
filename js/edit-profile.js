document.getElementById(
    "memberName"
).value =
localStorage.getItem(
    "memberName"
) || "";

document.getElementById(
    "memberPhone"
).value =
localStorage.getItem(
    "memberPhone"
) || "";

document.getElementById(
    "memberBirthday"
).value =
localStorage.getItem(
    "memberBirthday"
) || "";

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

        showLoading(
            "正在更新資料..."
        );

        const formData =
        new URLSearchParams();

        formData.append(
            "action",
            "updateMember"
        );

        formData.append(
            "email",
            localStorage.getItem(
                "memberEmail"
            )
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
            result=>{

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

                location.href =
                "profile.html";

            }
        );

    }
);
