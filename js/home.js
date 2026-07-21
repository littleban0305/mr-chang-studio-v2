const bookingBtn =
document.getElementById(
    "bookingEntryBtn"
);

const startTime =
new Date(
    "2026-07-22T11:00:00"
);

const endTime =
new Date(
    "2026-08-15T23:59:00"
);

function updateBookingButton(){

    const now =
    new Date();

    if(
        now < startTime
    ){

        const diff =
        startTime - now;
        
        const days =
        Math.floor(
            diff / 1000 / 60 / 60 / 24
        );
        
        const hours =
        Math.floor(
            diff / 1000 / 60 / 60
        ) % 24;
        
        const minutes =
        Math.floor(
            diff / 1000 / 60
        ) % 60;
        
        const seconds =
        Math.floor(
            diff / 1000
        ) % 60;

        if(days > 0){
        
            bookingBtn.innerHTML =
            `
            開放倒數<br>
            ${days}天 ${hours}小時
            `;
        
        }
        else{
        
            bookingBtn.innerHTML =
            `
            開放倒數<br>
            ${hours}小時 ${minutes}分 ${seconds}秒
            `;
        
        }
        bookingBtn.removeAttribute(
            "href"
        );

    }

    else if(
        now > endTime
    ){

        bookingBtn.textContent =
        "本期已截止";

        bookingBtn.removeAttribute(
            "href"
        );

    }

    else{

        bookingBtn.textContent =
        "立即預約";

        bookingBtn.href =
        "booking.html";

    }

}

updateBookingButton();

setInterval(
    updateBookingButton,
    1000
);
