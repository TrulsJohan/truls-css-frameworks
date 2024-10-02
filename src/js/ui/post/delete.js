import { deletePost } from "../../api/post/delete.js";

/**
 * Handles the post deletion process by prompting the user for confirmation,
 * calling the deletePost function, and redirecting to the profile page upon successful deletion.
 *
 * @async
 * @function onDeletePost
 * @param {Event} event - The event object associated with the delete action.
 * @returns {Promise<void>} Returns nothing.
 * @throws {Error} Throws an error if the post deletion process fails.
 */
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

