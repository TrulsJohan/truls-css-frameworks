import { updateProfile } from "../../api/profile/update";

/**
 * Handles the profile update process by preventing the default form submission,
 * retrieving the current user from local storage, and calling the updateProfile function.
 * Displays an alert if the user data cannot be fetched.
 *
 * @async
 * @function onUpdateProfile
 * @param {Event} event - The event object associated with the form submission.
 * @returns {Promise<void>} Returns nothing.
 * @throws {Error} Throws an error if the user data cannot be fetched or updated.
 */
export async function onUpdateProfile(event) {
    event.preventDefault(); 
    const user = localStorage.getItem(`user`);
    const data = await updateProfile(user);
    if(!data) {
        alert("Could not fetch user data")
        return;
    }
}

