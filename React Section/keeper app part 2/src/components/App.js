import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Notes from "../notes";
import Note from "./Note";

function App() {
  return (
    <div>
      <Header />
      {Notes.map( currentNote =>
        <Note 
          key= {currentNote.key}
          title={currentNote.title}
          content={currentNote.content}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
