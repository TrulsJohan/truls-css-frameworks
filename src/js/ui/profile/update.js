import { updateProfile } from "../../api/profile/update";

export async function onUpdateProfile(event) {
    event.preventDefault(); 
    const user = localStorage.getItem(`user`);
    const data = await updateProfile(user);
    if(!data) {
        alert("Could not fetch user data")
        return;
    }
    console.log(data);
}
