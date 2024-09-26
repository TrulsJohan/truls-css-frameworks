import { API_AUTH_LOGIN, API_KEY } from "../constants.js";

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

        // Check for an error in the response
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return data; // Return the data if successful
        
    } catch (error) {
        console.error(error);
        alert("Failed to fetch login: " + error.message);
    }
}

