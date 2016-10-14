define(['plugins/http', 'durandal/app', 'knockout', 'plugins/router', 'datatables','customScripts'], function (http, app, ko, router) {

    return {
        router: router,
        constructorStandings: ko.observableArray([]),
        years: ko.observableArray([]),
        constructorsForYear: ko.observableArray([]),
        constructorObject: ko.observable({ 'data':[] }),
        activate: function(year) {
            var that = this;

            //NEW
            var sURL = 'http://www.c0rdii.com/f1/api/standings/constructor/' + year;
            var allTeams = [];
            var aPromises = [];
            var allYearTeams = [];
            var aYears = [{
                "years":  ['2015','2016']
            }];
            
            if (that.constructorObject().data.length > 0){
                if (year == null) return;

                allYearTeams = that.getYearStandingsFromObject(that.constructorObject(), year);
                buildDataTable('#constructorsTable', that.constructorsForYear, allYearTeams.constructorstandings);
            }
            else {
                
                that.years(aYears[0].years);
                $(that.years()).each(function(i,v){
                    var sStandingURL = 'http://www.c0rdii.com/f1/api/standings/constructor/' + v;
                    var o = $.getJSON(sStandingURL, function(data){
                            that.constructorObject().data.push({"year": v, "constructorstandings":  data[0].ConstructorStandings});
                        });
                    
                    aPromises.push(o);
                });

                $.when.apply($, aPromises).done(function(){
                    $(that.constructorObject().data).each(function(i,v){
                        allTeams.push(v.constructorstandings);
                    });

                    that.constructorStandings(allTeams);

                    if (year != null){
                        allYearTeams = that.getYearStandingsFromObject(that.constructorObject(), year);
                        buildDataTable('#constructorsTable', that.constructorsForYear, allYearTeams.constructorstandings);
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