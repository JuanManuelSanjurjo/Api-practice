import express from "express"
import { getUser, createUser, getUsers, deleteUser, patchUser } from "../controllers/users.js"

export const router = express.Router()


router.get("/", getUsers)

router.post("/", createUser)

router.get("/:id", getUser)

router.delete("/:id", deleteUser)

router.patch("/:id", patchUser)