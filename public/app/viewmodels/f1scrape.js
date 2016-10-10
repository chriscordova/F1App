define(['plugins/http', 'durandal/app', 'knockout', 'plugins/router', 'bootstrap','datatables'], function (http, app, ko, router, bs) {

    return {
        router: router,
        activate: function() {
            
        },
        scrapeData: function(item, e){
            
            var scrapeItem = e.currentTarget.id;
            var sUrl = 'http://www.c0rdii.com/f1/api/scrape/' + scrapeItem;

            $('#success-' + scrapeItem).hide();
            $('#fail-' + scrapeItem).hide();
            $('#success-' + scrapeItem).hide();
            $('#error-' + scrapeItem).html('');
            $('#loading-' + scrapeItem).show();

            $.ajax({
                type: 'GET',
                beforeSend: setHeaders,
                dataType: 'json',
                url: sUrl,
                success: function(msg) {
                    $('#loading-' + scrapeItem).hide();
                    $('#success-' + scrapeItem).show();
                },
                error: function(msg){
                    console.log(msg);
                    $('#loading-' + scrapeItem).hide();
                    $('#fail-' + scrapeItem).show();
                    $('#error-' + scrapeItem).html(msg.statusText);
                }
            });

            function setHeaders(xhr) {
                xhr.setRequestHeader('Authorization', $('#token').val());
            }
        }
    }
});