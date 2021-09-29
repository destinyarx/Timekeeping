$(document).ready(function() {
    var App = {
        canvas: $("#canvas"),
        api: Config.url + "/api",
        path: Config.url + "/admin",
        token: localStorage.getItem("Token"),
        uniqueID: localStorage.getItem("userid"),
        admininput: localStorage.getItem("admin"),
        adminpass: localStorage.getItem("password"),
        authntication: function() {
            if(App.admininput === null || App.adminpass === null || App.token !== App.adminpass && App.uniqueID !== App.admininput) {
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'Please Login',
                    showConfirmButton: false,
                    timer: 1500
                  })
                window.location.href = "/app/#/welcome/";
            }else {
                 window.location.href = "/admin/#/dashboard/admin/";
                 //alert("Login");
            }
        },
        initialize: function() {
            App.authntication();
        }
    }

    App.initialize();

    $.Mustache.options.warnOnMissingTemplates = true;

    $.Mustache.load('templates/administrator.html').done(function() {
        var canvas = $(App.canvas);

        Path.map("#/dashboard/admin/").to(function() {
            App.canvas.html("").append($.Mustache.render('dashboardAdminPage'));
        });

        Path.map("#/register/employee/").to(function() {
            App.canvas.html("").append($.Mustache.render('employeeRegisterPage'));


            $('#register').click(function(e){

                e.preventDefault();
                let id    = $('#id').val();
                let fname = $('#fname').val();
                let mname = $('#mname').val();
                let lname = $('#lname').val();
            
                // temporarily save to local storage 
                // wait for registration face validation before saving to database
               
                
                // go to camera to capture images of the employee
                //console.log("hotdog")
                if(id == ""|| fname == "" || mname == "" || lname == "")
                {
                    alert("Fill out missing field");
                }else{

                    console.log(id);
                    localStorage.setItem('command', 'register');
                    localStorage.setItem("id", id);
                    localStorage.setItem("fname", fname);
                    localStorage.setItem("mname", mname);
                    localStorage.setItem("lname", lname);
                   window.location.href = "#/register/camera/";  
                }
                
                 
                //console.log("hotdog2")
                 
                
            }) 
        });

        Path.map("#/register/camera/").to(function() {
            App.canvas.html("").append($.Mustache.render('cameraRegisterPage'));

            //script for capturing images
            let image = "";
            
            let i = null;

            Webcam.set({
                width: 320,
                height: 240,
                image_format: 'jpeg',
                jpeg_quality: 90
            })

            Webcam.attach( '#camera' );

            $('#capture').click(function(e){
            
                // take snapshot and get image data
                Webcam.snap( function(data_uri) {
                    // display results in page
                    document.getElementById('results').innerHTML = '<img id = "imageprev" src="' 
                    + data_uri+'"/>';  
                    image = data_uri;
                } );
            })


            $('#save').click(function(e){
                // Get base64 value from <img id='imageprev'> source
                //var base64image = document.getElementById("imageprev").src;
                var base64image = $("#imageprev").src;

                // if 2 picture is done then proceed to face recognition verification
                if(i>=2){
                    // proceed to face recognitin page
                    alert("Done taking photo, proceed to face recognition");
                    //window.location.href = "app/#/face/recognition/";
                }else{
                    var id = localStorage.getItem("id");
                    $.ajax({
                        type: "POST",
                        url: '../admin/php/upload.php',
                        data: { imageURL: base64image,
                                    num : i,
                                     id : id
                        },
                        success: function(data)
                        {
                            alert("Image successfully saved!");
                            i++;
                            console.log(i)
                        }
                    });
                }
            })

        });


        Path.root("#/dashboard/admin/");
        
        Path.rescue(function() {
			App.canvas.html("").append($.Mustache.render("404"));
		});

        Path.listen();        
    });
});