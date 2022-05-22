export default function ResultPage(props) {
  
  return(
    <div>

      <div className="top-row">

        <div id="button" onClick={props.onBackClicked}>
          <div className="button">
            {'<'} Zurück 
          </div>
        </div>

        <div id="text">
          <div className="sv-page sv-body__page">
          </div>
        </div>

      </div>
          
      <div className="center-field result-page" >
        <div id="result-page-content">
          <h1>{props.title}</h1>
          <p>
            <strong>{props.lead}</strong>
          </p>
          <div dangerouslySetInnerHTML={{__html: props.story}}></div>
        </div>
        
      </div>
     
    </div>
  )
}