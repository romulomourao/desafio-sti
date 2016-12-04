var App = {
    stations: {},
    userLocation: {},
    stationsDistance: [],
    map: {},
    //Função para calcular a distancia entre duas coordenadas
    calcDistance: function (lat1, lon1, lat2, lon2) {

        var R = 6371; // km
        var dLat = App.toRad(lat2 - lat1);
        var dLon = App.toRad(lon2 - lon1);
        var lat1 = App.toRad(lat1);
        var lat2 = App.toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d.toFixed(2);
    },
    //Funcção para trasformar um coordenada em radianos
    toRad: function toRad(Value) {
        return Value * Math.PI / 180;
    },

    addStation: function ($id, $Name, $lat, $lon) {
        $distance = App.calcDistance(App.userLocation.lat, App.userLocation.lon, $lat, $lon);
        App.stationsDistance.push({
            name: $Name,
            km: Number($distance),
            lat: $lat,
            lon: $lon
        });
        
    },
    apply_stations: function () {

        $.ajax({
            url: 'http://dadosabertos.rio.rj.gov.br/apiTransporte/apresentacao/rest/index.cfm/estacoesBikeRio',
            dataType: 'json',
            success: function ($response) {
                App.stations = $response.DATA;
                //console.log($response);
                var $items = [];
                var $marker = [];
                var $icon = {
                    url: 'http://rmourao.com.br/desafio-sti/img/bike.png', // url
                    scaledSize: new google.maps.Size(30, 30), // scaled size
                    origin: new google.maps.Point(0, 0), // origin
                    anchor: new google.maps.Point(0, 0) // anchor
                };

                $.each(App.stations, function ($key, $station) {
                    $station.name = $station[1];
                    $station.lat = $station[5];
                    $station.lon = $station[6];

                    $marker[$key] = new google.maps.Marker({
                        position: new google.maps.LatLng($station.lat, $station.lon),
                        map: App.map,
                        title: $station.name,
                        icon: $icon
                    });
                    google.maps.event.addListener($marker[$key], 'click', function () {
                        var infowindow = new google.maps.InfoWindow({
                            content: $station.name
                        });
                        infowindow.open(App.map, $marker[$key]);
                    });

                    App.addStation($key, $station.name, $station.lat, $station.lon);

                });

                //Função para ordenar as distancias
                function dynamicSort(property) {
                    var sortOrder = 1;
                    if (property[0] === "-") {
                        sortOrder = -1;
                        property = property.substr(1);
                    }
                    return function (a, b) {
                        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;

                        return result * sortOrder;
                    }
                }
                App.stationsDistance = App.stationsDistance.sort(dynamicSort("km"));
                App.stationsDistance.forEach(function(item,index){
                    $items.push('<li>' + item.name + ' - ' + item.km + 'Km</li>');
                });
                

                $(".stations-list").empty();
                $("<ul/>", {
                    class: 'stations-list',
                    html: $items.join("")
                }).appendTo("#near-stations");

                $("#local").text("Estação " + App.stationsDistance[0].name + " está a " + App.stationsDistance[0].km + " Km do seu local");

                //Linha vermelha no mapa entre o local e a estação mais próxima
                var line = new google.maps.Polyline({
                    path: [
                        new google.maps.LatLng(App.userLocation.lat, App.userLocation.lon),
                        new google.maps.LatLng(App.stationsDistance[0].lat, App.stationsDistance[0].lon)
                    ],
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                    map: App.map
                });

                App.stationsDistance = [];
                App.userLocation = {};
            }
        });//FIM DO AJAX
    },
    init: function (coords) {

        App.map = new google.maps.Map(document.getElementById("map"), {
            center: new google.maps.LatLng(coords.lat, coords.lon),
            mapTypeId: 'roadmap',
            zoom: 14
        });
        App.userLocation = coords;
        App.apply_stations();

        new google.maps.Marker({
            position: new google.maps.LatLng(coords.lat, coords.lon),
            map: App.map,
            title: "Você está aqui"
        });
    }
};
$(document).ready(function () {

    window.onkeypress = function (e) {
        var code = e.keyCode ? e.keyCode : e.which;
        if (code === 13) {
            if (document.getElementById('rua').value !== "") {
                var $rua = document.getElementById('rua').value;
                $('#rua').val("");
                $rua = $rua.replace(" ", "+");
                searchStreet($rua);


            }

        }
    };

    function searchStreet($rua) {
        $.ajax({

            url: 'http://nominatim.openstreetmap.org/search?street=' + $rua + '&city=rio+de+janeiro&format=json',

            success: function (data) {
                if (data.length > 0) {
                    var userCoords = {
                        "lat": data[0].lat,
                        "lon": data[0].lon
                    };
                    App.init(userCoords);
                    $("#map_wrapper").css({
                        "visibility": "visible"
                    });

                } else {
                    alert("Rua não encontrada ou não existe.");
                }


            },
            error: function () {
                alert("Algo deu errado...tente novamente");

            }
        });

    }



});