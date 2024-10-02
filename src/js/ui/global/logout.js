import { onLogout } from "../auth/logout";

/**
 * Initializes the logout listener by calling the onLogout function.
 *
 * @function setLogoutListener
 * @returns {void} Returns nothing.
 */
export function setLogoutListener() {
    onLogout()
}

