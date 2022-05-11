import { useState } from "react";

export default function MySearchBox(props) {
  var initText = props.text ? props.text : ""
  const [name, setName] = useState(initText);

  const handleSubmit = (event) => {
    event.preventDefault();
    if(name !== ""){
      props.refine(name);
      global.currentQuery.endTime = Date.now();
      global.logData.searchQueries.push(JSON.parse(JSON.stringify(global.currentQuery)));
      global.currentQuery.clickedResults = []
      global.currentQuery.startTime = Date.now();
      global.currentQuery.text = name;
    } else{
      setName(props.currentRefinement)
    }
   
  }

  return (
    <div className="search-container">
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