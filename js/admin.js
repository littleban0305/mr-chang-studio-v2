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
                            <strong>${booking.birthday}</strong>
                        </div>
                
                        <div class="admin-item">
                            <span>預約時段</span>
                            <strong>${booking.slot}</strong>
                        </div>
                
                        <div class="admin-item">
                            <span>送出時間</span>
                            <strong>${booking.createdAt}</strong>
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
                
                        <button class="btn-blacklist">
                            黑名單
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

    }
);
