const locationContent =
document.getElementById(
    "locationContent"
);

const isLogin =
localStorage.getItem(
    "isLogin"
);

if(
    isLogin &&
    locationContent
){

    locationContent.innerHTML =
    `
    <p>
        📍 新北市永和區永和路二段100號11樓
    </p>

    <p>
        Mr. Chang 張老師工作室
    </p>
    `;
}
