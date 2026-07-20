const bookingNote =
localStorage.getItem(
    "bookingNote"
);

const bookingCreatedAt =
localStorage.getItem(
    "bookingCreatedAt"
);

const bookingDate =
localStorage.getItem(
    "bookingDate"
);

const bookingStatus =
localStorage.getItem(
    "bookingStatus"
);

const bookingDateText =
document.getElementById(
    "bookingDate"
);

const bookingStatusText =
document.getElementById(
    "bookingStatus"
);

if(
    bookingDate &&
    bookingDateText
){

    bookingDateText.textContent =
    bookingDate;

}

if(
    bookingStatus &&
    bookingStatusText
){

    bookingStatusText.textContent =
    bookingStatus;

}

const cancelBtn =
document.getElementById(
    "cancelBookingBtn"
);

if(cancelBtn){

    cancelBtn.addEventListener(
        "click",
        ()=>{

            localStorage.removeItem(
                "bookingDate"
            );

            localStorage.removeItem(
                "bookingStatus"
            );

            alert(
                "預約已取消"
            );

            location.reload();

        }
    );

}

const bookingCreatedAtText =
document.getElementById(
    "bookingCreatedAt"
);

if(
    bookingCreatedAt &&
    bookingCreatedAtText
){

    const date =
    new Date(
        bookingCreatedAt
    );

    bookingCreatedAtText.textContent =
    date.toLocaleString(
        "zh-TW",
        {
            year:"numeric",
            month:"2-digit",
            day:"2-digit",
            hour:"2-digit",
            minute:"2-digit",
            second:"2-digit",
            fractionalSecondDigits:3
        }
    );

}

const bookingNoteText =
document.getElementById(
    "bookingNote"
);

if(
    bookingNote &&
    bookingNoteText
){

    bookingNoteText.textContent =
    bookingNote;

}
