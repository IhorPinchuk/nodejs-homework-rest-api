import express from 'express'
import contacts from '../../models/contacts.js'

const {listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact} = contacts
  
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts()
    res.json(result)
    
  } catch (error) {
    res.status(500).json({message: "Server error"})
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await getContactById(id);
    if(!result) {
      return res.status(404).json({
        message: "Not found"
      })
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({message: "Server error"})
  }
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:id', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:id', async (req, res, next) => {
  res.json({ message: 'template message' })
})

export default router;
