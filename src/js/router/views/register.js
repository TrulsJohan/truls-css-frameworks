import { onRegister } from "../../ui/auth/register";

const backButton = document.createElement("button");
const form = document.forms.register;

form.addEventListener("submit", onRegister);
backButton.textContent = "Go Back";
backButton.addEventListener("click", ()=> window.history.back());
document.body.appendChild(backButton);

