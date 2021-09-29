
let image = "";
var id = localStorage.getItem("id");

 Webcam.set({
     width: 320,
     height: 240,
     image_format: 'jpeg',
     jpeg_quality: 90
 })
 Webcam.attach( '#camera' );

function take_pic() {
 
   // take snapshot and get image data
   Webcam.snap( function(data_uri) {
   // console.log(data_uri)
       // display results in page
       document.getElementById('results').innerHTML = 
        '<img id = "imageprev" src="'+data_uri+'"/>';  
    image = data_uri;
    } );
}

let i = 0;

function saveSnap(){
    // Get base64 value from <img id='imageprev'> source
    var base64image = document.getElementById("imageprev").src;

    // if 3 picture is done then proceed to face recognition verification
    if(i>3){
        // punta kay face recognitin page
       // location.replace("../test_avasia3/test/face/public");
    }

    i++;
    $.ajax({
        type: "POST",
        url: 'upload.php',
        data: { imageURL: base64image,
                num : i,
                id : id
        },
        success: function(data)
        {
           // console.log(data);
            alert("success!");
        }
    });

    

}