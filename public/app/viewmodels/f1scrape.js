define(['plugins/http', 'durandal/app', 'knockout', 'plugins/router', 'bootstrap','datatables'], function (http, app, ko, router, bs) {

    return {
        router: router,
        activate: function() {
            

            var sURL = '';


            
        
        },
        scrapeData: function(item, e){
            
            var sUrl = 'http://www.c0rdii.com/f1/api/scrape/' + e.currentTarget.id;
            $('#loading').show();

            $.ajax({
                type: 'GET',
                beforeSend: setHeader,
                dataType: 'json',
                url: sUrl,
                success: function(msg) {
                    console.log(msg);
                    $('#loading').hide();
                    $('#teamsTable').show();
                },
                error: function(msg){
                    console.log(msg);
                    $('#loading').hide();
                    $('#teamsTable').show();
                }
            });

            function setHeader(xhr) {
                xhr.setRequestHeader('Authorization', $('#token').val());
            }
        }
    }
});