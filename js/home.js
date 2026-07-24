let loadedCount = 0;

const memberBtn =
document.getElementById(
    "memberBtn"
);

const bookingBtn =
document.getElementById(
    "bookingEntryBtn"
);

const isLogin =
localStorage.getItem(
    "isLogin"
);

let startTime;
let endTime;

console.log(
    document.getElementById(
        "loadingOverlay"
    )
);

showLoading(
    "正在讀取資料..."
);

fetch(
    "https://script.google.com/macros/s/AKfycbyjyjZ891V-eMkAtImiB1Cl3fUTubcDhb_6sF6MPezzAdaIXr3_N1q5kZ5SbHpPHDhC/exec?action=settings"
)
.then(
    response=>response.json()
)
.then(
    settings=>{

        startTime =
        new Date(
            settings.bookingStart
        );

        endTime =
        new Date(
            settings.bookingEnd
        );

        if(isLogin){
        
            loadNotifications();
        
        }

        updateBookingButton();

        setInterval(
            updateBookingButton,
            1000
        );

        checkLoading();

    }
);

function loadNotifications(){

    const email =
    localStorage.getItem(
        "memberEmail"
    );

    if(
        !email
    ){
        return;
    }

    fetch(

        "https://script.google.com/macros/s/AKfycbyjyjZ891V-eMkAtImiB1Cl3fUTubcDhb_6sF6MPezzAdaIXr3_N1q5kZ5SbHpPHDhC/exec"

        +

        "?action=getNotifications"

        +

        "&email="

        +

        encodeURIComponent(
            email
        )

    )
    .then(
        response=>response.json()
    )
    .then(
        notifications=>{

            const list =
            document.getElementById(
                "notificationList"
            );

            if(
                notifications.length
                ===
                0
            ){

                list.innerHTML = `
                    <div
                        class="notification-empty"
                    >
                        目前沒有通知
                    </div>
                `;

                return;

            }

            list.innerHTML =
            notifications
            .map(
                n=>`

                <div
                    class="notification-item"
                >

                    <div
                        class="notification-title"
                    >

                        ${n.title}

                    </div>

                    <div
                        class="notification-message"
                    >

                        ${n.message}

                    </div>

                    <div
                        class="notification-time"
                    >

                        ${n.time}

                    </div>

                </div>

                `
            )
            .join("");

            updateBadge(
                notifications
            );

            checkLoading();

        }
    );

}

function updateBadge(
    notifications
){

    const badge =
    document.getElementById(
        "notificationBadge"
    );

    const unread =
    notifications.filter(
        n=>!n.read
    ).length;

    if(
        unread <= 0
    ){

        badge.style.display =
        "none";

        return;

    }

    badge.style.display =
    "flex";

    badge.textContent =
    unread;

}

function updateBookingButton(){

    const isLogin =
    localStorage.getItem(
        "isLogin"
    );
    
    if(
        !isLogin
    ){
    
        bookingBtn.textContent =
        "登入會員";
    
        bookingBtn.href =
        "login.html";
    
        memberBtn.textContent =
        "會員註冊";
    
        memberBtn.href =
        "register.html";
    
        return;
    
    }
    
    memberBtn.textContent =
    "會員中心";
    
    memberBtn.href =
    "profile.html";

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
            下一次開放預約剩餘<br>
            ${days}天 ${hours}小時
            `;
        
        }
        else{
        
            bookingBtn.innerHTML =
            `
            預約開放倒數<br>
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

fetch(
    "https://script.google.com/macros/s/AKfycbyjyjZ891V-eMkAtImiB1Cl3fUTubcDhb_6sF6MPezzAdaIXr3_N1q5kZ5SbHpPHDhC/exec?action=getAnnouncements"
)
.then(
    response=>response.json()
)
.then(
    announcements=>{

        const list =
        document.getElementById(
            "announcementList"
        );

        if(
            announcements.length
            ===
            0
        ){

            list.innerHTML =
            "目前沒有公告";

            return;

        }

        const latest =
        announcements.slice(
            0,
            3
        );
        
        list.innerHTML =
        latest
        .map(
            a=>{
        
                const typeClass = {
        
                    "系統公告":
                    "system-tag",
        
                    "活動公告":
                    "activity-tag",
        
                    "維護公告":
                    "maintenance-tag",
        
                    "工作室公告":
                    "studio-tag"
        
                }[a.type] || "system-tag";
        
                return `
        
                <div
                    class="announcement-card"
                >
        
                    <span
                        class="announcement-date"
                    >
                        ${a.date}
                    </span>
        
                    <div
                        class="
                        announcement-type
                        ${typeClass}
                        "
                    >
                        ${a.type}
                    </div>
        
                    <h3>
                        ${a.title}
                    </h3>
        
                    <p>
                        ${a.content}
                    </p>
        
                </div>
        
                `;
        
            }
        )
        .join("");

        checkLoading();

    }
);

function checkLoading(){

    loadedCount++;

    if(
        loadedCount >= 3
    ){

        hideLoading();

    }

}
