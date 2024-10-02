import { register } from "../../api/auth/register.js";

/**
 * Handles the registration process by capturing user input, calling the register function,
 * and logging the result of the registration attempt.
 *
 * @async
 * @function onRegister
 * @param {Event} event - The event object associated with the form submission.
 * @returns {Promise<void>} Returns nothing.
 * @throws {Error} Throws an error if the registration process fails.
 */
export async function onRegister(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    try {
        const data = await register({ name, email, password });
        console.log('Registration successful', data);
    } catch (error) {
        console.error('Registration failed', error);
    }
}

