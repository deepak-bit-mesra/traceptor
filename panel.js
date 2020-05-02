console.log("this is console for panel");
// document.getElementById("tabId").innerText = "Tab Id :- " + chrome.devtools.inspectedWindow.tabId;







$(document).ready(function () {

    chrome.storage.sync.get(['traceArr'], function (result) {
        console.log("Data = ", result);
        htmlContent = "";

        $.each(result['traceArr'], function (index, value) {
            console.log("index = ", index);
            console.log(" value = ", value);
            let link = "http://localhost:5601/app/infra#/logs/stream?logFilter=(expression:'" + value['X-B3-TraceId'] + "',kind:kuery)";
            let tr = '<tr>' +
                '<td>'+index+'</td>'+
                '<td><a href="' + link + '" target="_blank">' + value['X-B3-TraceId'] + '</a></td>' +
                '<td>' + value['X-B3-SpanId'] + '</td>' +
                '<td>' + value.status + '</td>' +
                '<td>' + value.url + '</td>' +
                '</tr>';
            htmlContent += tr;

        });
        $("#dataTbody")[0].innerHTML = htmlContent;
    });


    chrome.storage.onChanged.addListener(function (changes, namespace) {
        for (let key in changes) {
            var storageChange = changes[key];
            console.info('Panel JS: Old result["traceArr"] = ', storageChange.oldValue);
            console.log('Panel JS: Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
            if(key=="traceArr"){
                let lastIndex = storageChange.newValue.length-1;
                let value = storageChange.newValue[lastIndex];
                let link = "http://localhost:5601/app/infra#/logs/stream?logFilter=(expression:'" + value['X-B3-TraceId'] + "',kind:kuery)";
                let tr = '<tr>' +
                    '<td>'+lastIndex+'</td>'+
                    '<td><a href="' + link + '" target="_blank">' + value['X-B3-TraceId'] + '</a></td>' +
                    '<td>' + value['X-B3-SpanId'] + '</td>' +
                    '<td>' + value.url + '</td>' +
                    '<td>' + value.status + '</td>' +
                    '</tr>';
                    $("#dataTbody")[0].innerHTML += tr;
            }
            
    
            
            
    
    
            console.info('Panel JS: New result["traceArr"] = ', storageChange.newValue);
    
    
        }
    });



});