define(['plugins/http', 'durandal/app', 'knockout', 'plugins/router', 'datatables', 'customScripts'], function (http, app, ko, router) {

    return {
        router: router,
        driverStandings: ko.observableArray([]),
        years: ko.observableArray([]),
        standingsForYear: ko.observableArray([]),
        standingObject: ko.observable({ 'data':[] }),
        activate: function(year) {
            var that = this;

            var sURL = 'http://www.c0rdii.com/f1/api/standings/drivers/' + year;
            var allDrivers = [];
            var aPromises = [];
            var allYearDrivers = [];
            var aYears = [{
                "years":  ['2015','2016']
            }];
            
            if (that.standingObject().data.length > 0){
                if (year == null) return;

                allYearDrivers = that.getYearStandingsFromObject(that.standingObject(), year);
                buildDataTable('#driversTable', that.standingsForYear, allYearDrivers.standings);
            }
            else {
                
                that.years(aYears[0].years);
                $(that.years()).each(function(i,v){
                    var sStandingURL = 'http://www.c0rdii.com/f1/api/standings/drivers/' + v;
                    var o = $.getJSON(sStandingURL, function(data){
                            that.standingObject().data.push({"year": v, "standings":  data[0].DriverStandings});
                        });
                    
                    aPromises.push(o);
                });

                $.when.apply($, aPromises).done(function(){
                    $(that.standingObject().data).each(function(i,v){
                        allDrivers.push(v.standings);
                    });

                    that.driverStandings(allDrivers);

                    if (year != null){
                        allYearDrivers = that.getYearStandingsFromObject(that.standingObject(), year);
                        buildDataTable('#driversTable', that.standingsForYear, allYearDrivers.standings);
                    } 
                });       
            }        
        },
        yearParam: function(){
            return router.activeInstruction().params[0];
        },
        getYearStandingsFromObject: function(obj, y){
            var that = this;

            var returnObj = $.grep(obj.data, function(s){
                return s.year == y.toString();
            });

            return returnObj.first();
        }
    }
});