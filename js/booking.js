const modal =
document.getElementById(
    "bookingModal"
);

const modalSlot =
document.getElementById(
    "modalSlot"
);

const confirmBookingBtn =
document.getElementById(
    "confirmBookingBtn"
);

const modalBookingNote =
document.getElementById(
    "modalBookingNote"
);

const slotList =
document.getElementById(
    "slotList"
);

let selectedSlot = null;

fetch(
    "https://docs.google.com/spreadsheets/d/1PW_TBPUWeXncwL5G1tDG_qktHC7ChWd0AekIqHq6QSQ/export?format=csv&gid=0"
)
.then(
    response=>response.text()
)
.then(
    csv=>{

        const rows =
        csv.split("\n");

        rows.shift();

        rows.forEach(
            row=>{

                row =
                row.trim();

                if(!row)
                return;

                const data =
                row.split(",");

                const slot =
                data[0]?.trim();

                const status =
                data[1]?.trim();

                const btn =
                document.createElement(
                    "button"
                );

                btn.className =
                "slot-btn";

                if(
                    status === "full"
                ){

                    btn.textContent =
                    `${slot}（已額滿）`;

                    btn.disabled =
                    true;

                    btn.style.opacity =
                    "0.5";

                }

                else{

                    btn.textContent =
                    slot;

                    btn.addEventListener(
                        "click",
                        ()=>{
                    
                            document
                            .querySelectorAll(
                                ".slot-btn"
                            )
                            .forEach(
                                b=>b.classList.remove(
                                    "selected"
                                )
                            );
                    
                            btn.classList.add(
                                "selected"
                            );
                    
                            selectedSlot =
                            slot;
                    
                            modalSlot.textContent =
                            slot;
                    
                            modal.classList.add(
                                "show"
                            );
                    
                        }
                    );

                }

                slotList.appendChild(
                    btn
                );

            }
        );

    }
);

function submitBooking(){

    fetch(
        "你的AppsScript網址"
        +
        "?action=checkBooking"
        +
        "&name="
        +
        encodeURIComponent(
            memberName
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
    
                alert(
                    "❌ 您本月已經預約過一次了"
                );
    
                return;
    
            }
    
            sendBooking();
    
        }
    );

    const memberName =
    localStorage.getItem(
        "memberName"
    );

    if(!memberName){

        alert(
            "請先完成會員資料"
        );

        window.location.href =
        "complete-profile.html";

        return;

    }

    if(!selectedSlot){

        alert(
            "請先選擇時段"
        );

        return;

    }

    const bookingNote =
    modalBookingNote.value;

    const formData =
    new URLSearchParams();

    formData.append(
        "name",
        localStorage.getItem(
            "memberName"
        )
    );

    formData.append(
        "phone",
        localStorage.getItem(
            "memberPhone"
        )
    );

    formData.append(
        "birthday",
        localStorage.getItem(
            "memberBirthday"
        )
    );

    formData.append(
        "slot",
        selectedSlot
    );

    formData.append(
        "note",
        bookingNote
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
                "bookingDate",
                selectedSlot
            );

            localStorage.setItem(
                "bookingNote",
                bookingNote
            );

            localStorage.setItem(
                "bookingCreatedAt",
                new Date().toISOString()
            );

            modal.classList.remove(
                "show"
            );

            alert(
                "預約成功！"
            );

            window.location.href =
            "my-bookings.html";

        }
    )
    .catch(
        error=>{

            console.error(
                error
            );

            alert(
                "預約失敗"
            );

        }
    );

}

if(
    confirmBookingBtn
){

    confirmBookingBtn
    .addEventListener(
        "click",
        submitBooking
    );

}
