import { deletePost } from "../../api/post/delete.js";

export async function onDeletePost(event) {

    if (confirm("are you sure you want to delete this post?")){

        const deletion = await deletePost(event);
        if (deletion) {
            window.location.href = "/profile/";
            alert("Deleted post")
        } else {
            alert("Failed to delete post.");
        }
    }
}
