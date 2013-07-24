function captureError(error) {
    var msg = 'An error occurred during capture: ' + error.code;
    navigator.notification.alert(msg, null, 'Error!');
    $('#capture-result').html("<strong>Error</strong>");
}
function formatError(error) {
    alert("Error getting file format data: " + error.code); 
}

// api-capture
function captureAudioSuccess(mediaFiles) {  
    $('#capture-result').html("Capture success");
    var i, len;
    var formatSuccess = function (mediaFile) {
        $('#format-data').append("Duration: <strong>" + mediaFile.duration/1000 + "s</strong><br/>");
    };
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        // uploadFile(mediaFiles[i]);
        $('#capture-result').html("<strong>" + (i+1) + " files</strong>");
        mediaFiles[i].getFormatData(formatSuccess, formatError);
    } 
    console.log("captureAudioSuccess");
}

//api-capture   Capture Audio
function captureAudio() {
    $('#format-data').empty();
    $('#capture-result').empty();
    $('#capture-result').html("Starting capture");
	navigator.device.capture.captureAudio(captureAudioSuccess, captureError, {limit: 1});
	// $('#capture-result').html("<strong>something went wrong</strong>");
}

// Record audio
//
function recordAudio() {
    var src = "myrecording.amr";
    var mediaRec = new Media(src,
        // success callback
        function() {
            $('#capture-result').html("recordAudio():Audio Success");
        },

        // error callback
        function(err) {
            $('#capture-result').html("recordAudio():Audio Error: "+ err.code);
        });

    // Record audio
    $('#capture-result').html("Calling start");
    mediaRec.startRecord();
    setTimeout(function() {
        $('#capture-result').html("Calling stop");
        mediaRec.stopRecord();
    }, 5000);
}