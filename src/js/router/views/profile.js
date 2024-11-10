import { authGuard } from "../../utilities/authGuard";
import { readPostsByUser } from "../../api/post/read";
import { readProfile } from "../../api/profile/read";
import { onUpdateProfile } from "../../ui/profile/update";
import { setLogoutListener } from "../../ui/global/logout";

const userPostsContainer = document.getElementById("userPostsContainer");
const profileContainer = document.getElementById("profileContainer");
const backButton = document.getElementById("backButton");
const form = document.forms.updateProfile;

form.addEventListener("submit", onUpdateProfile);
backButton.addEventListener("click", ()=> window.location.href = "/");

/**
 * Displays the user's profile information on the page by fetching it from the API.
 *
 * @async
 * @function displayUserProfile
 * @returns {Promise<void>} Returns nothing.
 * @throws {Error} Throws an error if the user data cannot be fetched or rendered.
 */
async function displayUserProfile (){
    const user = localStorage.getItem(`user`);
    const data = await readProfile(user);
    console.log(data)
    if(!data) {
        alert("Could not fetch user data")
        return;
    } else {
        profileContainer.innerHTML = `
            <div id="profileContainer" class="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <!-- Avatar Section -->
            <div class="flex justify-center mb-6">
                <img src="${data.data.avatar.url}" alt="avatar" class="w-32 h-32 rounded-full object-cover border-4 border-indigo-600">
            </div>

            <!-- Name -->
            <h1 class="text-3xl font-semibold text-gray-800 text-center mb-2">${data.data.name}</h1>

            <!-- Bio -->
            <p class="text-lg text-gray-600 text-center mb-6">${data.data.bio}</p>

            <!-- Update Profile Button -->
            <div class="flex justify-center">
                <button class="py-2 px-6 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                Update Profile
                </button>
            </div>
            </div>
        `

        document.getElementById("profileBanner").value = data.data.banner.url;
        document.getElementById("profileImage").value = data.data.avatar.url;
        document.getElementById("profileBio").value = data.data.bio;
    }
}

/**
 * Displays a list of posts created by the user on the page by fetching them from the API.
 *
 * @async
 * @function displayUserPosts
 * @returns {Promise<void>} Returns nothing.
 * @throws {Error} Throws an error if the user posts cannot be fetched or rendered.
 */
async function displayUserPosts() {
    const data = await readPostsByUser();
    if(!data) {
        alert("Could not fetch data")
        return;
    }

    userPostsContainer.innerHTML = data.data.map((post) => {
    const mediaUrl = post.media?.url || "https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg";
    const mediaAlt = post.media?.alt || "Post Image";
    const tags = post.tags?.length ? `<p class="text-xs text-gray-500 mt-1">${post.tags.join(", ")}</p>` : "";

    return `
        <div class="post-card bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105" data-id="${post.id}">
            <!-- Media Section -->
            <div class="media">
                <img src="${mediaUrl}" alt="${mediaAlt}" class="w-full h-48 object-cover"/>
            </div>

            <!-- Content Section -->
            <div class="p-4">
                <!-- Title -->
                <h2 class="text-lg font-semibold text-gray-800 mb-2">${post.title}</h2>
                
                <!-- Tags -->
                ${tags}

                <!-- Body -->
                <p class="text-sm text-gray-600 mt-2">${post.body}</p>
            </div>
        </div>`;
}).join("");


    userPostsContainer.querySelectorAll(".post-card").forEach((card) => {
        card.addEventListener("click", () => {
            const postId = card.getAttribute("data-id");
            localStorage.setItem("selectedPostId", postId);
            window.location.href = "/post/";
        });
    });
}

authGuard();
displayUserProfile();
displayUserPosts();
setLogoutListener();

