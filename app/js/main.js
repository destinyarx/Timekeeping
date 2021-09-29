$(document).ready(function() {
    var App = {
        canvas: $("#canvas"),
        api: Config.url + "/api",
        path: Config.url + "/app",
        token: localStorage.getItem("token"),
        uniqueID: localStorage.getItem("userid"),
        admininput: localStorage.getItem("admin"),
        adminpass: localStorage.getItem("password"),
        authntication: function() {
            if(App.token === App.adminpass && App.uniqueID === App.admininput){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Admin Login Successful',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  window.location.href = "/admin/#/dashboard/admin";
            }
            else {
            }
        },
        initialize: function() {
            App.authntication();
        }
    }
    

    App.initialize();

    $.Mustache.options.warnOnMissingTemplates = true;

    $.Mustache.load('templates/app.html').done(function() {
        var canvas = $(App.canvas);

        Path.map("#/welcome/").to(function() {
            App.canvas.html("").append($.Mustache.render('welcomePage'));
        });

        Path.map("#/login/admin/").to(function() {
            App.canvas.html("").append($.Mustache.render('adminLoginPage'));

            $('#submit').click(function(e)
                    {
                        var admin = $("#admin").val();
                        var adminpass = $("#adminpass").val();
                        localStorage.setItem("admin", admin); 
                        localStorage.setItem("password", adminpass);
                        
                        if(App.token === App.adminpass && App.uniqueID === App.admininput){
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Admin Login Successful',
                                showConfirmButton: false,
                                timer: 1500
                              })
                              window.location.href = "/admin/#/dashboard/admin";
                        }

                    });
        });
        Path.map("#/face/recognition/").to(function() {
            App.canvas.html("").append($.Mustache.render('faceRecognitionPage'));
            const video = document.getElementById('videoInput')

            let labeledDescriptors = null;
            let faceMatcher = null ;
            
            //limit the face that will go to checkLog function
            let limit = 0;
            
                // Get all user_ID
            const userID = new Array();

                $.ajax({
                    type: "GET",
                    url: '/app/working/public/PHP/getUserID.php', 
                    async: false,
                    success: function(data)
                    {
                        for (let i = 0; i < data.length; i++) {
                            userID.push(data[i]);
                          }
                          console.log("Getting users in database:")
                          console.log(userID) 
                    }
                    });
            
            
            Promise.all([
                faceapi.nets.faceRecognitionNet.loadFromUri('/app/working/public/dist/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/app/working/public/dist/models'),
                faceapi.nets.ssdMobilenetv1.loadFromUri('/app/working/public/dist/models')
            ]).then(start)
            
            function start() {
                document.body.append('Models Loaded')
               
                // call to load labeled images
                loadLabels()
            
                // start webcam camera
                startCamera()
                
                //call to start facial recognition
                recognizeFaces()
            }
            
            function startCamera(){
            
                navigator.getUserMedia(
                    { video:{} },
                    stream => video.srcObject = stream,
                    err => console.error(err)
                )  
            }
            
            async function loadLabels() {
                labeledDescriptors = await loadLabeledImages()
                faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.5)
            
            
            }
            
            async function recognizeFaces() {
            
                video.addEventListener('play', async () => {
                    console.log('Playing')
                    const canvas = faceapi.createCanvasFromMedia(video)
                    document.body.append(canvas)
            
                    const displaySize = { width: video.width, height: video.height }
                    faceapi.matchDimensions(canvas, displaySize)
            
                    
            
                    setInterval(async () => {
            
                        const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
            
                        const resizedDetections = faceapi.resizeResults(detections, displaySize)
            
                        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
            
                        const results = resizedDetections.map((d) => {               
                          return faceMatcher.findBestMatch(d.descriptor)
                        })
                        results.forEach( async(result, i) => {
                            const box = resizedDetections[i].detection.box
                            const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                            drawBox.draw(canvas)
            
                           // detected userID face
                           let detectID = result.toString().replace(/ *\([^)]*\) */g, "");       
                            console.log(detectID);
                            
                            // dapat hindi tumatadtad pag papasok 
                            if(detectID != "unknown" && limit == 0){
                                limit = 1;
                                let confirm = await confirmLog(detectID)
            
                                if( confirm == true){
                                    //await check(detectID)  
                                    setTimeout(check(detectID),5000);
                                }else{
                                    limit = 0;
                                } 
                            }                
                        })
                    }, 1000)
                })
            }
            
            async function confirmLog(user){
                var confirm = window.confirm("Hello "+ user +", Do you wish to continue to log?");
                limit = 0
                return confirm;
            }
            
            async function check(detectID){
            
                limit++;
                // check if the detected user is in the list
                //time-in, time-out and register 
                if(userID.includes(detectID)){
                    
                    //get Values from local storage
                    let command = window.localStorage.getItem('command');
    
                    if(command == null && confirm){
                        //ajax here then insert time
                        $.ajax({
                        type: "POST",
                        url: '../../../../../app/working/public/PHP/insertTime.php', //edit ../../../../face/public/php/insertTime.php
                        dataType: "json",
                        data: { id : detectID,
                            command : command },
                        success: function(data)
                        {
                                                        
                        }
                    });
                    console.log(detectID + 'successfully log');
                    
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: detectID + ' Recognized',
                        showConfirmButton: false,
                        timer: 1500
                        })
                        
                    window.location.href = "/#/welcome/"
                    return true  
                    }
                    
    
                    let id = window.localStorage.getItem('id');

                    // && id == detectID
                    if( command = "register"){
                        console.log(command);

                            let id    = localStorage.getItem("id");
                            let fname = localStorage.getItem("fname");
                            let mname = localStorage.getItem("mname");
                            let lname = localStorage.getItem("lname");


                            $.ajax({
                                type: "POST",
                                url: '../../../../../Avasia_Project/app/working/public/PHP/insertTime.php',
                                dataType: "json",
                                data: {  id    : id,
                                        fname : fname,
                                        mname : mname,
                                        lname : lname,
                                    command : command },
                                success: function(data)
                                { alert("Success!");}
                                });
                                    
                        //alert(id + " is successfully registered!")
                        Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: id + " is successfully registered!",
                        showConfirmButton: false,
                        timer: 1500
                        })
                        window.localStorage.removeItem('command');
                        window.localStorage.removeItem('id');
                        window.localStorage.removeItem('fname');
                        window.localStorage.removeItem('mname');
                        window.localStorage.removeItem('lname');

                        // after register successful, go to homepage 
                        window.location.href = "/#/welcome/"
                        return true

                        } else{
                            limit = 0;
                            return false
                        }
                            
                }else{
                    limit = 0
                    console.log('Face not found!');
                    return false
                } 
            }
            
            function loadLabeledImages() {
                 //const labels = ['Black Widow', 'Captain America', 'Hawkeye' , 'Jim Rhodes','Tony Stark', 'Thor', 'Captain Marvel', 'Prashant Kumar', 'Gil Jeremy', 'Krys', 'Jericka]   
                 const labels = ['Prashant Kumar','Hawkeye' , 'Jim Rhodes','Thor', 'Krys'] // para mabilis na testing
                 return Promise.all(
                    
                    labels.map(async (label)=>{
                       
                        const descriptions = []
                        for(let i=1; i<=1; i++) {
                            console.log(label);
                            const img = await faceapi.fetchImage(`/app/working/labeled_images/${label}/${i}.jpg`)
                            const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                           
                            if (!detections) {
                                throw new Error(`no faces detected for ${label}`)
                            }
            
                            console.log(label + i + JSON.stringify(detections))
                            descriptions.push(detections.descriptor)
                        }
                        console.log(descriptions);
                        document.body.append(label+' Faces Loaded | ')
                        return new faceapi.LabeledFaceDescriptors(label, descriptions)
                    })
                )
            }
        });
        Path.map("#/qr/code/").to(function() {
            App.canvas.html("").append($.Mustache.render('qrCodePage'));
            
            /*if(isset($_SESSION['error'])){
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error',
                    showConfirmButton: false,
                    timer: 1500
                  })
                
                unset($_SESSION['error']);
              }
              if(isset($_SESSION['success'])){
                
                unset($_SESSION['success']);
              }*/

           let scanner = new Instascan.Scanner({ video: document.getElementById('preview')});
           Instascan.Camera.getCameras().then(function(cameras){
               if(cameras.length > 0 ){
                   scanner.start(cameras[0]);
               } else{
                   alert('No cameras found');
               }

           }).catch(function(e) {
               console.error(e);
           });

           scanner.addListener('scan',function(c){
               document.getElementById('text').value=c;
               document.forms[0].submit();
           });

        });

        Path.root("#/welcome/");


        Path.rescue(function() {
			App.canvas.html("").append($.Mustache.render("404"));
		});

        Path.listen();        
    });
    
});

