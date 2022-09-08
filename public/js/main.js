const menuLogoIcon = document.querySelector(".profile");
const desktopMenu = document.querySelector(".btn-logout");

menuLogoIcon.addEventListener("click", toggleIconLogout);

function toggleIconLogout(){
    const isAsideClosed = desktopMenu.classList.contains("inactive");
    if(!isAsideClosed){
        desktopMenu.classList.add("inactive");    }
}