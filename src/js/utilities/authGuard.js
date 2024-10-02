/**
 * Checks if a user is authenticated by verifying the presence of a token in local storage.
 * Redirects the user to the login page if the token is not found.
 *
 * @function authGuard
 * @returns {void} Returns nothing.
 */
export function authGuard() {
  if (!localStorage.token) {
    window.location.href = "/auth/login/";
  }
}
