define(['plugins/http', 'durandal/app', 'knockout', 'plugins/router', 'bootstrap'], function (http, app, ko, router, bs) {

    return {
        router: router,
        results: ko.observableArray([]),
        years: ko.observableArray([]),
        countries: ko.observableArray([]),
        activate: function(year, country) {
            var that = this;
            var aYears = {
                "years":  ['2015','2016']
            };

            var aCountries = {
                "country": ['Australia','Malaysia','China','Bahrain','Spain','Monaco','Canada','Austria','Great-Britain','Hungary','Belgium','Italy','Singapore','Japan','Russia','United-States','Mexico','Brazil','Abu-Dhabi']
            };

            that.years(aYears.years);

            that.countries(aCountries.country);
            if (year != null && country != null){
                var sURL = 'http://www.c0rdii.com/f1/api/results/' + year + '/' + country;
                var allResults = [];
                $.getJSON(sURL, function(data){
                    allResults = data[0].Results;
                }).done(function(){
                    return that.results(allResults);
                });
            }
                          
        },
        yearParam: function(){
            return router.activeInstruction().params[0];
        },
        countryParam: function(){
            return router.activeInstruction().params[1];
        },
        friendly: function(country){
            return country.replace('-',' ');
        }
    }
});