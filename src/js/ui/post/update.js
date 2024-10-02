import { readPost } from "../../api/post/read.js";
import { updatePost } from "../../api/post/update.js";

export async function getDataFromPost() {
    const data = await readPost();

    if (!data || !data.data) {
        alert("Could not fetch data!");
        return;
    }

    const post = data.data;

    document.getElementById("title").value = post.title || '';
    document.getElementById("body").value = post.body || '';

    const tagsField = document.getElementById("tags");
    if (Array.isArray(post.tags)) {
        tagsField.value = post.tags.join(", ") || '';
    } else {
        tagsField.value = post.tags || '';
    }

    document.getElementById("mediaUrl").value = post.media.url || '';
    console.log("Data successfully fetched and form populated.");
}


export async function onUpdatePost(event) {
    event.preventDefault();
    const form = event.target;

    const title = form.title.value;
    const body = form.body.value;
    const tags = form.tags.value.split(",").map(tag => tag.trim());
    const mediaUrl = form.mediaUrl.value;

    if (!title || !body || !tags || !mediaUrl) {
        alert("Please fill in all the fields.");
        return;
    }

    const updateData = {
        title: title,
        body: body ,
        tags: tags,
        media: {url: mediaUrl}
    };

    try {
        const response = await updatePost(updateData);

        if (response) {
            console.log("post updated successfully");
            window.location.href = "/profile/";
        }
    }catch (error){
        alert(`There was an error updating the post: ${error.message}`);
        console.log(updateData)
    }
}
