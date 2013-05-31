var xmlHttp;


$(document).ready(function()
{
  if (window.XMLHttpRequest) { // Mozilla, Safari, ...
		xmlHttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // IE 8 and older
	xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	GetPins();
	GetTemp();
});


function ChangeTemp(value)
{
	$('#temp-field').html("<H1>Temperature: " + value + "C");
	//$('#slider-fill').val(value);
	//$('#slider-fill').slider('refresh');
	$('#page').page();
	
}

function Send(Pin,Action)
{
	var url = "http://192.168.1.120/set?pin"+Pin+"="+Action;
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
	//GetTemp();
}

function GetTemp()
{	
	var url = "http://192.168.1.120/GetTemp?2";
	$.ajax(
		{
			url: url
		}
	).done(function(response) 
	{
		ChangeTemp(response);
		//GetTemp();
		//CreateButtonsHandle5($('#container4'),response);
	});
}

function GetPins()
{	
	var url = "http://192.168.1.120/";
	$.ajax(
		{
			url: url
		}
	).done(function(response) 
	{
		//alert(response);
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
		if (relayid<32 || relayid>45)
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
function CreateAllPins2()
{
	Get2();
}
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
	
	var url = "http://192.168.1.120/get?pin"+pin+"";
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
