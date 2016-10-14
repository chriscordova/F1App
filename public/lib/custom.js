jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "formatted_numbers-pre": function ( a ) {
        a = (a==="-") ? 0 : a.replace( /[^\d\-\.]/g, "" );
        return parseFloat( a );
    },
    "formatted_numbers-asc": function ( a, b ) {
        return a - b;
    },
    "formatted_numbers-desc": function ( a, b ) {
        return b - a;
    }
});

function buildDataTable(tableId, fn, data){
    $(tableId).DataTable().clear().destroy(); //destroy/wipeout the dataTable
    fn([]); //set the observableArray to an empty Array
    fn(data); //set the observableArray to my new data Array
    $(tableId).DataTable({
        "columnDefs": [
            { "type": "formatted_numbers", "targets": 0 }
        ],
    });
}

Array.prototype.first = function(){
    if (this.length > 0)
        return this[0];
    else
        return [];
}