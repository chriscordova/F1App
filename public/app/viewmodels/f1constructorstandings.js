define(['plugins/http', 'durandal/app', 'knockout', 'plugins/router', 'datatables','customScripts'], function (http, app, ko, router) {

    return {
        router: router,
        years: ko.observableArray([]),
        constructors: ko.observableArray([]),
        activate: function(year) {
            var that = this;
            var aYears = [{
                "years":  ['2015','2016']
            }];

            that.years(aYears[0].years);
            
            var sURL = 'http://www.c0rdii.com/f1/api/standings/constructor/'+year;
            var allTeams = [];
            $.getJSON(sURL, function(data){
                allTeams = data[0].ConstructorStandings;
            }).done(function(){
                buildDataTable('#constructorsTable', that.constructors, allTeams);
            });            
        },
        param: function(){
            return router.activeInstruction().params[0];
        }
    }
});