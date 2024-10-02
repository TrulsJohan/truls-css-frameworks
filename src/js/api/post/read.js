import { getKey } from "../auth/key.js";
import { API_SOCIAL_POSTS, API_SOCIAL_PROFILES } from "../constants.js";
import {API_KEY} from "../constants.js";

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

