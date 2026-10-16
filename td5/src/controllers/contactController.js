import Contact from '../models/contactModel.js';

// Get all contacts
export async function getAllContacts() {
    try {
        let total = await Contact.countDocuments({});
        const contacts = await Contact.find();
        return {
            success: true,
            data: contacts,
            total: total.toString(),
        }
    } catch (err) {
        return { success: false, message: `Contacts not found: ${err.message}` };
    }
}

// Get contact by Id
export async function getContactById(id) {
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return {
        success: false,
        message: `Contact ${id} not found`
      };
    }
    return {
      success: true,
      data: contact,
    };
  } catch (err) {
    return { success: false, message: `Contact ${id} not found: ${err.message}` };
  }
}

// Add a new contact
export async function addContact(body) {
  try {
    const newContact = await Contact.create({ name: body.name, age: body.age });
    return {
      success: true,
      data: newContact,
    };
  } catch (err) {
    return {
      success: false,
      message: `Failed to add contact: ${err.message}`,
    };
  }
}
  
// Update an existing contact
export async function updateContact(id, body) {
   try {
    const updatedContact = await Contact.findByIdAndUpdate(
        id,
        { name: body.name, age: body.age },
        { new: true, runValidators: true }
    );
    if (!updatedContact) {
      return {
        success: false,
        message: `Could not find contact ${id}`
      };
    }
    return {
      success: true,
      data: updatedContact,
    };
   } catch (err) {
     return {
       success: false,
       message: `Failed to update contact ${id}: ${err.message}`
     };
   }
}
    
// Remove an existing contact
export async function removeContact(id) {
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return {
        success: false,
        message: `Could not find contact ${id}`
      };
    }
    return {
      success: true,
      data: deletedContact,
    };
  } catch (err) {
    return {
      success: false,
      message: `Failed to delete contact ${id}: ${err.message}`
    };
  }
}
