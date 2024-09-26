import { readPost } from "../../api/post/read";

const backButton = document.createElement("button");
backButton.textContent = "Go Back";
backButton.addEventListener("click", ()=> window.history.back());
document.body.appendChild(backButton);

const postContainer = document.createElement("div");
document.body.appendChild(postContainer);

async function displayPost() {
    const { ok, data } = await readPost()
    if(!ok) {
        alert("Could not fetch data!")
        return;
    }

    const post = data.data;

    const mediaUrl = post.media?.url || "https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg";
    const mediaAlt = post.media?.alt || "Post Image";
    const tags = post.tags?.length ? `<p class="tags">${post.tags.join(", ")}</p>` : "";

    postContainer.innerHTML = `
        <div class="post-card" data-id="${post.id}">
            <div class="media">
                <img src="${mediaUrl}" alt="${mediaAlt}" />
            </div>
            <h2 class="title">${post.title}</h2>
            ${tags}
            <p class="body">${post.body}</p>
        </div>`;
}

displayPost();

