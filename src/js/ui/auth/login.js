import { login } from "../../api/auth/login.js";

/**
 * Handles the login process by capturing user input, calling the login function,
 * and redirecting the user upon successful login.
 *
 * @async
 * @function onLogin
 * @param {Event} event - The event object associated with the form submission.
 * @returns {Promise<void>} Returns nothing.
 * @throws {Error} Throws an error if the login process fails.
 */
export async function onLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await login({ email, password });

        if (response && response.data && response.data.accessToken) {
            window.location.href = "/";
        } else {
            alert("Login failed");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login.");
    }
}

