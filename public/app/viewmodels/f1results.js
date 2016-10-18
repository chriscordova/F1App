define(['plugins/http', 'durandal/app', 'knockout', 'plugins/router', 'bootstrap','datatables','customScripts','config'], function (http, app, ko, router, bs) {

    return {
        router: router,
        results: ko.observableArray([]),
        years: ko.observableArray([]),
        countries: ko.observableArray([]),
        allCountries: ko.observable(),
        activate: function(year, country) {
            
            var that = this;
            var aYears = config.years;
            that.years(aYears);
            that.SetCountries(aYears ,that);
            var bAllCountries = false;
            var sTableId = '';
            var sURL = config.apiURL + 'results/';

            if (country == "All"){
                bAllCountries = true;
                sURL += year;
                sTableId = '#yearResultsTable';
            }
            else {
                sURL += year + '/' + country;
                sTableId = '#resultsTable';
            }

            var allResults = [];
            $.getJSON(sURL, function(data){
                allResults = data[0].Results;
            }).done(function(){
                that.allCountries(bAllCountries);
                buildDataTable(sTableId, that.results, allResults);
            });

        },
        yearParam: function(){
            return router.activeInstruction().params[0];
        },
        countryParam: function(){
            return router.activeInstruction().params[1];
        },
        friendly: function(country){
            return country.replace('_',' ');
        },
        hideMenu: function(e,v){
            var id = v.currentTarget.parentElement.id;
            var $element = $('#' + id).parent();
            var bIsShown = $element.hasClass('in');
            if (bIsShown) $element.collapse('hide');
            window.location.href = v.currentTarget.hash;
        },
        SetCountries: function(years, that){
            
            if (that.countries().length > 0) return;

            var countryArray = [];
            var aPromises = [];
            $(years).each(function(i,y){
                var aCountries = [];
                var a = [];
                var sSeasonsURL = config.apiURL + "seasons/" + y;
                var promise = $.getJSON(sSeasonsURL, function(data){
                    aCountries = $.grep(data, function(s){
                        return s.Complete;
                    });

                    $(aCountries).each(function(i,c){
                        a.push(c.RaceCountry.Name);
                    });

                    a.unshift("All");
                }).done(function(){
                    countryArray.push(a);
                });

                aPromises.push(promise);
            });

            //Issue: not returning promises in order of aPromises array
            Promise.all(aPromises).then(function(){
                that.countries(countryArray);
            });
        }
    }
});