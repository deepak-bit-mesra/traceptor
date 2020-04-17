$(document).ready(function () {
    let kibanaDashboard = "http://www.google.co.in"

    chrome.storage.sync.get(['traceArr'], function (result) {
        console.log("Data = ", result);
        htmlContent = "";

        $.each(result['traceArr'], function (index, value) {
            console.log("index = ", index);
            console.log(" value = ", value);
            let tr = '<tr>' +
                '<td><a href="'+kibanaDashboard+'">' + value['X-B3-TraceId'] + '</a></td>' +
                '<td>' + value['X-B3-SpanId'] + '</td>' +
                '<td>' + value.url + '</td>' +
                '</tr>';
            htmlContent += tr;

        });
        $("#dataTbody")[0].innerHTML = htmlContent;
    });
});