import MySearchProvider from "./MySearchProvider";
import ResultPage from "./ResultPage";
import React, {useState} from "react";
import TaskExplanation from "./TaskExplanation";

import "../logData"


export default function SearchPage(props) {
  const [content, setContent] = useState("search");

  const [title, setTitle] = useState("testTitle");
  const [lead, setLead] = useState("testLead");
  const [story, setStory] = useState("testStory");
  const [searchState, setSearchState] = useState({"query":props.initQuery,"page":1});

  const goToPostQ = props.goToPostQ;

  const returnToSearch = () => {
    setContent("search")
    global.currentResult.endTime = Date.now();
    global.currentQuery.clickedResults.push(JSON.parse(JSON.stringify(global.currentResult)));
  }
  const onResultClicked = (id, title, lead, story, index, rating, source) => {
    setTitle(title)
    setLead(lead)
    setStory(story)
    setContent("result")
    window.scrollTo(0, 0)
    global.currentResult.startTime = Date.now();
    global.currentResult.id = id // unique identifier
    global.currentResult.title = title; // todo: exchange this with evaluation
    global.currentResult.index = index // index on the page
    global.currentResult.rating = rating // rating of the article (-1, 0, 1)
    global.currentResult.source = source // web link to the article

  }

  const searchFinished = () => {
    global.currentQuery.endTime = Date.now();
    global.logData.searchQueries.push(JSON.parse(JSON.stringify(global.currentQuery)));
    global.logData.endTime = Date.now()
    goToPostQ()
  }

  return(
    <div>
      {content === "search" &&
      <div className="searchPage">
        <TaskExplanation onContinueClicked={searchFinished}/>          
        <MySearchProvider onResultClicked={onResultClicked} searchState={searchState} onSearchStateChange={setSearchState}/>
        <button className="sv-btn sv-btn--navigation sv-footer__next-btn searchDoneButton" onClick={searchFinished}> 
          Meinungsbildung abschließen❯
        </button>
      </div>
     }

      {content === "result" &&
      <ResultPage 
        onBackClicked={returnToSearch} 
        title={title}
        lead={lead}
        story={story}
      />}
     
    </div>
  )
}
