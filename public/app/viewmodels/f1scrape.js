define(['plugins/http', 'durandal/app', 'knockout', 'plugins/router', 'bootstrap','datatables'], function (http, app, ko, router, bs) {

    return {
        router: router,
        compositionComplete: function(){
            var aScrapes = ['drivers','standings','seasons','results'];
            var retrievedData = localStorage.getItem('LastUpdated');
            if (retrievedData == null){
                var updateObject = {
                    'data':[]
                };
                
                var aPromises = [];
                $(aScrapes).each(function(i,v){

                    var sUrl = 'http://localhost:62129/api/scrapelog/get/' + v;

                    var o = $.ajax({
                        type: 'GET',
                        dataType: 'json',
                        url: sUrl,
                        success: function(data) {
                            $('#updated-' + v).html('Last updated: ' + data.Data);
                            updateObject.data.push({ 'scrape' : v, 'datetime' : data.Data });
                        },
                        error: function(msg){}
                    });

                    aPromises.push(o);
                });

                $.when(aPromises[0], aPromises[1], aPromises[2], aPromises[3]).done(function(){
                    localStorage.setItem('LastUpdated', JSON.stringify(updateObject));
                });
            }
            else {
                var LastUpdatedData = JSON.parse(retrievedData);
                var aData = LastUpdatedData.data;
                $(aScrapes).each(function(i,v){
                    var obj = $.grep(aData, function(s){
                        return s.scrape == v;
                    });

                    if (obj[0] != null){
                        $('#updated-' + v).html('Last updated: ' + obj[0].datetime);
                    }
                });
            }
        },
        activate: function() {
            var that = this;
        },
        scrapeData: function(item, e){
            var that = this;
            var scrapeItem = e.currentTarget.id;
            var sUrl = 'http://www.c0rdii.com/f1/api/scrape/' + scrapeItem;

            $('#success-' + scrapeItem).hide();
            $('#fail-' + scrapeItem).hide();
            $('#success-' + scrapeItem).hide();
            $('#error-' + scrapeItem).html('');
            $('#loading-' + scrapeItem).show();

            $.ajax({
                type: 'GET',
                beforeSend: this.setHeaders,
                dataType: 'json',
                url: sUrl,
                success: function(msg) {
                    $('#loading-' + scrapeItem).hide();
                    $('#success-' + scrapeItem).show();
                },
                error: function(msg){
                    $('#loading-' + scrapeItem).hide();
                    $('#fail-' + scrapeItem).show();
                    $('#error-' + scrapeItem).html(msg.statusText);
                }
            }).done(function(){
                var sPostUrl = 'http://localhost:62129/api/scrapelog/update/' + scrapeItem;

                $.ajax({
                    type: 'POST',
                    beforeSend: this.setHeaders,
                    dataType: 'json',
                    url: sPostUrl,
                    success: function(data) {
                        if (data.Success){
                            $('#updated-' + scrapeItem).html('Last updated: ' + data.Data)
                            localStorage.removeItem('LastUpdated');
                        }
                    },
                    error: function(msg){}
                });
            });

        },
        setHeaders: function(xhr){
            xhr.setRequestHeader('Authorization', $('#token').val());
        }
    }
});