// ==UserScript==
// @name         WxCC_Script_callback_v4_change
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  helper script to update CADVariablesToInclude value in custom call script callback_options_to_change_callback_number_multi_lang_v4.js
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
    var updateCadValueBtn = document.createElement("Button");
    updateCadValueBtn.innerHTML = "Update CAD Value";
    
    applyChangeButtonDiv.appendChild(updateCadValueBtn);
    
    const callControlDiv = document.getElementById('callControlPanel').firstElementChild;
    callControlDiv.appendChild(applyChangeButtonDiv);


    function updateCadValue(){

        console.log("---AY---: i am updateCadValue function");
        var scriptParams = document.getElementById("controlScriptParamsDiv").getElementsByClassName("form-group");
        var i = scriptParams.length-1

        // predefined value for last call script param. In this case CAD variable value
        var newTextFieldOuterHtml = `<div class="col-sm-4"><input id="controlScriptParam_${i}" type="text" value="CallbackRequested,CustomerName,primarySkill,primaryAgentName" class="form-control"></div>`;
                
        scriptParams[scriptParams.length-1].childNodes[1].outerHTML = newTextFieldOuterHtml;

        clickApplySave();
    }

    function clickApplySave(){
        var applyButton = document.getElementById("applyCallControl");
        applyButton.click()

        var submitButton = document.getElementById("submitBtn");
        setTimeout(submitButton.click(), 1000);

    }
 

    updateCadValueBtn.addEventListener('click', (e)=>{
     updateCadValue();
        e.stopPropagation();
        e.preventDefault();
    });

 
})();
