// ==UserScript==
// @name         WxCC_Script_callback_v4_change
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  helper script to update callbackv4 CADVariablesToInclude value
// @author       Aleksey Yankovskyy (ayankovs@cisco.com)
// @match        https://portal.wxcc-eu1.cisco.com/cdsui/rs/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var applyChangeButtonDiv = document.createElement("div");
    applyChangeButtonDiv.setAttribute("id","copy-btn-div");
    applyChangeButtonDiv.setAttribute("class","col-sm-2");
    applyChangeButtonDiv.setAttribute("onclick","event.stopPropagation()");
    var applyButton = document.createElement("Button");
    applyButton.innerHTML = "Apply Change";
    
    applyChangeButtonDiv.appendChild(applyButton);
    
    const callControlDiv = document.getElementById('callControlPanel').firstElementChild;
    callControlDiv.appendChild(applyChangeButtonDiv);

       
    
    function populateCadValue (){
            var scriptParams = document.getElementById("controlScriptParamsDiv").getElementsByClassName("form-group");

            for (var i = 0; i<scriptParams.length; i++){
                console.log(`Key${i} ${scriptParams[i].childNodes[0].innerHTML}`);
                if (scriptParamsObj[scriptParams[i].childNodes[0].innerHTML]){
                    console.log(`----AY----: found existing param ${scriptParams[i].childNodes[0].innerHTML} in buffer`);
                    var paramValue = scriptParamsObj[scriptParams[i].childNodes[0].innerHTML];
                    //console.log(`----AY----:  inner HTML ${scriptParams[i].childNodes[1].innerHTML}`);

                    if (scriptParams[i].childNodes[1].childNodes[1].type == "select-one"){
                        //console.log(`----AY----:  I AM SELECT FIELD !`)
                        replaceSelectValue(i, paramValue);
                    }else{
                        replaceTextValue(i,paramValue);
                    }

                }
            }

        
    }
    function replaceTextValue(i,paramValue){

        console.log("---AY---: i am replaceTextValue function");
        var scriptParams = document.getElementById("controlScriptParamsDiv").getElementsByClassName("form-group");

        var newTextFieldOuterHtml = `<div class="col-sm-4"><input id="controlScriptParam_${scriptParams.length-1}" type="text" value="abcdefg" class="form-control"></div>`;
                
        scriptParams[scriptParams.length-1].childNodes[1].outerHTML = newTextFieldOuterHtml;
    }

 

    applyButton.addEventListener('click', (e)=>{
        populateCadValue();
        e.stopPropagation();
        e.preventDefault();
    });

 
})();
