var config = {
    env: { curEnv: 'qa'},
    dev:{
         ApiBaseUrl : 'http://10.0.0.104/Kenesto.Web.API/', 
         AuthUrlTemplate: 'http://10.0.0.104/Kenesto.Web.API/Access.svc/Authenticate/json/null?u={0}&p={1}',
         LoginUrlTemplate: 'http://10.0.0.104/Kenesto.Web.API/Access.svc/Login/json/{0}?t={1}'
    },
    qa:{
         ApiBaseUrl : 'http://10.0.0.117/Kenesto.Web.API/', 
         AuthUrlTemplate: 'http://10.0.0.117/Kenesto.Web.API/Access.svc/Authenticate/json/null?u={0}&p={1}',
         LoginUrlTemplate: 'http://10.0.0.117/Kenesto.Web.API/Access.svc/Login/json/{0}?t={1}'
        
    },
      staging:{
         ApiBaseUrl : 'https://stage-app.kenesto.com/kenesto.web.api/', 
         AuthUrlTemplate: 'https://stage-app.kenesto.com/kenesto.web.api/access.svc/Authenticate/json/null?u={0}&p={1}',
         LoginUrlTemplate: 'https://stage-app.kenesto.com/kenesto.web.api/access.svc/Login/json/{0}?t={1}'
        
    },
     production:{
         ApiBaseUrl : 'https://stage-app.kenesto.com/kenesto.web.api/', 
         AuthUrlTemplate: 'https://stage-app.kenesto.com/kenesto.web.api/access.svc/Authenticate/json/null?u={0}&p={1}',
         LoginUrlTemplate: 'https://stage-app.kenesto.com/kenesto.web.api/access.svc/Login/json/{0}?t={1}'
        
    }
   
}

module.exports = config; 