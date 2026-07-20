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

        data.forEach(
            booking=>{

                const details =
                document.createElement(
                    "details"
                );

                const summary =
                document.createElement(
                    "summary"
                );

                summary.textContent =
                booking.name;

                details.appendChild(
                    summary
                );

                details.innerHTML += `
                <div class="booking-card">

                    <p>
                        📞 ${booking.phone}
                    </p>

                    <p>
                        🎂 ${booking.birthday}
                    </p>

                    <p>
                        📅 ${booking.slot}
                    </p>

                    <p>
                        📝 ${booking.note}
                    </p>

                    <p>
                        ⏰ ${booking.createdAt}
                    </p>

                    <p>
                        📌 ${booking.status}
                    </p>

                    <p>
                        💬 ${booking.memberNote}
                    </p>

                </div>
                `;

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

                    normalSection
                    .appendChild(
                        details
                    );

                }

            }
        );

    }
);
