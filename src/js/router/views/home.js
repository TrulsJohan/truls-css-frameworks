import { authGuard } from "../../utilities/authGuard";
import {readPosts} from "../../api/post/read.js";

authGuard();

const postsContainer = document.getElementById("postsContainer");

/**
 * Displays a list of social posts on the page by fetching them from the API and rendering them in the posts container.
 *
 * @async
 * @function displayPosts
 * @param {number} [page=1] - The page number for pagination (default is 1).
 * @returns {Promise<void>} Returns nothing.
 * @throws {Error} Throws an error if the posts cannot be loaded.
 */
async function displayPosts(page = 1) {
    const data = await readPosts(12, page);
    if (!data) {
        alert("Failed to load posts");
        return;
    }

    postsContainer.innerHTML = data.data.map((post) => {
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

    postsContainer.querySelectorAll(".post-card").forEach((card) => {
        card.addEventListener("click", () => {
            const postId = card.getAttribute("data-id");
            localStorage.setItem("selectedPostId", postId);
            window.location.href = "/post/";
        });
    });
}

displayPosts();

