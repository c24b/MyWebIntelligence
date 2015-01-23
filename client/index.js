"use strict";

var React = require('react');

var serverAPI = require('./serverAPI/index');

var LoginScreen = React.createFactory(require('./components/LoginScreen'));
var TerritoiresScreen = React.createFactory(require('./components/TerritoiresScreen'));
var OraclesScreen = React.createFactory(require('./components/OraclesScreen'));

if(typeof HTMLElement.prototype.remove !== 'function')
    throw 'Add HTMLElement.prototype.remove polyfill';

if(!Object.assign){
    throw 'add Object.assign polyfill';
}

if(!Array.prototype.findIndex){
    throw 'add Array.prototype.findIndex polyfill';
}

/*
    "all" data. Reference data/state to be used in UI components.
*/
var data = {};

function moveToOraclesScreen(){
    console.log('moveToOraclesScreen');
    history.pushState('', undefined, '/oracles');
    React.render(OraclesScreen({
        oracles: data.oracles
    }), document.body);
}


//location.pathname

document.addEventListener('DOMContentLoaded', function(){
    var initDataElement = document.querySelector('script#init-data');
    
    if(initDataElement && initDataElement.textContent.length >= 2){
        data = JSON.parse(initDataElement.textContent);
        initDataElement.remove();
    }
    
    switch(location.pathname){
        case '/':
            var screenData = Object.assign({}, data);
            
            React.render(LoginScreen(screenData), document.body);
            break;
        case '/territoires': 
            var screenData = Object.assign({
                serverAPI : serverAPI,
                moveToOracleScreen: moveToOraclesScreen
            }, data);
            console.log('/territoires screenData', screenData);
            
            React.render(TerritoiresScreen(screenData), document.body);
            break;
        case '/oracles': 
            
            break;
        default:
            console.error('Unknown pathname', location.pathname);
    }
    
    
    
});