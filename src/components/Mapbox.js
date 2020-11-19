
// need to add other code - figure out dropdown thing in react
( function() {
        var csv_path = "../data/large_airports_only.csv";

        name_lat = new Map()
        name_lon = new Map()
        name_ident = new Map()
        ident_lat = new Map()
        ident_lon = new Map()

        var renderCSVDropdown = function(csv) {
            var dropdown = $('select#airport');
            populate_origin_airports = []
            for (var i = 1; i < csv.length; i++){
                // handling outer join [ident and airport names]
                if (populate_origin_airports.indexOf(csv[i][2] !== -1)){
                    populate_origin_airports.push(csv[i][2]);
                }

                // ident_name, ident_lat and ident_lon
                if (csv[i][4] != undefined){
                    name_lat.set(csv[i][2], csv[i][4].slice(0,4));
                    ident_lat.set(csv[i][0], csv[i][4].slice(0,4));
                }
                
                if (csv[i][3] != undefined){
                    name_lon.set(csv[i][2], csv[i][3].slice(0,4));
                    ident_lon.set(csv[i][0], csv[i][3].slice(0,4));
                }
                
                name_ident.set(csv[i][2], csv[i][0]);
            }
            var select = document.getElementById("select");

            for (var j = 0; j < populate_origin_airports.length; j++){
                var option = document.createElement("OPTION"),
                txt = document.createTextNode(populate_origin_airports[j]);
                option.appendChild(txt);
                option.setAttribute("value", populate_origin_airports[j])
                select.insertBefore(option, select.lastChild);
            }
        };

        $.get(csv_path, function(data) {
            var csv = CSVToArray(data);
            renderCSVDropdown(csv);
        });

    }());


    function CSVToArray(strData, strDelimiter) {
        strDelimiter = (strDelimiter || ",");
        var objPattern = new RegExp((
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ), "gi");

        var arrData = [[]];
        var arrMatches = null;

        while ( arrMatches = objPattern.exec(strData)) {
            var strMatchedDelimiter = arrMatches[1];
            if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
                arrData.push([]);
            }
            var strMatchedValue;
            if (arrMatches[2]) {
                strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
            } else {
                strMatchedValue = arrMatches[3];
            }
            arrData[arrData.length - 1].push(strMatchedValue);
        }
        return (arrData);
    }





    