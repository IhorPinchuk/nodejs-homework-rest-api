import express from "express";
import ctrl from "../../controllers/contacts.js";
import { validateBody, isValidId } from "../../middlewares/index.js";
import schema from "../../models/contact.js";

const {addSchema} = schema;
console.log(addSchema)

const router = express.Router();

const { getListContacts, 
    getContactId, 
     add, 
    // deleteById,
    //  updateById
     } = ctrl;

router.get("/", getListContacts);

router.get("/:id", isValidId, getContactId);

router.post("/", validateBody(addSchema), add);

// router.delete("/:id", isValidId, deleteById);

// router.put("/:id", isValidId, validateBody(addSchema), updateById);

export default router;
