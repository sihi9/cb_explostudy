import { useState } from "react";
import TaskExplanation from "./TaskExplanation";


export default function SearchInitPage(props){

  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if(name !== ""){
      props.onSearch(name);
      global.currentQuery.clickedResults = []
      global.currentQuery.startTime = Date.now();
      global.currentQuery.text = name;
    } 
   
  }

  return (
    <div className="search-container">
      <TaskExplanation onContinueClicked={() => alert("Bitte verwenden Sie zuerst die Suchmaschine, um sich eine Meinung zu bilden")}/>       
      <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        <button type="submit"><i className="fa fa-search"></i></button>
      </form>
    </div>
  
  )
}