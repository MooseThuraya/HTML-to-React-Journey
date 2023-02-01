import React, { useState } from "react";

function CreateArea(props) {

  const [noteBox, setNoteBox] = useState({

    title: "",
    content: ""
  }
  );

  function handleChange(event){
    const {name, value} = event.target;
    setNoteBox(prevValue=>{
       return {
          ...prevValue,
          [name]: value
        }
      
      }
    )}

    function submitNote(event){
      props.onAdd(noteBox);
      event.preventDefault();
    }


  return (
    <div>
      <form>
        <input onChange = {handleChange} name="title" placeholder="Title" value={noteBox.title}/>
        <textarea onChange={handleChange} name="content" placeholder="Take a note..." rows="3" value={noteBox.content}/>
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
