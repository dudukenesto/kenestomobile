import moment from 'moment';
import config from '../utils/app.config';

export function constructRetrieveDocumentsUrl(env, sessionToken, fId) {
   
    //const {curEnv} = config.env;
    const encodeSessionToken  = encodeURIComponent(sessionToken)
     var {ApiBaseUrl} = config.dev 
     
     switch (env) {
           case 'devDudu':
                    ApiBaseUrl = config.devDudu.ApiBaseUrl;  
                    break;
                case 'devAdam':
                    ApiBaseUrl = config.devAdam.ApiBaseUrl; 
                    break;
                case 'devKonstya':
                    ApiBaseUrl = config.devKonstya.ApiBaseUrl; 
                     break;
                case 'qa':
                    ApiBaseUrl = config.qa.ApiBaseUrl; 
                    break;
                case 'staging':
                    ApiBaseUrl = config.staging.ApiBaseUrl; 
                        break;
                case 'production':
                    ApiBaseUrl = config.production.ApiBaseUrl; 
             default:
                 break;
         }
      if(fId == undefined)
      {
        return  `${ApiBaseUrl}/KDocuments.svc/RetrieveDocuments?t=${encodeSessionToken}`
      }
      else
      {
        return  `${ApiBaseUrl}/KDocuments.svc/RetrieveDocuments?t=${encodeSessionToken}&fid=${fId}`
      }   
    
   
}

