import { readPost } from "../../api/post/read";
import { onDeletePost } from "../../ui/post/delete.js";

const backButton = document.createElement("button");
backButton.textContent = "Go Back";
backButton.addEventListener("click", ()=> window.history.back());
document.body.appendChild(backButton);

const postContainer = document.createElement("div");
document.body.appendChild(postContainer);

/**
 * Displays a specific social post on the page by fetching it from the API and rendering its content.
 * Provides options to edit or delete the post if the logged-in user is the author.
 *
 * @async
 * @function displayPost
 * @returns {Promise<void>} Returns nothing.
 * @throws {Error} Throws an error if the post data cannot be fetched or rendered.
 */
async function displayPost() {
    const data = await readPost()
    if(!data) {
        alert("Could not fetch data!")
        return;
    }

    const post = data.data;

    const mediaUrl = post.media?.url || "https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg";
    const mediaAlt = post.media?.alt || "Post Image";
    const tags = post.tags?.length ? `<p class="tags">${post.tags.join(", ")}</p>` : "";

    if (localStorage.getItem('user') === post.author.name){
        const editPostButton = document.createElement("button");
        editPostButton.textContent = "Edit post";
        const deletePostButton = document.createElement("button");
        deletePostButton.textContent = "Delete post";

        editPostButton.addEventListener("click", ()=> {
            const updateId = post.id;
            localStorage.setItem("selectedPostId", updateId)
            window.location.href = '../../post/edit/'
        })

        deletePostButton.addEventListener("click", ()=> {
            const updateId = post.id;
            localStorage.setItem("selectedPostId", updateId)
            onDeletePost()
        })

        document.body.appendChild(editPostButton)
        document.body.appendChild(deletePostButton)
    }

    postContainer.innerHTML = `
        <div class="post-card" data-id="${post.id}">
            <div class="media">
                <img src="${mediaUrl}" alt="${mediaAlt}" />
            </div>
            <h2 class="title">${post.title}</h2>
            ${tags}
            <p class="body">${post.body}</p>
        </div>`;
        
    localStorage.removeItem(`selectedPostId`);
}

displayPost();

