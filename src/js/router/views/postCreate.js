import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const form = document.forms.createPost;

form.addEventListener("submit", onCreatePost);

const backButton = document.createElement("button");
backButton.textContent = "Go Back";
backButton.addEventListener("click", ()=> window.history.back());
document.body.appendChild(backButton);
