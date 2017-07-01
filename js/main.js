try {
    console.log("starting main.js");
    var map = L.map('map').setView([0, 0], 2);
    map.options.minZoom = 2;

    var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    OpenStreetMap_Mapnik.addTo(map);

    $(".modal").modal();

    $('#go').on('click', function (e) {
        console.log("GO!");
        var url_to_raster = $("#url-to-raster").val().trim();
        if (url_to_raster) {
            var input_url = url_to_raster;
        }

        var files = $("#file").get(0).files;
        if (files.length > 0) {
            var file = files[0];
            console.log("file:", file);
            var input_url = URL.createObjectURL(file);
        }

        console.log("input_url:", input_url);


        fetch(input_url).then(
            r => r.arrayBuffer(),
            (error) => {
                var domain = new URL(input_url).host;
                var error_message = "GeoTIFF.io could not get the file from " + domain + ".  This is often because a website's security prevents cross domain requests.  Download the file and load it manually.";
                if (swal) swal("Oops", error_message, "error");
                else alert(error_message);
            }
        ).then(function(buffer) {
            if (buffer) {
                $(".modal").modal('hide');
                var s = L.ScalarField.fromGeoTIFF(buffer);
                let layer = L.canvasLayer.scalarField(s).addTo(map);
                map.flyToBounds(layer.getBounds());
            }
       });

    });
    

} catch (error) {
    console.error(error);
}


