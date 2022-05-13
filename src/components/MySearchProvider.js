import React from 'react';
import { 
  InstantSearch, 
  connectHits,
  Pagination,
  connectSearchBox
} from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import ResultView from './ResultView';
import MySearchBox from './MySearchBox';

import data from "../data.json"
import "../logData"

import "../config"
import config from '../config';

const meiliSearchClient = instantMeiliSearch(
  "localhost/search"
  config.apiKey
);


const demoSearchClient = instantMeiliSearch(
  'https://integration-demos.meilisearch.com',
  'q7QHwGiX841a509c8b05ef29e55f2d94c02c00635f729ccf097a734cbdf7961530f47c47'
) // indexName="steam-video-games"


export default function MySearchProvider(props){
  return (
    <div className="ais-InstantSearch">
      <InstantSearch 
        indexName="cb_articles" 
        searchClient={meiliSearchClient} 
        //searchState={props.searchState}
        //onSearchStateChange={props.onSearchStateChange}
        >

        <CustomSearchBox text={props.searchState.query}/>
        <CustomHits onResultClicked={props.onResultClicked}/>
        <div id="pagination" className="text-center">
          <Pagination />
        </div>
        
      </InstantSearch>
    </div>
  );
}


const CustomSearchBox = connectSearchBox(MySearchBox)

const Hits = (props) => (
  <div>
    {props.hits.map((hit, index) => (
      <ResultView result={hit} onResultClicked={props.onResultClicked} index={index}/>
    ))}
  </div>
);
const CustomHits = connectHits(Hits);

const AllData = (props) => (
  <div>
    {data.map(article =>  (
        <ResultView result={article} onResultClicked={props.onResultClicked}/>
    ))}
  </div>
)
/*
export default function MySearchProvider(props) {

  return (
    <SearchProvider config={configOptions} >

        <div className="App">
          <Layout
            header={<SearchBox />}
            bodyContent={
              <div>
                <PagingInfo/>
                <WithSearch
                  mapContextToProps={({ results }) => ({
                    results
                  })}
                >
                  {({ results }) => {
                    return (
                      <div>
                        {results.map(r => (
                        <ResultView key={r.id.raw} result={r} onResultClicked={props.onResultClicked}/>
                        ))}
                      </div>
                    );
                  }}
                </WithSearch>
                <Paging/>
              </div>
            }
          />
        </div>
        
    </SearchProvider>
  )
}*/
