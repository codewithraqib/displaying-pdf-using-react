const axios = require('axios');

export function apiCall(args){

    const promise = new Promise((resolve, reject) => {
        const doRequest = axios.get(args.url);
    
        doRequest.then(
            res => {
                if(args.callback){
                    args.callback(res)
                }
            },
            err => {
                if(args.callback){
                    args.callback(err)
                }
            },
        );

    });

    return promise;

}