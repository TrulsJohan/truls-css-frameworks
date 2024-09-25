import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from "../../ui/global/logout";
import {readPosts} from "../../api/post/read.js";


authGuard();
setLogoutListener();

    const postContainer = document.getElementById("postContainer");

async function displayPosts(page = 1) {
    const { ok, data } = await readPosts(12, page);
    if (!ok) {
        return alert("Failed to load posts");
    }

    postContainer.innerHTML = data.data.map((post) => {
        const mediaUrl = post.media?.url || "https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg";
        const mediaAlt = post.media?.alt || "Post Image";
        const tags = post.tags?.length ? `<p class="tags">${post.tags.join(", ")}</p>` : "";

        return `
            <div class="post-card" post-id="${post.id}">
                <div class="media">
                    <img src="${mediaUrl}" alt="${mediaAlt}"/>
                </div>
                <h2 class="title">${post.title}</h2>
                ${tags}
                <p class="body">${post.body}</p>
            </div>`;
    }).join("");

    postContainer.querySelectorAll(".post-card").forEach((card) => {
        card.addEventListener("click", () => {
            localStorage.setItem("selectedPostId", card.dataset.postId);
            window.location.href = "/post/";
        });
    });
}

// Display posts on page load
// displayPosts();


