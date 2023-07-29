import contactModel from "../models/contact.js";
import { HttpError, ctrlWrapper } from "../helpers/index.js";

const { Contact } = contactModel;

const getListContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const totalContacts = (await Contact.find({ owner })).length;
  let contacts = null;

  if (favorite) {
    contacts = await Contact.find(
      { owner, favorite },
      "-createdAt -updatedAt",
      { skip, limit }
    );
  } else {
    contacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    });
  }
  res.json({
    contacts,
    page,
    perPage: limit,
    totalContacts,
  });
};

const getContactId = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Contact deleted",
  });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

export default {
  getListContacts: ctrlWrapper(getListContacts),
  getContactId: ctrlWrapper(getContactId),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
