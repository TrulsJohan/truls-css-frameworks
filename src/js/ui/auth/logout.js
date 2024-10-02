/**
 * Sets up the logout functionality by adding an event listener to the logout button.
 * Clears the local storage and redirects the user to the login page upon clicking the button.
 *
 * @function onLogout
 * @returns {void} Returns nothing.
 */
export function onLogout() {
    const logoutBtn = document.getElementById("logout-btn");
    logoutBtn.addEventListener("click", ()=> {
        localStorage.clear();
        window.location.href = "/auth/login/";
    })
}

