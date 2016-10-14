define(['plugins/http', 'durandal/app', 'knockout', 'plugins/dialog', 'customScripts'], function (http, app, ko, dialog) {

    return {
        drivers: ko.observableArray([]),
        biography: ko.observableArray([]),
        compositionComplete: function(){
            var that = this;
            if (that.drivers().length > 0){
                return;
            }

            $('#loading').show();
        },
        activate: function() {
            var that = this;

            if (that.drivers().length > 0){
                return;
            }

            $('#loading').show();
            var sURL = 'http://www.c0rdii.com/f1/api/drivers';
            var allDrivers = [];

            $.getJSON(sURL, function(data){
                allDrivers = data[0].Drivers;
            }).done(function(){
                $('#loading').hide();
                buildDataTable('#driversTable', that.drivers, allDrivers);
            });

            
        },
        select: function(item) {
            //the app model allows easy display of modal dialogs by passing a view model
            //views are usually located by convention, but you an specify it as well with viewUrl

            item.viewUrl = 'views/driverimage';
            item.closeModal = function(a,b){
                var self = this;
                dialog.close(self);
                window.location.href = "#teams/" + a.Team.Name;
            };
            app.showDialog(item);
        }
    }
});