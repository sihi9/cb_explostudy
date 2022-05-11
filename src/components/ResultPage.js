export default function ResultPage(props) {
  
  return(
    <div className="result-page" onClick={() =>{ 
      props.onBackClicked()}}>

      <h1>{props.title}</h1>
      <p>
        <strong>{props.lead}</strong>
      </p>
      <div dangerouslySetInnerHTML={{__html: props.story}}></div>

    </div>
  )
}