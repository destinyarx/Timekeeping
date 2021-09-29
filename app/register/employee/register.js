

function saveToDB(){
    
    
    
    const id    = $('#id').val();
    const fname = $('#fname').val();
    const mname = $('#mname').val();
    const lname = $('#lname').val();

    // temporarily save to local storage 
    // wait for registration face validation before saving to database
    window.localStorage.setItem('command', 'register');
    localStorage.setItem("id", id);
    localStorage.setItem("fname", fname);
    localStorage.setItem("mname", mname);
    localStorage.setItem("lname", lname);
    
    // unset item if the regristration is done or cancel
    /*
    localStorage.removeItem("id");
    localStorage.removeItem("fname");
    localStorage.removeItem("mname");
    localStorage.removeItem("lname");
    */


    // lipat sa next window papunta kay camera
    
    location.replace("../camera.html");
    //ilipat yung ajax sa registration ng camera after successful yung registration
    $.ajax({
        type: "POST",
        url: 'register.php',
        dataType: "json",
        data: {  'id'    : id,
        'fname' : fname,
        'mname' : mname,
        'lname' : lname },
        success: function(data)
        {
            // ipapasok to sa local storage tapos jump into capture page
            window.location.href = "../camera.html";
            alert("success!");
        }
    });

}