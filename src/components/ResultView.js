export default function ResultView(props){
  const id = props.result.id
  const title = props.result.title
  const lead = props.result.lead
  const story = props.result.story
  const rating = props.result.rating
  const source = props.result.source
  const index = props.index
  const position = props.result.__position;
  return(
   
    <div className="searchResult"  key={index} onClick={() => { 
      console.log(JSON.stringify(props))
      props.onResultClicked(id, title, lead, story, position, rating, source)
      }} >
      <h1 className="resultHeading">{title}</h1>
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