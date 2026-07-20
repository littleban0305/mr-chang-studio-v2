const slotList =
document.getElementById(
    "slotList"
);

let selectedSlot = null;

const bookBtn =
document.getElementById(
    "bookBtn"
);

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

if(bookBtn){

    bookBtn.addEventListener(
        "click",
        ()=>{

            if(!selectedSlot){

                alert(
                    "請先選擇時段"
                );

                return;

            }

            const bookingNote =
            document.getElementById(
                "bookingNote"
            ).value;

            const bookingData = {

                name:
                localStorage.getItem(
                    "memberName"
                ),

                slot:
                selectedSlot,

                note:
                bookingNote

            };

            fetch(
                "https://script.google.com/macros/s/AKfycbyjyjZ891V-eMkAtImiB1Cl3fUTubcDhb_6sF6MPezzAdaIXr3_N1q5kZ5SbHpPHDhC/exec",
                {

                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:
                    JSON.stringify(
                        bookingData
                    )

                }
            )
            .then(
                response=>response.json()
            )
            .then(
                data=>{

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
    );

}
