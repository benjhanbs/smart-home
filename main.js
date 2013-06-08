var xmlHttp;
var capture;

$(document).ready(function()
{
	if (window.XMLHttpRequest) { // Mozilla, Safari, ...
		xmlHttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // IE 8 and older
	xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var capture = navigator.device.capture;
	//CreateSpeechRecognition();
	Get2();
});

//var create_email = false;
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
var recognition

function CreateSpeechRecognition()
{
	if (!('webkitSpeechRecognition' in window)) 
	{
		alert("You Need To Upgrade Your Browser");
		//upgrade();
	} 
	else 
	{
		//start_button.style.display = 'inline-block';
		recognition = new webkitSpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = true;

		recognition.onstart = 
		function() 
		{
			recognizing = true;
			//showInfo('info_speak_now');
			//start_img.src = '/intl/en/chrome/assets/common/images/content/mic-animate.gif';
		};

		recognition.onerror = 
		function(event) 
		{
			if (event.error == 'no-speech') 
			{
				//start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
				//showInfo('info_no_speech');
				alert("Error!!! - no-speech");
				ignore_onend = true;
			}
			
			if (event.error == 'audio-capture') 
			{
				//start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
				//showInfo('info_no_microphone');
				alert("Error!!! - audio-capture");
				ignore_onend = true;
			}
    
			if (event.error == 'not-allowed') 
			{
				if (event.timeStamp - start_timestamp < 100) 
				{
					//showInfo('info_blocked');
					alert("Error!!! - not-allowed if");
				} 
				else 
				{
					//showInfo('info_denied');
					alert("Error!!! - not-allowed else");
				}
				ignore_onend = true;
			}
			
		};
		

		recognition.onend = 
		function() 
		{
			recognizing = false;
			if (ignore_onend) 
			{
				return;
			}
			//start_img.src = '/intl/en/chrome/assets/common/images/content/mic.gif';
			if (!final_transcript) 
			{
				alert("final_transcript Is Empty");
				//showInfo('info_start');
				return;
			}
			//showInfo('');
			if (window.getSelection) 
			{
				alert("window.getSelection = true");
				//window.getSelection().removeAllRanges();
				//var range = document.createRange();
				//range.selectNode(document.getElementById('final_span'));
				//window.getSelection().addRange(range);
			}		
			//if (create_email) Dont Need To Create Email
			//{
			//	create_email = false;
			//	createEmail();
			//}
		};

		recognition.onresult = 
		function(event) 
		{
			var interim_transcript = '';
			if (typeof(event.results) == 'undefined') 
			{
				recognition.onend = null;
				recognition.stop();
				//upgrade();
				return;
			}
			for (var i = event.resultIndex; i < event.results.length; ++i) 
			{
				if (event.results[i].isFinal) 
				{
					final_transcript += event.results[i][0].transcript;
				} 
				else 
				{
					interim_transcript += event.results[i][0].transcript;
				}
			}
			
			final_transcript = capitalize(final_transcript);
			final_span.innerHTML = linebreak(final_transcript);
			interim_span.innerHTML = linebreak(interim_transcript);
			if (final_transcript || interim_transcript) 
			{
				//alert ("final_transcript || interim_transcript");
				//showButtons('inline-block');
			}
		};
	}

		/*function upgrade() 
		{
			start_button.style.visibility = 'hidden';	
			showInfo('info_upgrade');
		}
		*/
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) 
{
	return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) 
{
	return s.replace(first_char, function(m) 
	{ 
		return m.toUpperCase(); 
	});
}

function startButton(event) {
  if (recognizing) 
  {
	alert("recognition.stop");
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = "he-IL";//"en-US";//select_dialect.value;
  recognition.start();
  ignore_onend = false;
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
  //start_img.src = '/intl/en/chrome/assets/common/images/content/mic-slash.gif';
  //showInfo('info_allow');
  //showButtons('none');
  start_timestamp = event.timeStamp;
}



function CreateAllPins2()
{
	Get2();
}


function Send(Pin,Action)
{
	var url = "http://smarthome.myvnc.com/arduino/set?pin"+Pin+"="+Action;
	//var url = "http://192.168.1.120/set?pin"+Pin+"="+Action;
	//var url = "http://192.168.1.120/set?pin31=2";
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
    xmlHttp.onreadystatechange = function X()
	{

		 if(xmlHttp.readyState == 4)
		 {
			//alert(xmlHttp.responseText);
			//alert("Request Came Good");
		 }
		 if(xmlHttp.readyState == 200)
		 {
			  //alert("Request Lost");
		 }
	}
}

function Get2()
{	
	var url = "http://smarthome.myvnc.com/arduino";
	$.ajax(
		{
			url: url
		}
	).done(function(response) 
	{
		alert(response);
		CreateButtonsHandle5($('#container4'),response);
	});
}

function CreateButtonsHandle5(container,response)
{
	var i;
	var parts;
	var ON_OFF_Blink;
	var pin;
	var relayid;
	var lines = response.split("\n");
	for (i = 0; i < lines.length; i++) 
	{
		parts = lines[i].split(": ");
		ON_OFF_Blink = parts[1];
		pin = parts[0].split("n");
		relayid = pin[1];
		if (relayid < 30 || relayid > 45)
			continue;
		switch (ON_OFF_Blink)
		{
			case "On":
			{
				container.append($('<li><div data-role=navbar class=ui-navbar ui-mini role=navigation><ul><li><a href=# data-relay-id='+relayid+' class=ui-btn-active ui-link onclick=Send('+relayid+',0)>'+relayid+' ON</a></li><li><a href=# data-relay-id='+relayid+' class=ui-link onclick=Send('+relayid+',1)>'+relayid+' OFF</a></li><li><a href=# data-relay-id='+relayid+' class=ui-link onclick=Send('+relayid+',2)>'+relayid+' BLINK</a></li></ul></div></li>'));
				container.trigger('create');
				break;
			}
			case "Off":
			{
				container.append($('<li><div data-role=navbar class=ui-navbar ui-mini role=navigation><ul><li><a href=# data-relay-id='+relayid+' class=ui-link onclick=Send('+relayid+',0)>'+relayid+' ON</a></li><li><a href=# data-relay-id='+relayid+' class=ui-btn-active ui-link onclick=Send('+relayid+',1)>'+relayid+' OFF</a></li><li><a href=# data-relay-id='+relayid+' class=ui-link onclick=Send('+relayid+',2)>'+relayid+' BLINK</a></li></ul></div></li>'));
				container.trigger('create');
				break;
			}
			case "Blinking":
			{
				container.append($('<li><div data-role=navbar class=ui-navbar ui-mini role=navigation><ul><li><a href=# data-relay-id='+relayid+' class=ui-link onclick=Send('+relayid+',0)>'+relayid+' ON</a></li><li><a href=# data-relay-id='+relayid+' class=ui-link onclick=Send('+relayid+',1)>'+relayid+' OFF</a></li><li><a href=# data-relay-id='+relayid+' class=ui-btn-active ui-link onclick=Send('+relayid+',2)>'+relayid+' BLINK</a></li></ul></div></li>'));
				container.trigger('create');
				break;
			}
		}
	}
}




// ----------------------------------------------------------------------
function CreateButtonsHandle4(container,relayid,state)
{
	switch (state)
	{
		case 0://On
		{
			container.append($('<li><div data-role=navbar class=ui-navbar ui-mini role=navigation><ul><li><a href=# data-relay-id='+relayid+' class=ui-btn-active ui-link onclick=Send('+relayid+',0)>'+relayid+' ON</a></li><li><a href=# data-relay-id='+relayid+' class=ui-link onclick=Send('+relayid+',1)>'+relayid+' OFF</a></li><li><a href=# data-relay-id='+relayid+' class=ui-link onclick=Send('+relayid+',2)>'+relayid+' BLINK</a></li></ul></div></li>'));
			container.trigger('create');
			break;
		}
		case 1://Off
		{
			container.append($('<li><div data-role=navbar class=ui-navbar ui-mini role=navigation><ul><li><a href=# data-relay-id='+relayid+' class=ui-link onclick=Send('+relayid+',0)>'+relayid+' ON</a></li><li><a href=# data-relay-id='+relayid+' class=ui-btn-active ui-link onclick=Send('+relayid+',1)>'+relayid+' OFF</a></li><li><a href=# data-relay-id='+relayid+' class=ui-link onclick=Send('+relayid+',2)>'+relayid+' BLINK</a></li></ul></div></li>'));
			container.trigger('create');
			break;
		}
		case 2://Blink
		{
			container.append($('<li><div data-role=navbar class=ui-navbar ui-mini role=navigation><ul><li><a href=# data-relay-id='+relayid+' class=ui-link onclick=Send('+relayid+',0)>'+relayid+' ON</a></li><li><a href=# data-relay-id='+relayid+' class=ui-link onclick=Send('+relayid+',1)>'+relayid+' OFF</a></li><li><a href=# data-relay-id='+relayid+' class=ui-btn-active ui-link onclick=Send('+relayid+',2)>'+relayid+' BLINK</a></li></ul></div></li>'));
			container.trigger('create');
			break;
		}
	}
}

function CreateAllPins()
{
	Get(31);
}

function Get (pin)
{
	if (pin == 41) return; 
	
	var url = "/arduino/get?pin"+pin+"";
	$.ajax(
		{
			url: url
		}
	).done(function(response) {
		CreateButtonsHandle4($('#container4'), pin, Number(response));
		Get(pin + 1);
	});
	
	//var url = "http://192.168.1.120/GetTemp?2";
	/*xmlHttp.open("GET", url, true);
    xmlHttp.send();
	xmlHttp.onreadystatechange = function() 
	{
		if (xmlHttp.readyState == 4) 
		{
			var state = xmlHttp.responseText;
			alert(state);
			//CreateButtonsHandle4($('#container4'),state);
		}
	}	*/
	/*
	$.get(url,null,function(data) 
	{
		alert(data);
	});
	*/
}

function CreateButtons()
{
	//CreateButtonsHandle($('#container'));
	//CreateButtonsHandle2($('#container2'));
	//CreateButtonsHandle3($('#container3'));
	//CreateButtonsHandle4($('#container4'));
}

function CreateButtonsHandle(container)
{
	var relay_id;
	var NumOfButtons = 38;
	for (relay_id = 31; relay_id < NumOfButtons; relay_id++)
	{
		var button = container.find('button[data-relay-id=' + relay_id + ']');
		
		// create a button if one does not exist
		if (!button.length)
		{
			newline = $('<br/>')
			button = $('<button />');
			button.attr('data-inline','true');
			button.attr('data-icon','delete');
			button.attr('data-theme','a');
			button.attr('data-iconpos','left');
			button.addClass('relay');
			button.text(relay_id);
			button.attr('data-relay-id', relay_id);
			button.click(function()
			{
				Send($(this).attr('data-relay-id'),0);
			});
			container.append(button);
			container.append(newline);
			button.button();
		}		
	}
}

function CreateButtonsHandle3(container)
{
	var relayid = 31;
	if (!relayid.length)
	{
		return false;
	}
	/*
	if (relayid.toLowerCase() == 'water heater')
	{
		relayid = 31;
		container.append($('<div lang=he data-role=navbar class=ui-navbar ui-mini role=navigation><ul><li><a href=# data-relay-id='+relayid+' class=ui-btn-active ui-link onclick=Send('+relayid+',0)>דוד ON</a></li><li><a href=# data-relay-id='+relayid+' class=ui-link onclick=Send('+relayid+',1)>דוד OFF</a></li><li><a href=# data-relay-id='+relayid+' class=ui-link onclick=Send('+relayid+',2)>דוד BLINK</a></li></ul></div>'));
		container.trigger('create');
	}
	*/
	container.append($('<div data-role=navbar class=ui-navbar ui-mini role=navigation><ul><li><a href=# data-relay-id='+relayid+' class=ui-btn-active ui-link onclick=Send('+relayid+',0)>'+relayid+' ON</a></li><li><a href=# data-relay-id='+relayid+' class=ui-link onclick=Send('+relayid+',1)>'+relayid+' OFF</a></li><li><a href=# data-relay-id='+relayid+' class=ui-link onclick=Send('+relayid+',2)>'+relayid+' BLINK</a></li></ul></div>'));
    container.trigger('create');
}

function CreateButtonsHandle2(container)
{
	var i = 0;
	var relay_id;
	var newLI;
	var button;
	var NumOfButtons = 38;
	for (relay_id = 31; relay_id < NumOfButtons; relay_id++)
	{
		var newUL = container.find('button[data-relay-id=' + relay_id + ']');
		if (!newUL.length)
		{
			newUL = $('<ul />');
			for (i=0; i<3; i++)
			{
				
			// create a button if one does not exist
			//if (!newLI.length)
			//{
				/*
				<div data-role="navbar">
					<ul>
						<li><a href="#" class="ui-btn-active">One</a></li>
						<li><a href="#">Two</a></li>
						<li><a href="#">Three</a></li>
					</ul>
				</div><!-- /navbar -->
				*/
				newLI = $('<li />');
				newA = $('<a />');
				button = $('<span />');
				switch (i)
				{
					case 0:
					{
						button.attr('data-relay-id', relay_id);
						button.addClass('ui-btn-active');
						button.text(relay_id + " ON");
						button.click(function()
						{
							Send($(this).attr('data-relay-id'),0);
						});
						break;
					}
					case 1:
					{
						button.attr('data-relay-id', relay_id);
						button.text(relay_id + " OFF");
						button.click(function()
						{
							Send($(this).attr('data-relay-id'),1);
						});
						break;
					}
					case 2:
					{
						button.attr('data-relay-id', relay_id);
						button.text(relay_id + " BLINK");
						button.click(function()
						{
							Send($(this).attr('data-relay-id'),2);
						});
						break;
					}
				}
				newA.append(button);
				newLI.append(newA);
				newUL.append(newLI);
				if (i == 2)
				{
					container.append(newUL);
					container.trigger('create');
				}
				button.button();
				/*
				button.attr('href','#');
				button.attr('data-icon','delete');
				button.attr('data-theme','a');
				button.attr('data-iconpos','left');
				button.addClass('relay');
				button.text(relay_id);
				button.attr('data-relay-id', relay_id);
				button.click(function()
				{
					Send($(this).attr('data-relay-id'),0);
				});
				container.append(button);
				container.append(newline);
				button.button();
				*/
			//}
			}
		}
	}
	
	
}
