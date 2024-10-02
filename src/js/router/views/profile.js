import { authGuard } from "../../utilities/authGuard";
import { readPostsByUser } from "../../api/post/read";
import { readProfile } from "../../api/profile/read";
import { onUpdateProfile } from "../../ui/profile/update";

const userPostsContainer = document.getElementById("userPostsContainer");
const backButton = document.getElementById("backButton");
const form = document.forms.updateProfile;

form.addEventListener("submit", onUpdateProfile);
backButton.addEventListener("click", ()=> window.history.back());


async function displayUserProfile (){
    const user = localStorage.getItem(`user`);
    const data = await readProfile(user);
    if(!data) {
        alert("Could not fetch user data")
        return;
    } else {
        document.getElementById("profileBanner").value = data.data.banner.url;
        document.getElementById("profileImage").value = data.data.avatar.url;
        document.getElementById("profileBio").value = data.data.bio;
    }
}

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
displayUserProfile();
displayUserPosts();

