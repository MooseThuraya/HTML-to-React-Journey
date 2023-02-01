import React from "react";
import Card from "./Card";
import contacts from "../contacts";

function createCard(contact){
  return <Card 
    key={contact.id}
    // Key must be unique across all components
    //CANNOT BE ACCESSED BY US
   //WE NEED TO CREATE AN ALTERNATIVE

    id={contact.id}
    name={contact.name}
    img={contact.imgURL}
    tel={contact.phone}
    email={contact.email}
  />
  // When you loop through items of a list React needs to an id to differentiate each card/custom-property in order to efficiently display the components in virtual DOM
}

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>

        {contacts.map(createCard)}
        {/* For every index/item of the array of contacts, the map calls the createCard method and applies/assigns*/}

      {/* <Card
        name={contacts[0].name}
        img={contacts[0].imgURL}
        tel={contacts[0].phone}
        email={contacts[0].email}
      />
      <Card
        name={contacts[1].name}
        img={contacts[1].imgURL}
        tel={contacts[1].phone}
        email={contacts[1].email}
      />
      <Card
        name={contacts[2].name}
        img={contacts[2].imgURL}
        tel={contacts[2].phone}
        email={contacts[2].email}
      /> */}
    </div>
  );
}

export default App;
