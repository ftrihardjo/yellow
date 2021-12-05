const axios = require('axios');
function request(input) {
    if (input instanceof Date && !isNaN(input)) {
        return axios.get("https://data.covid19.go.id/public/api/update.json")
                    .then(function (response) {
                        var result = {};
                        response.data.update.harian
                        .forEach(function (data) {
                            if (new Date(data.key_as_string).getTime() === input.getTime()) {
                                result = {"active":data.jumlah_positif_kum.value,
                                        "deaths":data.jumlah_meninggal_kum.value,
                                        "recovered":data.jumlah_sembuh_kum.value};
                            }
                        });
                        return result;
                    });
    }
    if (/^[a-zA-Z]+$/.test(input)) {
        return axios.get("http://api.weatherapi.com/v1/current.json",{
            params: {
                key: "a672ef2e69ff4a7d96813711210412",
                q: input,
                aqi: "no"
            }
        });
    }
}