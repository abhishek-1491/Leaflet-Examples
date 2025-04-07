var map = L.map('map',{
    layers : MQ.mapLayer(),
    center : [18.47737077990186, 73.89475121337219],
    zoom : 12
});


function submitForm(){
    map.remove();
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;

    console.log(start, end);
    
    rundirection(start, end);
    // document.getElementById('form').reset();
}

function rundirection(start, end){
    map = L.map('map',{
        layers : MQ.mapLayer(),
        center : [18.47737077990186, 73.89475121337219],
        zoom : 12
    });
    var dir = MQ.routing.directions();
    dir.route({
        locations : [
            start, end
        ]
    });
    customRouteLayer = MQ.Routing.RouteLayer.extend({
        createStartMarker : (location) =>{
            var custom_icon, marker;
            custom_icon = L.icon({
                iconUrl : '/images/taxi.png',
                iconSize: [100, 100]
            });

            marker = L.marker(location.latLng,{icon:custom_icon}).addTo(map);

            return marker;
        },

        createEndMarker : (location) =>{
            var custom_icon, marker;
            custom_icon = L.icon({
                iconUrl : '/images/taxi.jpg',
                iconSize: [100, 100]
            });

            marker = L.marker(location.latLng,{icon:custom_icon}).addTo(map);

            return marker;
        }
    });

    map.addLayer(new customRouteLayer({
        directions : dir, fitBounds : true
    }));
}

const form = document.getElementById('form');
form.addEventListener('submit',submitForm);