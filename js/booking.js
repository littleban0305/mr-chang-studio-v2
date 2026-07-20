const slotList =
document.getElementById(
    "slotList"
);

const slotButtons =
document.querySelectorAll(
    ".slot-btn"
);

let selectedSlot = null;

slotButtons.forEach(btn => {

    btn.addEventListener(
        "click",
        ()=>{

            slotButtons.forEach(
                b => b.classList.remove(
                    "selected"
                )
            );

            btn.classList.add(
                "selected"
            );

            selectedSlot =
            btn.textContent.trim();

        }
    );

});

const bookBtn =
document.getElementById(
    "bookBtn"
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

            localStorage.setItem(
                "bookingDate",
                selectedSlot
            );

            localStorage.setItem(
                "bookingNote",
                bookingNote
            );

            const now =
            new Date();
            
            localStorage.setItem(
                "bookingCreatedAt",
                now.toISOString()
            );
            
            

            window.location.href =
            "my-bookings.html";

        }
    );

}

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

                }

                slotList.appendChild(
                    btn
                );

            }
        );

    }
);
