const locationContent =
document.getElementById(
    "locationContent"
);

const isLogin =
localStorage.getItem(
    "isLogin"
);

if(isLogin){

    locationContent.innerHTML = `

        <div class="location-slider">

            <div class="location-card">

                <div class="card-tag">
                    張老師工作室
                </div>

                <img src="assets/location/1.jpg">

                <p>
                    新北市新店區北新路二段92巷1號11樓
                </p>

            </div>

            <div class="location-card">

                <img src="assets/location/2.jpg">

                <p>
                    在"NET"與"三花生活館"中間
                </p>

            </div>

            <div class="location-card">

                <div class="card-tag">
                    一樓大廳 兩部電梯都可搭
                </div>

                <img src="assets/location/3.jpg">

                <p>
                    跟管理員說 100號11樓 本號 張老師
                </p>

            </div>

            <div class="location-card">

                <img src="assets/location/4.jpg">

                <p>
                    到11樓往這個方向走
                </p>

            </div>

            <div class="location-card">

                <img src="assets/location/5.jpg">

                <p>
                    經過消防栓左轉
                </p>

            </div>

            <div class="location-card">

                <img src="assets/location/6.jpg">

                <p>
                    左邊第一間
                </p>

            </div>

            <div class="location-card">

                <img src="assets/location/7.jpg">

                <p>
                    100號11樓(本號)
                </p>

            </div>

        </div>

    `;

}else{

    locationContent.innerHTML = `

        <div class="location-lock">

            <h3>
                🔒 會員專屬內容
            </h3>

            <p>
                登入會員後可查看詳細地址與前往工作室路線
            </p>

        </div>

    `;

}

const cards =
document.querySelectorAll(
    ".location-card"
);

let currentIndex = 0;

nextBtn.addEventListener(
    "click",
    ()=>{

        if(
            currentIndex <
            cards.length - 1
        ){

            currentIndex++;

        }

        cards[currentIndex]
        .scrollIntoView({

            behavior:"smooth",

            inline:"start"

        });

    }
);

prevBtn.addEventListener(
    "click",
    ()=>{

        if(
            currentIndex > 0
        ){

            currentIndex--;

        }

        cards[currentIndex]
        .scrollIntoView({

            behavior:"smooth",

            inline:"start"

        });

    }
);
