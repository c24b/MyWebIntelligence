"use strict";

function sendReq(method, url, data){
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();

        xhr.open(method, url);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.responseType = 'json';

        xhr.addEventListener('load', function(){
            if(xhr.status < 400)
                resolve(xhr.response);
            else{
                reject(new Error('HTTP error ' + xhr.status + ' ' + xhr.responseText));
            }

        });

        xhr.addEventListener('error', reject);

        xhr.send(JSON.stringify(data));
    });
}

module.exports = {
    createTerritoire: function(data){
        return sendReq('POST', '/territoire', data);
    },
    updateTerritoire: function(territoireDelta){
        var id = territoireDelta.id;
        return sendReq('POST', '/territoire/'+id, territoireDelta);
    },
    deleteTerritoire: function(territoire){
        return sendReq('DELETE', '/territoire/'+territoire.id);
    },
    createQueryInTerritoire: function(queryData, territoire){
        return sendReq('POST', '/territoire/'+territoire.id+'/query', queryData);
    },
    updateQuery: function(queryDelta){
        var id = queryDelta.id;
        return sendReq('POST', '/query/'+queryDelta.id, queryDelta);
    },
    deleteQuery: function(query){
        return sendReq('DELETE', '/query/'+query.id);
    }
};