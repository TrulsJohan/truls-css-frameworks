import { readPost } from "../../api/post/read";
import { onDeletePost } from "../../ui/post/delete.js";

const postContainer = document.getElementById("postContainer");

const backButton = document.createElement("button");
backButton.textContent = "Go Back";
backButton.addEventListener("click", ()=> window.history.back());
document.body.appendChild(backButton);

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
        <div class="post-card bg-white shadow-lg rounded-lg p-6 mb-6 space-y-4" data-id="${post.id}">
            <!-- Media Section -->
            <div class="media mb-4">
                <img src="${mediaUrl}" alt="${mediaAlt}" class="w-full h-auto rounded-lg shadow-md object-cover" />
            </div>

            <!-- Title Section -->
            <h2 class="title text-3xl font-semibold text-gray-800 leading-tight">${post.title}</h2>

            <!-- Tags Section (only if tags exist) -->
            ${tags ? `<p class="tags text-sm text-gray-500 mt-2">Tags: ${tags}</p>` : ''}

            <!-- Body Section -->
            <p class="body text-lg text-gray-700 mt-4">${post.body}</p>
        </div>
    `;

        
    localStorage.removeItem(`selectedPostId`);
}

displayPost();

