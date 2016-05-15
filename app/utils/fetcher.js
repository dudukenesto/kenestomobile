
//import config from './app.config';


export function get(url) {

  //  return fetch(url)
    //.then((response) => response.json());
}




//  class Fetcher  {
//     get(url) {
//         // return fetch(url)
//         // .then((response) => response.json());
//         alert('fsdfsd')
//     }
    
//     Login(username: string, password: string){
        
    
        var {AuthUrlTemplate, LoginUrlTemplate} = config;
        var authUrl = AuthUrlTemplate.replace('{0}', username).replace('{1}', password); 
        fetch(authUrl)
        .then((response) => response.json())
        .catch((error) 
        // handle the error
        )
        .then( (responseData) => {
            alert(responseData);
        })
     
//     }

// }


// module.exports = Fetcher;


//    fetch(this._urlForQueryAndPage(query, 1))
//       .then((response) => response.json())
//       .catch((error) => {
//         LOADING[query] = false;
//         resultsCache.dataForQuery[query] = undefined;

//         this.setState({
//           dataSource: this.getDataSource([]),
//           isLoading: false,
//         });
//       })
//       .then((responseData) => {
//         LOADING[query] = false;
//         resultsCache.totalForQuery[query] = responseData.total;
//         resultsCache.dataForQuery[query] = responseData.documents;
//         resultsCache.nextPageNumberForQuery[query] = 2;

//         if (this.state.filter !== query) {
//           // do not update state if the query is stale
//           return;
//         }

//         this.setState({
//           isLoading: false,
//           dataSource: this.getDataSource(responseData.documents),
//         });
//       })
//       .done();