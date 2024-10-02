/**
 * Retrieves the access token from local storage.
 *
 * This function checks for the existence of an access token in the browser's local storage.
 * If the token is found, it returns the token. If no token is found, it logs an error to the console,
 * redirects the user to the login page (`/auth/login/`), and returns `null`.
 *
 * @async
 * @function getKey
 *
 * @returns {Promise<string|null>} Resolves to the access token if found, otherwise returns `null` and redirects to login.
 *
 * Example:
 * ```javascript
 * const token = await getKey();
 * if (token) {
 *     // Proceed with API call or other authenticated actions
 * } else {
 *     // Handle case where the user is not authenticated
 * }
 * ```
 */
export async function getKey() {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
        return accessToken;
    } else {
        console.error("Access denied: No access token found.");
        window.location.href = "/auth/login/";
        return null;
    }
}

