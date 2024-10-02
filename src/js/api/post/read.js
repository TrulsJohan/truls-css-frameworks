import { getKey } from "../auth/key.js";
import { API_SOCIAL_POSTS, API_SOCIAL_PROFILES } from "../constants.js";
import {API_KEY} from "../constants.js";

/**
 * Generates the options for an API request, including method, headers, and authorization.
 *
 * @function getOptions
 * @param {string} accessToken - The access token for authorization.
 * @returns {Object} An object containing the request method and headers.
 * @property {string} method - The HTTP method, set to "GET".
 * @property {Object} headers - The headers including API key, authorization token, and content type.
 */
function getOptions(accessToken) {
    return {
        method: "GET",
        headers: {
            "X-Noroff-API-Key": API_KEY,
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    };
}

/**
 * Retrieves a specific social post by ID from the API, including the author information.
 *
 * @async
 * @function readPost
 * @param {string} id - The ID of the post to fetch.
 * @returns {Promise<Object|undefined>} Returns the post data if successful, or logs an error if it fails.
 * @throws {Error} Throws an error if the request to fetch the post fails (non-2xx status).
 */
export async function readPost(id) {
    const accessToken = await getKey();
    if (!accessToken) {
        console.error("Could not fetch post. No access token found.");
        return;
    }

    const postId = localStorage.getItem(`selectedPostId`);
    if(!postId) {
        alert("No postId found")
        return;
    }

    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${postId}/?_author=true`, getOptions(accessToken));

        if (!response.ok) {
            throw new Error(`Failed to fetch post: ${response.statusText}`);
        }

        const post = await response.json();
        return post;

    } catch (error) {
        console.error("Error fetching post:", error.message);
    }
}

/**
 * Retrieves a list of social posts from the API with optional pagination.
 *
 * @async
 * @function readPosts
 * @param {number} [limit=12] - The maximum number of posts to retrieve (default is 12).
 * @param {number} [page=1] - The page number for pagination (default is 1).
 * @returns {Promise<Object|undefined>} Returns the posts data if successful, or logs an error if it fails.
 * @throws {Error} Throws an error if the request to fetch the posts fails (non-2xx status).
 */
export async function readPosts(limit = 12, page = 1) {
    const accessToken = await getKey();
    if (!accessToken) {
        console.error("Could not fetch posts. No access token found.");
        return;
    }

    const url = new URL(API_SOCIAL_POSTS);
    url.searchParams.append("limit", limit);
    url.searchParams.append("page", page);


    try {
        const response = await fetch(url.toString(), getOptions(accessToken));
        if (!response.ok) {
            throw new Error(`Error fetching posts: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error.message);
    }
}

/**
 * Retrieves a list of posts by a specific user from the API with optional pagination.
 *
 * @async
 * @function readPostsByUser
 * @param {string} username - The username of the user whose posts are to be retrieved.
 * @param {number} [limit=12] - The maximum number of posts to retrieve (default is 12).
 * @param {number} [page=1] - The page number for pagination (default is 1).
 * @returns {Promise<Object|undefined>} Returns the user's posts data if successful, or logs an error if it fails.
 * @throws {Error} Throws an error if the request to fetch the user's posts fails (non-2xx status).
 */
export async function readPostsByUser(username, limit = 12, page = 1) {
    const accessToken = await getKey();
    if (!accessToken) {
        console.error("Could not fetch posts. No access token found.");
        return;
    }

    const user = localStorage.getItem(`user`);
    if(!user) {
        alert("User not found")
        return;
    }

    const url = new URL(`${API_SOCIAL_PROFILES}/${user}/posts`);
    url.searchParams.append("limit", limit);
    url.searchParams.append("page", page);


    try {
        const response = await fetch(url.toString(), getOptions(accessToken));
        if (!response.ok) {
            throw new Error(`Error getting user data: ${response.statusText}`);
        }
        const userPosts = await response.json();
        return userPosts;
    } catch (error) {
        console.error("Error:", error.message);
    }
}

