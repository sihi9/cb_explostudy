export default function TaskExplanationprops(props){
  const text = 
  `Bitte nutzen Sie die Suchmaschine, um folgende Frage möglichst gewissenhaft beantworten zu können: <br>
  "Sollte Cannabis in Österreich legalisiert werden?" <br>
  <br>
  `
  return (

    <div className="top-row">
      <div id="text">
        <div className="sv-page sv-body__page" dangerouslySetInnerHTML={{__html: text}}>
        </div>
      </div>

      <div id="button" onClick={props.onContinueClicked}>
        <div className="button">
          Meinungsbildung beenden {'>'}
        </div>
       
      </div>
    </div>
    
  )
}