var ACT
var HTTPS
var usercursor

chrome.storage.local.get(['Cursors'], function (result) {
    usercursor = result.Cursors
    console.log('Value currently is ' + usercursor);

    if (usercursor) {
        if (usercursor == 'circle') {
            document.getElementById('Cursors').textContent = "Enabled"
        } else if (usercursor == 'default') {
            document.getElementById('Cursors').textContent = "Disabled"
        }
    } else {
        usercursor = 'default'

        document.getElementById('Cursors').textContent = "Disabled"
    }

    let params = {
        active: true,
        currentWindow: true
    }

    chrome.tabs.query(params, gotTabs);

    function gotTabs(tabs) {
        if (usercursor == 'default') {
            let message = "/cursor:default/; "
            chrome.tabs.sendMessage(tabs[0].id, message);
        };
        if (usercursor == 'circle') {
            let message = "/cursor:circle/;"
            chrome.tabs.sendMessage(tabs[0].id, message);
        }
    }
});

chrome.storage.local.get(['HTTPS'], function (result) {
    HTTPS = result.HTTPS
    console.log('Value currently is ' + HTTPS);

    if (HTTPS) {
        if (HTTPS == true) {
            document.getElementById('https').textContent = "Enabled"
        } else if (HTTPS == false) {
            document.getElementById('https').textContent = "Disabled"
        }
    } else {
        HTTPS = false

        document.getElementById('https').textContent = "Disabled"
    }

    let params = {
        active: true,
        currentWindow: true
    }

    chrome.tabs.query(params, gotTabs);

    function gotTabs(tabs) {
        if (HTTPS == false) {
            let message = "/option:HTTPSDisabled/;"
            chrome.tabs.sendMessage(tabs[0].id, message);
        };
        if (HTTPS == true) {
            let message = "/option:HTTPSEnabled/;"
            chrome.tabs.sendMessage(tabs[0].id, message);
        }
    }
});

chrome.storage.local.get(['ACT'], function (result) {
    ACT = result.ACT
    console.log('Value currently is ' + ACT);

    if (ACT) {
        if (ACT == true) {
            document.getElementById('F2').textContent = "Enabled"
        } else if (ACT == false) {
            document.getElementById('F2').textContent = "Disabled"
        }
    } else {
        ACT = false

        document.getElementById('F2').textContent = "Disabled"
    }

    let params = {
        active: true,
        currentWindow: true
    }

    chrome.tabs.query(params, gotTabs);

    function gotTabs(tabs) {
        if (ACT == false) {
            let message = "/option:ACTDisabled/;"
            chrome.tabs.sendMessage(tabs[0].id, message);
        };
        if (ACT == true) {
            let message = "/option:ACTEnabled/;"
            chrome.tabs.sendMessage(tabs[0].id, message);
        }
    }
});

console.log('Pop up started')

function setup() {
    noCanvas();
    let userinput = select('#userinput');
    userinput.input(changeText);

    function changeText() {
        let params = {
            active: true,
            currentWindow: true
        }
        chrome.tabs.query(params, gotTabs);

        function gotTabs(tabs) {
            let message = userinput.value();
            chrome.tabs.sendMessage(tabs[0].id, message);
        }
    }
}

document.getElementById('Cursors').onclick = function () {
    if (usercursor == 'default') {
        usercursor = 'circle'
        document.getElementById('Cursors').textContent = "Enabled"
        let params = {
            active: true,
            currentWindow: true
        }
        chrome.tabs.query(params, gotTabs);

        function gotTabs(tabs) {
            let message = "/cursor:circle/;"
            chrome.tabs.sendMessage(tabs[0].id, message);
        }
    } else if (usercursor == 'circle') {
        usercursor = 'default'
        document.getElementById('Cursors').textContent = "Disabled"
        let params = {
            active: true,
            currentWindow: true
        }
        chrome.tabs.query(params, gotTabs);

        function gotTabs(tabs) {
            let message = "/cursor:default/;"
            chrome.tabs.sendMessage(tabs[0].id, message);
        }
    }


};

document.getElementById('HTTPS').onclick = function () {
    if (HTTPS == false) {
        HTTPS = true
        document.getElementById('https').textContent = "Enabled"
        let params = {
            active: true,
            currentWindow: true
        }
        chrome.tabs.query(params, gotTabs);

        function gotTabs(tabs) {
            let message = "/option:HTTPSEnabled/;"
            chrome.tabs.sendMessage(tabs[0].id, message);
        }
    } else if (HTTPS == true) {
        HTTPS = false
        document.getElementById('https').textContent = "Disabled"
        let params = {
            active: true,
            currentWindow: true
        }
        chrome.tabs.query(params, gotTabs);

        function gotTabs(tabs) {
            let message = "/option:HTTPSDisabled/;"
            chrome.tabs.sendMessage(tabs[0].id, message);
        }
    }


};

document.getElementById('ACT').onclick = function () {
    console.log('Click: ' + ACT)
    LBL1: do {
        if (ACT == true) {
            ACT = false

            document.getElementById('F2').textContent = "Disabled"

            let params = {
                active: true,
                currentWindow: true
            }

            chrome.tabs.query(params, gotTabs);

            function gotTabs(tabs) {
                let message = "/option:ACTDisabled/;"
                chrome.tabs.sendMessage(tabs[0].id, message);
            }
            break LBL1
        }
        if (ACT == false) {
            ACT = true

            document.getElementById('F2').textContent = "Enabled"

            let params = {
                active: true,
                currentWindow: true
            }

            chrome.tabs.query(params, gotTabs);

            function gotTabs(tabs) {
                let message = "/option:ACTEnabled/;"
                chrome.tabs.sendMessage(tabs[0].id, message);
            }
            break LBL1
        }
    } while (0)
}


//Merken!

//chrome.browserAction.onClicked.addListener(buttonClicked);

//function buttonClicked(tab) {
   // console.log('ok')

   // let msg = {
   //     txt: "hello"
   // }
   // chrome.tabs.sendMessage(tab.id, msg);
//}