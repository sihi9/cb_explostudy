import './App.css';
import './config'
import "./logData"
import React, {useState} from "react";
import SearchPage from './components/SearchPage';
import Questionnaire from "./components/Questionnaire"
import Introduction from './components/IntroductionPage';
import SearchInitPage from './components/SearchInitPage';
import Outro from './components/OutroPage';
import ResultPage from './components/ResultPage';


export default function App() {
  const [content, setContent] = useState("introduction");
  const [initQuery, setInitQuery] = useState("");

  return (
    <div>
      {content === "introduction" && 
      <Introduction onSubmit={() => {setContent("preQ")}}/>}
      

      {content === "preQ" && 
      <Questionnaire onSubmit={() => {setContent("searchInit")}} demographic={true}/>}

      {content === "searchInit" && 
      <SearchInitPage onSearch={(query) => {
        setContent("search")
        setInitQuery(query)
        }}/>}

      {content === "search" && 
      <SearchPage goToPostQ={() => {setContent("postQ")}} initQuery={initQuery} title="search"/>}

      {content === "postQ" && 
      <Questionnaire onSubmit={() => {
        setContent("outro")
        fetch(`/log`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(global.logData),
          })
        }}
        demographic={false}
      />}

      {content === "outro" &&
      <Outro /> }

    </div>
  );
}
