
$.ajax({
    type: "POST",
    url: '../../../../../test_avasia3/test/face/public/php/insertTime.php', //edit ../../../../face/public/php/insertTime.php
    dataType: "json",
    data: { id : "Prashant Kumar",
           command : "command" },
    success: function(data)
    {
        alert("Success!");                            
    }
});