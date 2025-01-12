import express from "express";
import { isAuthenticated } from "../middleware/auth";
import { handleErrors } from "../middleware/errors";
import { deleteContractByID } from "../controllers/delete.controller";

const router = express.Router();
router.delete("/delete/:id", isAuthenticated, handleErrors(deleteContractByID));

export default router;