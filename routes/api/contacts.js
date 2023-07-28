import express from "express";
import ctrl from "../../controllers/contacts.js";
import {
  validateBody,
  isValidId,
  postRequestBodyIsEmpty,
  patchRequestBodyIsEmpty,
  authenticate,
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

router.get("/", authenticate, getListContacts);

router.get("/:id", authenticate, isValidId, getContactId);

router.post("/", authenticate, postRequestBodyIsEmpty, validateBody(addSchema), add);

router.delete("/:id", authenticate, isValidId, deleteById);

router.put(
  "/:id", authenticate,
  postRequestBodyIsEmpty,
  isValidId,
  validateBody(addSchema),
  updateById
);

router.patch(
  "/:id/favorite", authenticate,
  patchRequestBodyIsEmpty,
  isValidId,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

export default router;
