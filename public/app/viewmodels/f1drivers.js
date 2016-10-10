define(['plugins/http', 'durandal/app', 'knockout', 'plugins/dialog','datatables', 'customScripts'], function (http, app, ko, dialog) {

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
                buildDataTable('#driversTable', that.drivers, allDrivers)
            });

            
        },
        select: function(item) {
            //the app model allows easy display of modal dialogs by passing a view model
            //views are usually located by convention, but you an specify it as well with viewUrl

            item.viewUrl = 'views/driverimage';
            item.closeModal = function(a,b){
                var self = this;
                dialog.close(self);
                window.location.href = "/#teams/" + a.Team.Name;
            };
            app.showDialog(item);
        }
    }
});