
const asyncHandler=require("express-async-handler")
const Contact=require("../models/contactModel")

//@desc get all contacts
//@ GET /api/contacts
//@access private
const getContacts= asyncHandler(async (req,res)=>{
   const contacts= await Contact.find({user_id:req.user.id})
    res.status(200).json(contacts)
})
//@desc Create new contact
//@route POST /api/contacts
//@aaccess Private
const createContact= asyncHandler(async (req,res)=>{
    console.log("The request body is ", req.body)
    const {name,email,phone}=req.body;
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("All fields are Mandatory !")
    }
    const contact=await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    res.status(201).json(contact)
})

//@desc get contact 
//@route GET /api/contacts/:id
//@aaccess Private
const getContactById= asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})

//@desc Update contact
//@route PUT /api/contacts/:id
//@aaccess Private
const updateContactById= asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update others contacts")
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatedContact)
})


//@desc Delete contact
//@route DELETE /api/contacts/:id
//@aaccess Private
const deleteContact= asyncHandler(async  (req,res)=>{
    const contact= await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User dont have permission to delete others contacts")
    }
      await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact)
})
module.exports={getContacts,createContact,getContactById,updateContactById,deleteContact}