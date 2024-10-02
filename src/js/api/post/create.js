import { API_KEY, API_SOCIAL_POSTS } from "../constants.js";

/**
 * Creates a new social post by sending post data to the API.
 *
 * @async
 * @function createPost
 * @param {Object} postData - The data for the new post.
 * @param {string} postData.title - The title of the post.
 * @param {string} postData.body - The body content of the post.
 * @param {string} [postData.media] - Optional media URL associated with the post.
 * @returns {Promise<Object>} Returns the created post data from the API if successful.
 * @throws {Error} Throws an error if the request to create the post fails (non-2xx status).
 */
export async function createPost(postData) {
    try {
        const response = await fetch(API_SOCIAL_POSTS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                "X-Noroff-API-Key": API_KEY,
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Error creating post:", error);
        throw error; 
    }
}

