const menuBtn =
document.getElementById("menuBtn");

const mobileMenu =
document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {

    if(
        mobileMenu.style.display === "flex"
    ){
        mobileMenu.style.display = "none";
    }else{
        mobileMenu.style.display = "flex";
    }

});
