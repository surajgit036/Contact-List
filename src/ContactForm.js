import React, { useState } from 'react';
 
const ContactForm = ({ addContact, updateContact, newContact, contact, onClose }) => {
  const [formData, setFormData] = useState(contact || {});
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleSubmit = () => {
    if (newContact) {
      // Add a new contact
      addContact(formData);
    } else {
      // Update the contact
      updateContact(formData);
    }
 
    // Close the form
    onClose();
  };
 
  return (
    <div className='contact-form-container'>
    <div className='contact-form'>
      <div className="input">
      <img width="24" height="24" src="https://img.icons8.com/plumpy/24/user.png" alt="user"/>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      </div>
      <div className="input">
      <img width="24" height="24" src="https://img.icons8.com/plumpy/24/new-post.png" alt="new-post"/>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      </div>
      <div className="input">
      <img width="24" height="24" src="https://img.icons8.com/plumpy/24/iphone-x.png" alt="iphone-x"/>
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      />
      </div>
 
      <button className='form' onClick={handleSubmit}>
        {newContact ? 'Add Contact' : 'Update Contact'}
      </button>
    </div>
    </div>
  );
};
 
export default ContactForm;
 
 
 
 
//