
$(document).ready(function () {
    let startStop = document.getElementById("startStop");
    let inp = $("#startStop")[0];
    let showTracesBtn = $("#showTraces");
    
    chrome.storage.sync.get(['checked_status'], function(result) {
        inp.checked = result.checked_status;
        showTracesBtn.prop('disabled',result.checked_status);
      });




    $("#startStop").click(function (e) {
        console.log("checked ", e.target.checked);
        chrome.storage.sync.set({"checked_status": e.target.checked}, function() {
            console.log('checkbox ' + e.target.checked);
            showTracesBtn.prop('disabled',e.target.checked)
          });
        
    });


    $("#showTraces").click(function (e) {
        console.log("button clicked");
        let createProperties = {url:"showTraces.html"};
        chrome.tabs.create(createProperties, function (tab){
            console.log("tab created and opener is ",tab);
            
        });
    })
});



























/* ------------------------------- OLD CODE ------------------------------- */

// let changeColor = document.getElementById('changeColor');
// let newTab = document.getElementById("newTab");


// chrome.storage.sync.get('color', function (data) {
//     changeColor.style.backgroundColor = data.color;
//     changeColor.setAttribute('value', data.color);
// })


// changeColor.onclick = function (ev) {
//     let color = ev.target.value;
//     chrome.tabs.query({
//         active: true,
//         currentWindow: true
//     }, function (tabs) {
//         chrome.tabs.executeScript(tabs[0].id, {
//             code: 'document.body.style.backgroundColor= "' + color + '";'
//         });
//     });


// }


// newTab.onclick = function(element){
//     // chrome.tabs.create({url:"https://www.google.com",active:false});
//     debugger;
//     chrome.runtime.sendMessage({
//         text: "Hi",
//         time: new Date()
//     }, function (response) {
//         console.log('response is = ', response);
//         debugger;
//     });
//     chrome.runtime.sendMessage({
//         text:"runContentScript"
//     },function(response){
//         console.log('response is = =',response);
//         chrome.tabs.executeScript({
//             file: 'contentScript.js'
//         })
//     });
// }