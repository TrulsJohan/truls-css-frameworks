import { API_KEY, API_SOCIAL_POSTS } from "../constants.js";

/**
 * Updates an existing social post by sending the updated data to the API.
 *
 * @async
 * @function updatePost
 * @param {Object} updateData - The data to update the post with.
 * @param {string} updateData.title - The updated title of the post.
 * @param {string} updateData.body - The updated body content of the post.
 * @param {string} [updateData.media] - Optional updated media URL associated with the post.
 * @returns {Promise<Object|undefined>} Returns the updated post data if successful, or logs an error if it fails.
 * @throws {Error} Throws an error if the request to update the post fails (non-2xx status).
 */
export async function updatePost(updateData) {
    const postId = localStorage.getItem(`selectedPostId`);

    if(!postId) {
        alert("No postId found")
        return;
    }

    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                "X-Noroff-API-Key": API_KEY,
            },
            body: JSON.stringify(updateData),
        });

        return response.json();

    }catch (error) {
        console.error(`error updating post: `, error)
    }
}

