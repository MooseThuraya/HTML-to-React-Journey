import React, {useState} from "react";

function App() {

  const [text, setText] = useState("");
  const [name, setName] = useState("");
 
  function handleChange(event){

    // the event is the event that triggered the onChange
    setText(event.target.value);

  }

  function handleChangeOnClick(event) {

    // the event is the event that triggered the onChange
    setName(text);
    event.preventDefault(); 
    // this prevents the default behavior of <form></form>

  }

  return (
    <div className="container">
      <form onSubmit={handleChangeOnClick}>
        {/* onSubmit={handleChangeOnClick} NOT NEEDED EXPLICITLY */}
      <h1>Hello {name}</h1>
      <input 
      onChange ={handleChange}
      type="text"
      placeholder="What's your name?"
        value={text} />
      <button type="submit" onClick={handleChangeOnClick}>Submit</button>
     </form>
    </div>
  );
}

export default App;
