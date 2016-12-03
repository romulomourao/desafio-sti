

window.onkeypress = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) {
        if(document.getElementById('cep').value !== ""){
            var cep  = document.getElementById('cep').value;
            //var resp = cep.replace(" ", "+");
            autoComplete(cep);
        }

    }
};

//alert(calcCrow(-22.9036857,-43.1782011,-22.947811,-43.182565).toFixed(1));



//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) 
{
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
}

// Converts numeric degrees to radians
function toRad(Value) 
{
    return Value * Math.PI / 180;
}




function autoComplete(resp){
    $.ajax({

        url: 'http://nominatim.openstreetmap.org/search?q='+resp+'&format=json',
        // url: 'http://api.postmon.com.br/v1/cep/'+cep,

        success:function(data){
            $('input[name="bairro"]').val(data[0].lat);
            $('input[name="cidade"]').val(data[0].lon);


        },
        error:function(){
            alert("Algo deu errado...tente novamente");
        }
    });

}