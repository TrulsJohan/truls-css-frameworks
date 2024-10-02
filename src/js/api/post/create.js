import { API_KEY, API_SOCIAL_POSTS } from "../constants.js"; 

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

