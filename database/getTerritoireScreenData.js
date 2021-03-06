"use strict";

var database = require('../database/index.js');

var getGraphExpressions = require('../common/graph/getGraphExpressions');

var getTerritoireResourceGraph = require('../server/territoireGraphCache/getTerritoireResourceGraph');
var simplifyExpression = require('../server/simplifyExpression');



module.exports = function getTerritoireScreenData(territoireId){
    console.log('getTerritoireScreenData', territoireId);

    var territoireP = database.Territoires.findById(territoireId);

    //console.time('getTerritoireResourceGraph')
    var abstractPageGraphP = getTerritoireResourceGraph(territoireId)
        .then(function(res){
            res.graph.buildTime = res.buildTime;
            return res.graph;
        });
    //abstractPageGraphP.then(console.timeEnd.bind(console, 'getTerritoireResourceGraph'))

    var expressionByIdP = abstractPageGraphP
        .then(getGraphExpressions)
        .then(function(expressionById){
            Object.keys(expressionById).forEach(function(id){
                expressionById[id] = simplifyExpression(expressionById[id]);
            });
            return expressionById;
        });

    var resourceAnnotationByResourceIdP = abstractPageGraphP
        .then(function(graph){
            return database.complexQueries.getGraphResourceAnnotations(graph, territoireId);
        });

    var edAnnotationByEdIdP = abstractPageGraphP
        .then(function(graph){
            return database.complexQueries.getGraphExpressionDomainAnnotations(graph, territoireId);
        });

    var expressionDomainsByIdP = database.complexQueries.getTerritoireExpressionDomains(territoireId)
        .then(function(expressionDomains){            
            var o = Object.create(null);
            expressionDomains.forEach(function(ed){ o[ed.id] = ed; });
            return o;
        });

    
    // timing of this query will make the values certainly out-of-sync with when 
    var progressIndicatorsP = database.complexQueries.getProgressIndicators(territoireId);

    //console.time('getProgressIndicators');
    //progressIndicatorsP.then(console.timeEnd.bind(console, 'getProgressIndicators'))

    console.time('all data');
    return Promise.all([
        territoireP, abstractPageGraphP, progressIndicatorsP, expressionByIdP, resourceAnnotationByResourceIdP, edAnnotationByEdIdP, expressionDomainsByIdP
    ]).then(function(res){
        console.timeEnd('all data');
        var territoire = res[0];
        
        territoire.graph = res[1];
        territoire.progressIndicators = res[2];
        territoire.expressionById = res[3];
        territoire.resourceAnnotationByResourceId = res[4];
        territoire.expressionDomainAnnotationsByEDId = res[5];
        territoire.expressionDomainsById = res[6];

        return territoire;
    });
};
