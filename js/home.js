const bookingBtn =
document.getElementById(
    "bookingEntryBtn"
);

const startTime =
new Date(
    "2026-07-21T11:00:00"
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
            diff /
            1000 /
            60 /
            60 /
            24
        );

        const hours =
        Math.floor(
            diff /
            1000 /
            60 /
            60
        ) % 24;

        bookingBtn.textContent =
        `開放倒數 ${days}天 ${hours}小時`;

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
    60000
);
