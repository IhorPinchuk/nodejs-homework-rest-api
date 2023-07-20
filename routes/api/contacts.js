import express from "express";
import ctrl from "../../controllers/contacts.js";
import { validateBody } from "../../middlewares/index.js";
import addSchema from "../../schemas/contacts.js";

const router = express.Router();

const { getListContacts, getContactId, add, deleteById, updateById } = ctrl;

router.get("/", getListContacts);

router.get("/:id", getContactId);

router.post("/", validateBody(addSchema), add);

router.delete("/:id", deleteById);

router.put("/:id", validateBody(addSchema), updateById);

export default router;
