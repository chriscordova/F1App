define(['plugins/http', 'durandal/app', 'knockout', 'plugins/router', 'datatables', 'customScripts'], function (http, app, ko, router) {

    return {
        router: router,
        drivers: ko.observableArray([]),
        years: ko.observableArray([]),
        activate: function(year) {
            var that = this;
            var aYears = [{
                "years":  ['2015','2016']
            }];

            that.years(aYears[0].years);

            var sURL = 'http://www.c0rdii.com/f1/api/standings/drivers/' + year;
            var allDrivers = [];
            $.getJSON(sURL, function(data){
                allDrivers = data[0].DriverStandings;
            }).done(function(){
                buildDataTable('#driversTable', that.drivers, allDrivers)
            });                    
        },
        param: function(){
            return router.activeInstruction().params[0];
        } 
    }
});