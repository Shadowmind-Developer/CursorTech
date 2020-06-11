console.log(`----------------------------------------------------------------------
CursorTech v.0.0.16c (build.13.10.11062020)

Go to the popup to activate
----------------------------------------------------------------------
`);

var xmouse = 0
var ymouse = 0
var xmouseclick = 0
var ymouseclick = 0
var pressedKey = 0
var writing = false
var Advanced = false
var url = window.location.href
var changepage = false
var color = ''
var usercursor = 'default'

//Cookie System

var cookies = document.cookie
if (cookies) {
    cookies = cookies.split(';');
    for (let i = 0; i < cookies.length; i++) {
        var cookie = cookies[i]
        cookie = cookie.split('=');
    }
    console.log('There are ' + cookies.length + ' visible cookies on this Website');
}

//Load System

chrome.storage.local.get(['HTTPS'], function (result) {
    changepage = result.HTTPS
    //console.log('HTTPS is set to ' + changepage);

    if (!changepage) {
        changepage = false
        chrome.storage.local.set({ HTTPS: changepage }, function () {
            //console.log('HTTPS is set to ' + changepage);
        });
    }
    if (url.indexOf('https:') != -1) {
        chrome.runtime.sendMessage({ "newIconPath": "icongreen.png" });
        color = 'green'
        console.log('Website is https');
    } else {
        if (url.indexOf('http://') != -1) {
            console.log('Website is http');
            if (changepage == true) {
                url = url.substr(7);
                console.log('Changing to https');
                window.location.href = 'https://' + url
            } else {
                chrome.runtime.sendMessage({ "newIconPath": "iconred.png" });
                color = 'red'
                console.log('No changes made');
            };
        }
    }
});

chrome.storage.local.get(['ACT'], function (result) {
    writing = result.ACT
    //console.log('ACT is set to ' + writing);

    if (writing) {
        if (writing == true) {
            console.log("ACT enabled");
        } else if (writing == false) {
            console.log("ACT disabled");
        }
    } else {
        writing = false
        console.log("ACT disabled");

    }
});

console.log('Useroptions loaded')

//HTTPS System

if (url.indexOf('https:') != -1) {
    chrome.runtime.sendMessage({ "newIconPath": "icongreen.png" });
    color = 'green'
    console.log('Website is https');
} else {
    if (url.indexOf('http://') != -1) {
        console.log('Website is http');
        if (changepage == true) {
            url = url.substr(7);
            console.log('Changing to https');
            window.location.href = 'https://' + url
        } else {
            chrome.runtime.sendMessage({ "newIconPath": "iconred.png" });
            color = 'red'
            console.log('No changes made');
        };
    }
}

//User Interface

    let style1 = document.createElement("style");
    style1.type = 'text/css';
    style1.innerHTML = `
#cursor{
width: 20px;
height: 20px;
border: 2px solid black;
border-radius: 50%;
position: absolute;
transform: translate(-50%, -50%);
pointer-events: none;
z-index: 9;
backdrop-filter: grayscale();
animation-name: cursorAnim;
animation-duration: 1s;
animation-iteration-count: infinite;
animation-direction: alternate;
}

@keyframes cursorAnim {
    0% {
        width: 20px;
        height: 20px;
    }
    50% {
        width: 25px;
        height: 25px;
    }
    100%{
        width: 20px;
        height: 20px;
    }
}

@keyframes cursorAnim2 {
    0% {
        width: 20px;
        height: 20px;
    }
    50% {
    }
    100%{
        width: 35px;
        height: 35px;
        opacity: 0;
    }
}

#cursor2 {
width: 20px;
height: 20px;
border: 6px solid gray;
border-radius: 50%;
position: absolute;
transform: translate(-50%, -50%);
top: 10px;
left: 10px;
pointer-events: none;
z-index: 9;
opacity: .5;
backdrop-filter: grayscale();
animation-name: cursorAnim;
animation-duration: 1s;
animation-iteration-count: infinite;
animation-direction: alternate;
}
`
document.head.appendChild(style1);

let div1 = document.createElement("div");
div1.className = 'cursor';
div1.id = 'cursor';
document.body.appendChild(div1);

let div2 = document.createElement("div");
div2.className = 'cursor2';
div2.id = 'cursor2';
document.body.appendChild(div2);

chrome.storage.local.get(['Cursors'], function (result) {
    usercursor = result.Cursors

    if (usercursor == 'default') {
        document.body.style.cursor = 'default';
        document.getElementById('cursor').style.border = 'none';
        document.getElementById('cursor2').style.border = 'none';
    }
    if (usercursor == 'circle') {
        document.body.style.cursor = 'none';
        document.getElementById('cursor').style.border = '2px solid black';
        document.getElementById('cursor2').style.border = '6px solid gray';

        console.log('Created cursorparts')

        //Cursor System

        if (usercursor == 'circle') {
            window.addEventListener("mousemove", cursor);
            window.addEventListener('click', cursorAn2);
        }

        function cursor(e) {
            document.getElementById('cursor').style.top = e.pageY + 'px';
            document.getElementById('cursor').style.left = e.pageX + 'px';
            document.getElementById('cursor2').style.top = e.pageY + 'px';
            document.getElementById('cursor2').style.left = e.pageX + 'px';
        }
        function cursorAn2() {
            document.getElementById('cursor2').style.animationName = 'cursorAnim2';
            setTimeout(() => {
                document.getElementById('cursor2').style.animationName = 'cursorAnim';
            }, 1000)
        }

        console.log("Loaded custom cursor");
    }
});

let script1 = document.createElement("script");
script1.innerHTML = `
console.log('JavaScript injected')




`
document.head.appendChild(script1);

let ui1 = document.createElement("p");
ui1.textContent = "CursorTech"
document.body.appendChild(ui1);

let ui2 = document.createElement("p");
ui2.textContent = "X:" + xmouse
document.body.appendChild(ui2);

let ui3 = document.createElement("p");
ui3.textContent = "Y:" + ymouse
document.body.appendChild(ui3);

let ui4 = document.createElement("p");
ui4.textContent = "Key:" + pressedKey
document.body.appendChild(ui4);

console.log("Generated basic UI");

//Command System

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
    var Command = message;

    //console.log(Command);

    if (Command.indexOf('/') != -1) {
        if (Command.indexOf('/;') != -1) {
            chrome.runtime.sendMessage({ "newIconPath": "iconyellow.png" });
            var List = Command.split("/");
            for (let i = 0; i < List.length; i++) {
                //console.log(List[i]);
                var ListCommand = List[i];
                if (ListCommand.indexOf(';') != -1) {
                    if (ListCommand == ";") {
                        var icon = "icon" + color + ".png"
                        chrome.runtime.sendMessage({ "newIconPath": icon });
                    }
                };
                if (ListCommand.indexOf('option:') != -1) {
                    if (ListCommand == "option:ACTEnabled") {
                        writing = true;
                        chrome.storage.local.set({ ACT: writing }, function () {
                            //console.log('ACT is set to ' + writing);
                        });
                        console.log("ACT enabled");
                    };
                    if (ListCommand == "option:ACTDisabled") {
                        writing = false;
                        chrome.storage.local.set({ ACT: writing }, function () {
                            //console.log('ACT is set to ' + writing);
                        });
                        console.log("ACT disabled");
                    };
                    if (ListCommand == "option:AdvancedEnabled") {
                        Advanced = true;
                        console.log("Advanced Commands enabled");
                    };
                    if (ListCommand == "option:AdvancedDisabled") {
                        Advanced = false;
                        console.log("Advanced Commands disabled");
                    };
                    if (ListCommand == "option:HTTPSEnabled") {
                        changepage = true;
                        chrome.storage.local.set({ HTTPS: changepage }, function () {
                            //console.log('HTTPS is set to ' + changepage);
                        });
                        if (url.indexOf('https:') != -1) {
                            console.log('Website is https');
                        } else {
                            if (url.indexOf('http://') != -1) {
                                console.log('Website is http');
                                if (changepage == true) {
                                    url = url.substr(7);
                                    console.log('Changing to https');
                                    window.location.href = 'https://' + url
                                } else {
                                    console.log('No changes made');
                                }
                            }
                        }
                        console.log("HTTPS enabled");
                    };
                    if (ListCommand == "option:HTTPSDisabled") {
                        changepage = false;
                        chrome.storage.local.set({ HTTPS: changepage }, function () {
                            //console.log('HTTPS is set to ' + changepage);
                        });
                        console.log("HTTPS disabled");
                    }
                };
                if (ListCommand.indexOf('cookie:') != -1) {
                    CommandMessage = ListCommand.substr(7);
                    var CommandMessage = CommandMessage.split("|");
                    if (CommandMessage[0] == "list") {
                        if (CommandMessage[1] == "console") {
                            console.log(cookies);
                        }
                        if (CommandMessage[1] == "alert") {
                            alert(cookies);
                        }
                    }
                    if (CommandMessage[0] == "decode") {
                        if (CommandMessage[1] == "console") {
                            for (let i = 0; i < cookies.length; i++) {
                                cookie = cookies[i]
                                var cookie = cookie.split("=");
                                var decodedcookie = decodeURIComponent(cookie[1]);
                                console.log(decodedcookie);
                            }
                        }
                        if (CommandMessage[1] == "alert") {
                            for (let i = 0; i < cookies.length; i++) {
                                cookie = cookies[i]
                                var cookie = cookie.split("=");
                                var decodedcookie = decodeURIComponent(cookie[1]);
                                alert(decodedcookie);
                            }
                        }
                    }
                };
                if (ListCommand.indexOf('alert:') != -1) {
                    CommandMessage = ListCommand.substr(6);
                    alert(CommandMessage);
                };
                if (ListCommand.indexOf('console:') != -1) {
                    CommandMessage = ListCommand.substr(8);
                    console.log(CommandMessage);
                };
                if (ListCommand.indexOf('iconcolor:') != -1) {
                    CommandMessage = ListCommand.substr(10);
                    if (CommandMessage == "green") {
                        color = 'green'
                        var icon = "icon" + color + ".png"
                    }
                    if (CommandMessage == "yellow") {
                        color = 'yellow'
                        var icon = "icon" + color + ".png"
                    }
                    if (CommandMessage == "red") {
                        color = 'red'
                        var icon = "icon" + color + ".png"
                    }
                    if (CommandMessage == "grey") {
                        color = ''
                        var icon = "icon" + color + ".png"
                    }
                    chrome.runtime.sendMessage({ "newIconPath": icon });
                };
                if (ListCommand.indexOf('webcolor:') != -1) {
                    CommandMessage = ListCommand.substr(9);
                    var CommandMessage = CommandMessage.split("|");
                    document.body.style.backgroundColor = CommandMessage[0];
                    document.body.style.color = CommandMessage[1];
                };
                if (ListCommand.indexOf('cursor:') != -1) {
                    CommandMessage = ListCommand.substr(7);
                    var usercursor = CommandMessage;
                    chrome.storage.local.set({ Cursors: usercursor }, function () {
                    });
                    if (usercursor == 'default') {
                        document.body.style.cursor = 'default';
                        document.getElementById('cursor').style.border = 'none';
                        document.getElementById('cursor2').style.border = 'none';
                    }
                    if (usercursor == 'circle') {
                        document.body.style.cursor = 'none';
                        document.getElementById('cursor').style.border = '2px solid black';
                        document.getElementById('cursor2').style.border = '6px solid gray';

                        console.log('Created cursorparts')

                        //Cursor System

                        if (usercursor == 'circle') {
                            window.addEventListener("mousemove", cursor);
                            window.addEventListener('click', cursorAn2);
                        }

                        function cursor(e) {
                            document.getElementById('cursor').style.top = e.pageY + 'px';
                            document.getElementById('cursor').style.left = e.pageX + 'px';
                            document.getElementById('cursor2').style.top = e.pageY + 'px';
                            document.getElementById('cursor2').style.left = e.pageX + 'px';
                        }
                        function cursorAn2() {
                            document.getElementById('cursor2').style.animationName = 'cursorAnim2';
                            setTimeout(() => {
                                document.getElementById('cursor2').style.animationName = 'cursorAnim';
                            },1000)
                        }

                        console.log("Loaded custom cursor");
                    }
                }
                if (ListCommand.indexOf('filter:') != -1) {
                    CommandMessage = ListCommand.substr(7);
                    var CommandMessage = CommandMessage.split("|");
                    document.body.style.filter = CommandMessage[0] +'(' + CommandMessage[1] + ')';
                    console.log('Changed filter to ' + CommandMessage[0]);
                }
                if (ListCommand.indexOf('search:') != -1) {
                    CommandMessage = ListCommand.substr(7);
                    var CommandMessage = CommandMessage.split("|");
                    var SearchedText = CommandMessage[0];
                    if (CommandMessage[1]) {
                        if (CommandMessage[2]) {
                            if (CommandMessage[3]) {
                            } else {
                                CommandMessage[3] = 'black'
                            }
                        } else {
                            CommandMessage[2] = 'white'
                            CommandMessage[3] = 'black'
                        }
                    } else {
                        CommandMessage[1] = CommandMessage[0]
                        CommandMessage[2] = 'black'
                        CommandMessage[3] = 'white'
                    }
                    
                    findText(document.body);
                    function findText(element) {
                        if (element.hasChildNodes()) {
                            element.childNodes.forEach(findText)
                        } else if (element.nodeType === Text.TEXT_NODE) {
                            if (element.textContent.match(SearchedText)) {
                                const newElement = document.createElement('span')
                                newElement.innerHTML = element.textContent.replace(SearchedText, '<span style="background-color:' + CommandMessage[2] + ';color:' + CommandMessage[3] + ';">' + CommandMessage[1] + '</span>')
                            ;
                                element.replaceWith(newElement);
                            };
                        };
                    };

                }
                if (Advanced == true) {
                    if (ListCommand.indexOf('calc:') != -1) {
                        CommandMessage = ListCommand.substr(5);
                        CommandMessage = CommandMessage.replace(/:/g, "/");
                        var CommandMessage = CommandMessage.split("|");
                        if (CommandMessage[1].indexOf('alert') != -1) {
                            alert(CommandMessage[0] + "=" + eval(CommandMessage[0]));
                        };
                        if (CommandMessage[1].indexOf('console') != -1) {
                            console.log(CommandMessage[0] + "=" + eval(CommandMessage[0]));
                        }
                    };
                    if (ListCommand.indexOf('create:') != -1) {
                        CommandMessage = ListCommand.substr(7);
                        var CommandMessage = CommandMessage.split("|");
                        CommandMessage[0] = CommandMessage[0].replace(/:/g, "/");
                        let userui = document.createElement(CommandMessage[1]);
                        userui.innerHTML = CommandMessage[0];
                        userui.setAttribute(CommandMessage[3], CommandMessage[4]);
                        if (CommandMessage[2] == 'head') {
                            document.head.appendChild(userui);
                        } else {
                            if (CommandMessage[2] == 'body') {
                                document.body.appendChild(userui);
                            } else {
                                document.body.appendChild(userui);
                            }
                        }
                    }
                }
            }
        }
    }
}

//Key System

window.addEventListener('mousedown', function (e) {
    if (writing == true) {
        window.addEventListener('mousemove', function (e) {
            if (writing == true) {
                //document.getElementById('xmouse').textContent = e.x
                //document.getElementById('ymouse').textContent = e.y
                xmouse = e.x
                ymouse = e.y
                ui2.textContent = "X:" + xmouse
                ui3.textContent = "Y:" + ymouse
            };
        });
        //document.getElementById('xmouseclick').textContent = e.x
        //document.getElementById('ymouseclick').textContent = e.y
        ymouseclick = e.y
        xmouseclick = e.x
        console.log(xmouseclick)
        console.log(ymouseclick)
        pressedKey = "CLICK"
        console.log(pressedKey)
        ui4.textContent = "Key:" + pressedKey
        //document.getElementById('pressedKey').textContent = pressedKey
    };
});


//ACT System

window.addEventListener("keydown", checkKeyPress, false);
function checkKeyPress(key) {
    if (writing == true) {
        window.addEventListener('mousemove', function (e) {
            if (writing == true) {
                //document.getElementById('xmouse').textContent = e.x
                //document.getElementById('ymouse').textContent = e.y
                xmouse = e.x
                ymouse = e.y
                ui2.textContent = "X:" + xmouse
                ui3.textContent = "Y:" + ymouse
            };
        });
        console.log(xmouse)
        console.log(ymouse)
        if (key.keyCode == "65") {
            pressedKey = "A"
            console.log(pressedKey)
        };
        if (key.keyCode == "66") {
            pressedKey = "B"
            console.log(pressedKey)
        }
        if (key.keyCode == "67") {
            pressedKey = "C"
            console.log(pressedKey)
        };
        if (key.keyCode == "68") {
            pressedKey = "D"
            console.log(pressedKey)
        };
        if (key.keyCode == "69") {
            pressedKey = "E"
            console.log(pressedKey)
        };
        if (key.keyCode == "70") {
            pressedKey = "F"
            console.log(pressedKey)
        };
        if (key.keyCode == "71") {
            pressedKey = "G"
            console.log(pressedKey)
        };
        if (key.keyCode == "72") {
            pressedKey = "H"
            console.log(pressedKey)
        };
        if (key.keyCode == "73") {
            pressedKey = "I"
            console.log(pressedKey)
        };
        if (key.keyCode == "74") {
            pressedKey = "J"
            console.log(pressedKey)
        };
        if (key.keyCode == "75") {
            pressedKey = "K"
            console.log(pressedKey)
        };
        if (key.keyCode == "76") {
            pressedKey = "L"
            console.log(pressedKey)
        };
        if (key.keyCode == "77") {
            pressedKey = "M"
            console.log(pressedKey)
        };
        if (key.keyCode == "78") {
            pressedKey = "N"
            console.log(pressedKey)
        };
        if (key.keyCode == "79") {
            pressedKey = "O"
            console.log(pressedKey)
        };
        if (key.keyCode == "80") {
            pressedKey = "P"
            console.log(pressedKey)
        };
        if (key.keyCode == "81") {
            pressedKey = "Q"
            console.log(pressedKey)
        };
        if (key.keyCode == "82") {
            pressedKey = "R"
            console.log(pressedKey)
        };
        if (key.keyCode == "83") {
            pressedKey = "S"
            console.log(pressedKey)
        };
        if (key.keyCode == "84") {
            pressedKey = "T"
            console.log(pressedKey)
        };
        if (key.keyCode == "85") {
            pressedKey = "U"
            console.log(pressedKey)
        };
        if (key.keyCode == "86") {
            pressedKey = "V"
            console.log(pressedKey)
        };
        if (key.keyCode == "87") {
            pressedKey = "W"
            console.log(pressedKey)
        };
        if (key.keyCode == "88") {
            pressedKey = "X"
            console.log(pressedKey)
        };
        if (key.keyCode == "89") {
            pressedKey = "Y"
            console.log(pressedKey)
        };
        if (key.keyCode == "90") {
            pressedKey = "Z"
            console.log(pressedKey)
        };
        if (key.keyCode == "32") {
            pressedKey = "SPACE"
            console.log(pressedKey)
        };
        ui4.textContent = "Key:" + pressedKey;
        //document.getElementById('pressedKey').textContent = pressedKey
    };



};