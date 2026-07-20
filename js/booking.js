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
