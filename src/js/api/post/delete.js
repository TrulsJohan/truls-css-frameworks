import {API_KEY, API_SOCIAL_POSTS} from "../constants.js";

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

