import { API_SOCIAL_PROFILES } from "../constants";
import { API_KEY } from "../constants";
import { getKey } from "../auth/key";

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

export async function readProfile(user) {
    const accessToken = await getKey();
    if (!accessToken) {
        console.error("Could not fetch post. No access token found.");
        return;
    }

    try {
        const response = await fetch(`${API_SOCIAL_PROFILES}/${user}`, getOptions(accessToken));

        if (!response.ok) {
            throw new Error(`Failed to fetch post: ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching post:", error.message);
    }
}

export async function readProfiles(limit, page) {}

getOptions();
