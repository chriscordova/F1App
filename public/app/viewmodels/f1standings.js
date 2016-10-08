define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {

    return {
        drivers: ko.observableArray([]),
        activate: function() {
            var that = this;
            
            var sURL = 'http://www.c0rdii.com/f1/api/standings/drivers/2015';
            var allDrivers = [];
            $.getJSON(sURL, function(data){
                allDrivers = data[0].DriverStandings;
            }).done(function(){
                return that.drivers(allDrivers);
            });

            
        }
    }
});