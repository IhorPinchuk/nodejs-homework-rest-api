import express from "express";
import ctrl from "../../controllers/contacts.js";
import {
  validateBody,
  isValidId,
  postRequestBodyIsEmpty,
  patchRequestBodyIsEmpty,
} from "../../middlewares/index.js";
import schema from "../../models/contact.js";

const { addSchema, updateFavoriteSchema } = schema;

const router = express.Router();

const {
  getListContacts,
  getContactId,
  add,
  deleteById,
  updateById,
  updateStatusContact,
} = ctrl;

router.get("/", getListContacts);

router.get("/:id", isValidId, getContactId);

router.post("/", postRequestBodyIsEmpty, validateBody(addSchema), add);

router.delete("/:id", isValidId, deleteById);

router.put(
  "/:id",
  postRequestBodyIsEmpty,
  isValidId,
  validateBody(addSchema),
  updateById
);

router.patch(
  "/:id/favorite",
  patchRequestBodyIsEmpty,
  isValidId,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

export default router;
