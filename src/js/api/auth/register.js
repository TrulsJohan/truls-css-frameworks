import {API_AUTH_REGISTER} from "../constants.js";

/**
 * Registers a new user by sending their details to the authentication API.
 * Redirects the user to the login page upon successful registration.
 *
 * @async
 * @function register
 * @param {Object} userDetails - The new user's registration details.
 * @param {string} userDetails.name - The new user's name.
 * @param {string} userDetails.email - The new user's email address.
 * @param {string} userDetails.password - The new user's password.
 * @returns {Promise<Object|undefined>} Returns the response data from the API if successful, otherwise logs an error and throws it.
 * @throws {Error} Throws an error if the registration request fails (non-2xx status).
 */

export async function register({ name, email, password, }) {
  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }else{
      console.log("created account" + name)
      window.location.href = "/auth/login/"
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
}

