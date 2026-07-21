function formatDate(dateString){

    const date =
    new Date(dateString);

    return date.toLocaleDateString(
        "zh-TW"
    );

}

function formatDateTime(dateString){

    const date =
    new Date(dateString);

    return date.toLocaleString(
        "zh-TW"
    );

}

const vipSection =
document.getElementById(
    "vipSection"
);

const normalSection =
document.getElementById(
    "normalSection"
);

const blacklistSection =
document.getElementById(
    "blacklistSection"
);

fetch(
    "https://script.google.com/macros/s/AKfycbyjyjZ891V-eMkAtImiB1Cl3fUTubcDhb_6sF6MPezzAdaIXr3_N1q5kZ5SbHpPHDhC/exec"
)
.then(
    response=>response.json()
)
.then(
    data=>{

        let vipCount = 0;

        let normalCount = 0;

        let blacklistCount = 0;

        data.forEach(
            booking=>{

                const details =
                document.createElement(
                    "details"
                );
                
                details.className =
                "admin-member";
                
                let tagClass =
                "normal-tag";
                
                if(
                    booking.memberType
                    ===
                    "VIP"
                ){

                    vipCount++;
                
                    tagClass =
                    "vip-tag";
                
                }
                
                else if(
                    booking.memberType
                    ===
                    "黑名單"
                ){

                    blacklistCount++;
                
                    tagClass =
                    "blacklist-tag";
                
                }
                
                details.innerHTML = `
                
                <summary>
                
                    ${booking.name}
                
                    <span class="${tagClass}">
                        ${booking.memberType}
                    </span>
                
                </summary>
                
                <div class="admin-content">
                
                    <div class="admin-grid">
                
                        <div class="admin-item">
                            <span>電話</span>
                            <strong>${booking.phone}</strong>
                        </div>
                
                        <div class="admin-item">
                            <span>生日</span>
                            <strong>${formatDate(
                                booking.birthday
                            )}</strong>
                        </div>
                
                        <div class="admin-item">
                            <span>預約時段</span>
                            <strong>
                            ${
                            new Date(
                            booking.slot
                            ).toLocaleString(
                            "zh-TW",
                            {
                            month:"numeric",
                            day:"numeric",
                            hour:"2-digit",
                            minute:"2-digit"
                            }
                            )
                            }
                            </strong>
                        </div>
                
                        <div class="admin-item">
                            <span>送出時間</span>
                            <strong>${formatDateTime(
                                booking.createdAt
                            )}</strong>
                        </div>
                
                        <div class="admin-item">
                            <span>狀態</span>
                            <strong>${booking.status}</strong>
                        </div>
                
                        <div class="admin-item">
                            <span>備註</span>
                            <strong>${booking.note || "無"}</strong>
                        </div>
                
                        <div class="admin-item">
                            <span>會員備註</span>
                            <strong>${booking.memberNote || "無"}</strong>
                        </div>
                
                    </div>
                
                    <div class="admin-actions">
                
                        <button
                            class="btn-confirm"
                            data-name="${booking.name}">
                            確認預約
                        </button>
                
                        <button class="btn-wait">
                            候補
                        </button>
                
                        <button
                            class="btn-cancel"
                            data-name="${booking.name}"
                            data-slot="${booking.slot}">
                            取消預約
                        </button>
                
                    </div>
                
                </div>
                
                `;

                const confirmBtn =
                details.querySelector(
                    ".btn-confirm"
                );
                
                confirmBtn.addEventListener(
                    "click",
                    ()=>{
                
                        const formData =
                        new URLSearchParams();
                        
                        formData.append(
                            "action",
                            "updateStatus"
                        );
                        
                        formData.append(
                            "name",
                            booking.name
                        );
                        
                        formData.append(
                            "status",
                            "已確認"
                        );
                        
                        fetch(
                            "https://script.google.com/macros/s/AKfycbyjyjZ891V-eMkAtImiB1Cl3fUTubcDhb_6sF6MPezzAdaIXr3_N1q5kZ5SbHpPHDhC/exec",
                            {
                        
                                method:"POST",
                        
                                body:formData
                        
                            }
                        )
                        .then(
                            ()=>{
                        
                                alert(
                                    "預約已確認"
                                );
                        
                                location.reload();
                        
                            }
                        );
                
                    }
                );

                const cancelBtn =
                details.querySelector(
                    ".btn-cancel"
                );
                
                cancelBtn.addEventListener(
                    "click",
                    ()=>{
                
                        const formData =
                        new URLSearchParams();
                
                        formData.append(
                            "action",
                            "cancelBooking"
                        );
                
                        formData.append(
                            "name",
                            booking.name
                        );
                
                        formData.append(
                            "slot",
                            booking.slot
                        );
                
                        fetch(
                            "https://script.google.com/macros/s/AKfycbyjyjZ891V-eMkAtImiB1Cl3fUTubcDhb_6sF6MPezzAdaIXr3_N1q5kZ5SbHpPHDhC/exec",
                            {
                                method:"POST",
                                body:formData
                            }
                        )
                        .then(
                            ()=>{
                
                                alert(
                                    "已取消預約"
                                );
                
                                location.reload();
                
                            }
                        );
                
                    }
                );

                if(
                    booking.memberType
                    ===
                    "VIP"
                ){

                    vipSection.appendChild(
                        details
                    );

                }

                else if(
                    booking.memberType
                    ===
                    "黑名單"
                ){

                    blacklistSection
                    .appendChild(
                        details
                    );

                }

                else{

                    normalCount++;
                
                    normalSection
                    .appendChild(
                        details
                    );
                
                }

            }
        );

        document.getElementById(
            "vipCount"
        ).textContent =
        vipCount;
        
        document.getElementById(
            "normalCount"
        ).textContent =
        normalCount;

        document.getElementById(
            "blacklistCount"
        ).textContent =
        blacklistCount;
        
        document.getElementById(
            "totalBookings"
        ).textContent =
        data.length;

        document.getElementById(
            "vipTitle"
        ).textContent =
        `👑 VIP會員 (${vipCount})`;
        
        document.getElementById(
            "normalTitle"
        ).textContent =
        `👤 普通會員 (${normalCount})`;
        
        document.getElementById(
            "blacklistTitle"
        ).textContent =
        `🚫 黑名單 (${blacklistCount})`;

    }
);
