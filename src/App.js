import "./style.css";
import React, { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
 
const App = () => {
  const [users, setUsers] = useState([]);
  const [onAddContact, setOnAddContact] = useState(false);
  const [onUpdateContact, setOnUpdateContact] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
 
  useEffect(() => {
    // Fetch initial user data only once when the component mounts
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []); // Empty dependency array means it runs only once
 
  const addContact = (newContactData) => {
    // Add a new contact
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(newContactData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Update the state with the new contact
        addLocalContact(data);
        console.log(data);
      });
  };
 
  const addLocalContact = (contact) => {
    contact.id = users.find((contact) => contact.id === users.length + 1)
      ? users.length + 2
      : users.length + 1;
    setUsers((prevUsers) => [contact, ...prevUsers]);
  };
 
  const updateContact = (updatedContactData) => {
    // Update the contact
    fetch(
      `https://jsonplaceholder.typicode.com/posts/${updatedContactData.id}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedContactData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          // If the update is successful, update the user in the state
          return response.json();
        } else {
          // Handle error if needed
          console.error("Failed to update user");
        }
      })
      .then((json) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedContactData.id ? json : user
          )
        );
      })
      .catch((error) => {
        // Handle network or fetch error
        console.error(error);
      });
  };
 
  const deleteContact = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // If deletion is successful, remove the user from the state
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } else {
          // Handle error if needed
          console.error("Failed to delete user");
        }
      })
      .catch((error) => {
        // Handle network or fetch error
        console.error(error);
      });
  };
 
  return (
    <div className="container">
      {onAddContact && (
        <ContactForm
          addContact={addContact}
          newContact={true}
          onClose={() => setOnAddContact(false)}
        />
      )}
      {onUpdateContact && selectedContact && (
        <ContactForm
          updateContact={updateContact}
          newContact={false}
          contact={selectedContact}
          onClose={() => setOnUpdateContact(false)}
        />
      )}
      {users.map((user) => (
        <div className="list" key={user.id}>
          <div className="user">
            <img
              width="36"
              height="36"
              src="https://img.icons8.com/plumpy/24/user-male-circle.png"
              alt="user-male-circle"
            />
            <div className="profile">
              <h4>{user.name}</h4>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="phone">
          <img width="16" height="16" src="https://img.icons8.com/plumpy/24/phone.png" alt="phone" style={{margin:"2px"}}/>
          {user.phone}  
          <span> 
          </span>
 
          <button
            className="btn"
            onClick={() => setOnUpdateContact(prev=>!prev, setSelectedContact(user))}
          >
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/plumpy/24/edit--v1.png"
              alt="edit--v1"
            />
          </button>
          </div>
          <button className="btn" onClick={() => deleteContact(user.id)}>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/plumpy/24/delete-forever.png"
              alt="delete-forever"
            />
          </button>
        </div>
      ))}
      <button
        className="add-button"
        onClick={() => setOnAddContact((prev) => !prev)}
      >
        +
      </button>
    </div>
  );
};
 
export default App;