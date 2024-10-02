import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from "../../ui/global/logout";
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
        const tags = post.tags?.length ? `<p class="tags">${post.tags.join(", ")}</p>` : "";

        return `
            <div class="post-card" data-id="${post.id}">
                <div class="media">
                    <img src="${mediaUrl}" alt="${mediaAlt}"/>
                </div>
                <h2 class="title">${post.title}</h2>
                ${tags}
                <p class="body">${post.body}</p>
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

setLogoutListener();
displayPosts();

