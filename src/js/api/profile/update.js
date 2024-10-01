import { getKey } from "../auth/key.js";
import { API_SOCIAL_PROFILES } from "../constants.js";
import {API_KEY} from "../constants.js";

export async function updateProfile(user) {
    const bio = document.getElementById("profileBio").value;
    const bannerUrl = document.getElementById("profileBanner").value;
    const avatarUrl = document.getElementById("profileImage").value;

    if (!bio || !bannerUrl || !avatarUrl) {
        alert("Please fill in all the fields.");
        return null;
    }

    const accessToken = await getKey();
    if (!accessToken) {
        console.error("Could not fetch post. No access token found.");
        return;
    }

    try {
        const response = await fetch(`${API_SOCIAL_PROFILES}/${user}`, {
            method: "PUT",
            headers: {
                "X-Noroff-API-Key": API_KEY,
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bio: bio,
                banner: { url: bannerUrl },
                avatar: { url: avatarUrl },
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}
