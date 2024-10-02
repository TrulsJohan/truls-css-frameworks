import {API_KEY, API_SOCIAL_POSTS} from "../constants.js";

/**
 * Deletes a social post by ID from the API.
 *
 * @async
 * @function deletePost
 * @param {string} id - The ID of the post to delete.
 * @returns {Promise<Response|undefined>} Returns the API response if the deletion is successful, otherwise logs an error.
 * @throws {Error} Throws an error if the request to delete the post fails.
 */
export async function deletePost(id) {
    const postId = localStorage.getItem(`selectedPostId`);

    if(!postId) {
        alert("No postId found")
        return;
    }

    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                "X-Noroff-API-Key": API_KEY,
            }
        });

        return response;

    }catch (error) {
        console.error(`error updating post: `, error)
    }
}

