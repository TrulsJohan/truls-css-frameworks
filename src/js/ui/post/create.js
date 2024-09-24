import { createPost } from "../../api/post/create";

export async function onCreatePost(event) {
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

    const postData = {
        title: title,
        body: body,
        tags: tags,
        media: { url: mediaUrl } 
    };

    try {
        const response = await createPost(postData);

        if (response) {
            console.log("Post created successfully:", response);
            window.location.href = "/"
        } else {
            console.error("Failed to create post");
        }
    } catch (error) {
        console.error("Error creating post:", error);
        alert(`There was an error creating the post: ${error.message}`);
    }
}

