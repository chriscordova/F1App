define(['plugins/http', 'durandal/app', 'knockout', 'plugins/router', 'bootstrap','datatables','customScripts'], function (http, app, ko, router, bs) {

    return {
        router: router,
        info: ko.observable(),
        teams: ko.observableArray([]),
        teamDrivers: ko.observableArray([]),
        activate: function() {
            
            var that = this;
            var aTeams = {
                "teams":  ['Mercedes','Ferrari','Red Bull Racing','Force India','Toro Rosso', 'Williams', 'Sauber','MRT','McLaren','Haas','Renault']
            };

            that.teams(aTeams.teams);

            var sURL = 'http://www.c0rdii.com/f1/api/drivers'
            var allInfo = [];
            var teamInfo = [];
            var driverInfo = [];
            $('#loading').show();
            $('#teamsTable').hide();

            if (that.teamDrivers().length > 0){
                if (that.teamParam() == null) return;
                //We want to get team info from observable
                allInfo = $.grep(that.teamDrivers(), function(s){
                    return s.Team.Name == that.teamParam();
                });

                $('#loading').hide();
                $('#teamsTable').show();
                teamInfo = allInfo[0];
                $(allInfo).each(function(i,driver){
                    driverInfo.push(driver.Name);
                });

                teamInfo.Team.Drivers = driverInfo.join(", ");
                return that.info(teamInfo);
            }
            else {
                //first time hitting this page, lets load everything
                $.getJSON(sURL, function(data){
                    that.teamDrivers(data[0].Drivers);
                    allInfo = $.grep(that.teamDrivers(), function(s){
                        return s.Team.Name == that.teamParam();
                    });
                }).done(function(){
                    $('#loading').hide();
                    $('#teamsTable').show();
                    teamInfo = allInfo[0];
                    $(allInfo).each(function(i,driver){
                        driverInfo.push(driver.Name);
                    });

                    teamInfo.Team.Drivers = driverInfo.join(", ");
                    return that.info(teamInfo);
                });
            }

        },
        teamParam: function(){
            return router.activeInstruction().params[0];
        }
    }
});