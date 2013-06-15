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
function captureImageSuccess(mediaFiles) {  
    var i, len;
    var formatSuccess = function (mediaFile) {
        $('#format-data').append("Height: <strong>" + mediaFile.height + "</strong><br/>");
        $('#format-data').append("Width: <strong>" + mediaFile.width + "</strong><br/>");
    };
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        // uploadFile(mediaFiles[i]);
        $('#capture-result').html("<strong>" + (i+1) + " file(s)</strong>");
        mediaFiles[i].getFormatData(formatSuccess, formatError);
    } 
    console.log("captureImageSuccess");
}
function captureVideoSuccess(mediaFiles) {  
    var i, len;
    var formatSuccess = function (mediaFile) {
        $('#format-data').append("Height: <strong>" + mediaFile.height + "</strong><br/>");
        $('#format-data').append("Width: <strong>" + mediaFile.width + "</strong><br/>");
        $('#format-data').append("Duration: <strong>" + mediaFile.duration/1000 + "s</strong><br/>");
    };
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        // uploadFile(mediaFiles[i]);
        $('#capture-result').html("<strong>" + (i+1) + " files</strong>");
        mediaFiles[i].getFormatData(formatSuccess, formatError);
    } 
    console.log("captureMediaSuccess");
}

//api-capture   Capture Audio
function captureAudio() {
    $('#format-data').empty();
    $('#capture-result').empty();
    navigator.device.capture.captureAudio(captureAudioSuccess, captureError, {limit: 1});
}

// api-capture  Capture Image
function captureImage(){
    $('#format-data').empty();
    $('#capture-result').empty();
    navigator.device.capture.captureImage(captureImageSuccess, captureError, {limit: 1});    
}
// api-capture  Capture Video
function captureVideo(){
    $('#format-data').empty();
    $('#capture-result').empty();
    navigator.device.capture.captureVideo(captureVideoSuccess, captureError, {limit: 1});    
}
