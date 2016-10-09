define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {

    return {
        drivers: ko.observableArray([]),
        biography: ko.observableArray([]),
        activate: function() {
            var that = this;
            
            var sURL = 'http://www.c0rdii.com/f1/api/drivers';
            var allDrivers = [];
            $.getJSON(sURL, function(data){
                allDrivers = data[0].Drivers;
            }).done(function(){
                return that.drivers(allDrivers);
            });

            
        },
        select: function(item,v,b,f) {
            //the app model allows easy display of modal dialogs by passing a view model
            //views are usually located by convention, but you an specify it as well with viewUrl
            //app.biography(item.Biography);

            item.viewUrl = 'views/driverimage';
            app.showDialog(item);
        }
    }
});