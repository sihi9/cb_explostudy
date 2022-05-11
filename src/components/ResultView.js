export default function ResultView(props){
  const id = props.result.id
  const title = props.result.title
  const lead = props.result.lead
  const story = props.result.story
  const index = props.index
  const position = props.result.__position;
  return(
   
    <div className="searchResult"  key={id} onClick={() => { props.onResultClicked(title, lead, story, position)}} >
      <h2 className="resultHeading">{title}</h2>
      <p className="resultLead">{lead}</p>
    </div>
  /*
    <div>
      <div className="hit-name">
        <Highlight attribute="name" hit={props.hit} />
      </div>
      <div className="hit-description">
        <Snippet attribute="title" hit={props.hit} />
      </div>
    </div>
   */
    
  )
}