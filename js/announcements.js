showLoading(
    "正在載入公告..."
);

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
            "allAnnouncementList"
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

        list.innerHTML =
        announcements
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

                }[a.type]
                ||
                "system-tag";

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

        hideLoading();

    }
);
