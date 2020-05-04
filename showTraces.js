$(document).ready(function () {
    let kibanaDashboard = "http://www.google.co.in"

    chrome.storage.sync.get(['traceArr'], function (result) {
        console.log("Data = ", result);
        htmlContent = "";

        $.each(result['traceArr'], function (index, value) {
            console.log("index = ", index);
            console.log(" value = ", value);
            let link = "http://localhost:5601/app/infra#/logs/stream?logFilter=(expression:'" + value['X-B3-TraceId'] + "',kind:kuery)";
            let tr = '<tr>' +
                '<td><a '+ 'class=_' + value.status  +' href="' + link + '">' + value['X-B3-TraceId'] + '</a></td>' +
                '<td>' + value['X-B3-SpanId'] + '</td>' +
                '<td>' + value.status + '</td>' +
                '<td>' + value.url + '</td>' +
                '</tr>';
            htmlContent += tr;

        });
        $("#dataTbody")[0].innerHTML = htmlContent;
    });
});