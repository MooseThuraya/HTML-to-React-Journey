import React, { useState } from "react";

function ToDoItem(props){

    return (
    <div onClick = {()=>{
        // making it equal to a function will make it where only if the item is clicked will the delete function to run.
        props.onChecked(props.id)
    }}>
        <li>{props.text}</li>
        {/* Stateless components, read only, we can't modify props */}
    </div>
    )
}

export default ToDoItem;