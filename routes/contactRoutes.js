const express=require("express");
const { getContacts, getContactById, createContact, updateContactById, deleteContact } = require("../controllers/contactController");
const router=express.Router(); 
router.route("/").get(getContacts).post(createContact)
// router.route("/").post(createContact)
router.route("/:id").get(getContactById)
router.route("/:id").put(updateContactById)
router.route("/:id").delete(deleteContact)
module.exports=router