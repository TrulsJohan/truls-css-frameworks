import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from "../../ui/global/logout";
import {readPosts} from "../../api/post/read.js";

authGuard();
setLogoutListener();

