import { API_KEY, API_SOCIAL_POSTS } from "../constants.js";

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
