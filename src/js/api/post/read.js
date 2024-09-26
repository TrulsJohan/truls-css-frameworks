import { getKey } from "../auth/key.js";
import { API_SOCIAL_POSTS } from "../constants.js";
import {API_KEY} from "../constants.js";

// Function to get options
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


// Function to read a single post (currently not implemented)
export async function readPost(id) {
    const accessToken = await getKey();
    if (!accessToken) {
        console.error("Could not fetch post. No access token found.");
        return;
    }

    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${id}/?_author=true`, getOptions(accessToken));

        if (!response.ok) {
            throw new Error(`Failed to fetch post: ${response.statusText}`);
        }

        const post = await response.json();
        console.log(post);
        return post;

    } catch (error) {
        console.error("Error fetching post:", error.message);
    }
}

// Get 12 posts with pagination
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
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Function to read posts by a specific user (currently not implemented)
export async function readPostsByUser(username, limit = 12, page = 1, tag) {}