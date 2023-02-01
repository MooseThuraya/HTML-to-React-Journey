import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {

  const [notes, setNotes]=useState([]);//we will add an array, but it needs to be using state due that it gonna be changed.

  function addNote(newNote){
    setNotes(prevNotes=>{
     return [...prevNotes, newNote];
    })
  }

  function deleteNote(){
    console.log("delete triggered!");
  }

  return (
    <div>
      <Header />
      <CreateArea 
        onAdd={addNote}
      />
      {notes.map((noteItem)=> {
        return <Note
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
        />;
      })}
      <Footer />
    </div>
  );
}

export default App;
