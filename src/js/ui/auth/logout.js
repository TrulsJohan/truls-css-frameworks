export function onLogout() {
    const logoutBtn = document.getElementById("logout-btn");
    logoutBtn.addEventListener("click", ()=> {
        console.log("click")
        localStorage.clear();
        window.location.href = "/auth/login/";
    })
}
