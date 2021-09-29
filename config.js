var Config = {
    url: $.parseJSON($.ajax({
        type: "GET",
        url: "https://jericka.web/config.json",
        dataType: "json",
        global: false,
        async: false,
        success: function (data) {
            return data;
        }
    }).responseText).url
}
