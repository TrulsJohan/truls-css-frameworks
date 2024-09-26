import { authGuard } from "../../utilities/authGuard";
import { readPostsByUser } from "../../api/post/read";

const userPostsContainer = document.getElementById("userPostsContainer");

async function displayUserPosts() {
    const data = await readPostsByUser();
    if(!data) {
        alert("Could not fetch data")
        return;
    }

    userPostsContainer.innerHTML = data.data.map((post) => {
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

    userPostsContainer.querySelectorAll(".post-card").forEach((card) => {
        card.addEventListener("click", () => {
            const postId = card.getAttribute("data-id");
            localStorage.setItem("selectedPostId", postId);
            window.location.href = "/post/";
        });
    });
}

authGuard();
displayUserPosts();

