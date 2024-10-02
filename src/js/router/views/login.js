import { onLogin } from "../../ui/auth/login";

const backButton = document.createElement("button");
const form = document.forms.login;

form.addEventListener("submit", onLogin);
backButton.textContent = "Go Back";
backButton.addEventListener("click", ()=> window.history.back());
document.body.appendChild(backButton);
