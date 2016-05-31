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
         ApiBaseUrl : 'http://10.0.0.117/Kenesto.Web.API/', 
         AuthUrlTemplate: 'http://10.0.0.117/Kenesto.Web.API/Access.svc/Authenticate/json/null?u={0}&p={1}',
         LoginUrlTemplate: 'http://10.0.0.117/Kenesto.Web.API/Access.svc/Login/json/{0}?t={1}'
        
    },
     production:{
         ApiBaseUrl : 'http://10.0.0.117/Kenesto.Web.API/', 
         AuthUrlTemplate: 'http://10.0.0.117/Kenesto.Web.API/Access.svc/Authenticate/json/null?u={0}&p={1}',
         LoginUrlTemplate: 'http://10.0.0.117/Kenesto.Web.API/Access.svc/Login/json/{0}?t={1}'
        
    }
   
}

module.exports = config; 