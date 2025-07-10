import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { registerUser, loginUser, logoutUser, deleteAccount, checkEmailExists, updateAccountDetails, updateAvatar, deleteAvatar, changeCurrentPassword, getCurrentUser, refreshAccessToken} from "../controllers/user.controller.js";

let router=Router()

router.route("/register").post(upload.none(), registerUser)

router.route('/check-email').post(checkEmailExists)

router.route("/login").post(loginUser)

router.route("/logout").post(logoutUser, verifyJWT)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/current-user").get(verifyJWT, getCurrentUser)

router.route("/change-password").post(verifyJWT, changeCurrentPassword)

router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/update-avatar").patch(verifyJWT, upload.single("avatar"), updateAvatar)

router.route("/delete-avatar").delete(verifyJWT, deleteAvatar)

router.route("/delete-account/:userId").delete(verifyJWT, deleteAccount)

export default router
