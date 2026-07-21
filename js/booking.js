const countdownDiv =
document.getElementById(
    "bookingCountdown"
);

const modalOverlay =
document.getElementById(
    "modalOverlay"
);

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

showLoading(
    "正在更新資料..."
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

        const dateGroups = {};

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

                const parts =
                slot.split(" ");
                
                const date =
                parts[0];
                
                const time =
                parts[1];

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
                    `${time}（已額滿）`;

                    btn.disabled =
                    true;

                    btn.style.opacity =
                    "0.5";

                }

                else{

                    btn.textContent =
                    time;

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

                            modalOverlay.classList.add(
                                "show"
                            );
                    
                        }
                    );

                }

                if(
                    !dateGroups[date]
                ){
                
                    const details =
                    document.createElement(
                        "details"
                    );
                
                    const summary =
                    document.createElement(
                        "summary"
                    );
                
                    summary.textContent =
                    date;
                
                    const container =
                    document.createElement(
                        "div"
                    );
                
                    container.className =
                    "date-container";
                
                    details.appendChild(
                        summary
                    );
                
                    details.appendChild(
                        container
                    );
                
                    slotList.appendChild(
                        details
                    );
                
                    dateGroups[date] =
                    container;
                
                }
                
                dateGroups[date]
                .appendChild(
                    btn
                );

            }
        );

    }
);

function submitBooking(){

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

    showLoading(
        "正在送出預約..."
    );

    fetch(
        "https://script.google.com/macros/s/AKfycbyjyjZ891V-eMkAtImiB1Cl3fUTubcDhb_6sF6MPezzAdaIXr3_N1q5kZ5SbHpPHDhC/exec"
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

if(
    modalOverlay
){

    modalOverlay.addEventListener(
        "click",
        ()=>{

            modal.classList.remove(
                "show"
            );

            modalOverlay.classList.remove(
                "show"
            );

        }
    );

}

function sendBooking(){

    const bookingNote =
    modalBookingNote.value;

    const formData =
    new URLSearchParams();

    formData.append(
        "email",
        localStorage.getItem(
            "memberEmail"
        )
    );

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

    showLoading(
        "正在送出預約..."
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

            modalOverlay.classList.remove(
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

            hideLoading();

            console.error(
                error
            );

            alert(
                "預約失敗"
            );

        }
    );

}

let bookingEndTime;

function updateCountdown(){

    if(
        !countdownDiv
    ){
        return;
    }

    const now =
    new Date();

    const diff =
    bookingEndTime - now;

    if(
        diff <= 0
    ){

        countdownDiv.textContent =
        "本期預約已截止";

        return;

    }

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
    
    const minutes =
    Math.floor(
        diff /
        1000 /
        60
    ) % 60;
    
    const seconds =
    Math.floor(
        diff /
        1000
    ) % 60;
    
    if(
        days > 0
    ){
    
        countdownDiv.textContent =
        `截止倒數 ${days}天 ${hours}小時`;
    
    }
    else{
    
        countdownDiv.textContent =
        `截止倒數 ${hours}小時 ${minutes}分 ${seconds}秒`;
    
    }

}

fetch(
    "https://script.google.com/macros/s/AKfycbyjyjZ891V-eMkAtImiB1Cl3fUTubcDhb_6sF6MPezzAdaIXr3_N1q5kZ5SbHpPHDhC/exec?action=settings"
)
.then(
    response=>response.json()
)
.then(
    settings=>{

        bookingEndTime =
        new Date(
            settings.bookingEnd
        );

        updateCountdown();

        setInterval(
            updateCountdown,
            1000
        );

    }
);
