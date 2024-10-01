import { onUpdatePost, getDataFromPost } from "../../ui/post/update.js";
import { authGuard } from "../../utilities/authGuard";

authGuard();
getDataFromPost()


const form = document.forms.editPost;

if (form) {
    form.addEventListener("submit", onUpdatePost);
} else {
    console.error("Form not found");
}