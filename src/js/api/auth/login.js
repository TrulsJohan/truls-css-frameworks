import { API_AUTH_LOGIN, API_KEY } from "../constants.js";

/**
 * Logs in a user by sending their credentials to the authentication API and storing the access token and username in local storage.
 *
 * @async
 * @function login
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object|undefined>} Returns the response data from the API if successful, otherwise logs an error and shows an alert.
 * @throws {Error} Throws an error if the login request fails (non-2xx status).
 */
export async function login({ email, password }) {
    try {
        const response = await fetch(API_AUTH_LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Noroff-API-Key": API_KEY,
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        const token = data.data.accessToken;
        const user = data.data.name;
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return data;
        
    } catch (error) {
        console.error(error);
        alert("Failed to fetch login: " + error.message);
    }
}

