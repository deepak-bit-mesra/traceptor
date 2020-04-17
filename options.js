const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
let page = document.getElementById("buttonDiv");

$(document).ready(function () {
    $("#resetbtn").click(function (e) {
        chrome.storage.sync.set({
            traceArr: null
        }, function (params) {
            console.log("TRAcE DATA CLEARED");
            window.alert("Trace Data Cleared.")
        })

        // e.preventDefault();

    });
    // $("#setBaseUrl").click(function (e) { 
    //     let url = $("#baseurl").val();
    //     chrome.storage.sync.set([{baseUrl:url}],function(params){
    //         console.log("Base URL is SET. params = ",params);
    //     })
    // });



});