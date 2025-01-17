const manifest = chrome.runtime.getManifest();

function installContentScript() {
  // iterate over all content_script definitions from manifest
  // and install all their js files to the corresponding hosts.
  let contentScripts = manifest.content_scripts;
  for (let i = 0; i < contentScripts.length; i++) {
    let contScript = contentScripts[i];
    chrome.tabs.query({ url: contScript.matches }, function(foundTabs) {
      for (let j = 0; j < foundTabs.length; j++) {
        let javaScripts = contScript.js;
        for (let k = 0; k < javaScripts.length; k++) {
          chrome.tabs.executeScript(foundTabs[j].id, {
            file: javaScripts[k]
          });          
        }
      }
    });
  }
}

chrome.runtime.onInstalled.addListener(installContentScript);


chrome.runtime.onInstalled.addListener(function(details) {
	if (details.reason == "install") {
			// Set commands on install
			chrome.storage.sync.get(['commands'], function(result) {
				console.log(result);
					if (typeof result.commands === "undefined") {
							chrome.storage.sync.set({
									"commands": [{
											id: 0,
											name: "/draw",
											label: "Make a drawing",
											description: "Add an annotation to the page.",
											image: chrome.runtime.getURL("assets/thingything.svg"),
											content: "",
											type: "script",
											visibility: "Visible"
									}, {
											id: 1,
											name: "/record",
											label: "Make a recording",
											description: "Create a video or audio recording.",
											image: chrome.runtime.getURL("assets/draw.png"),
											content: "",
											type: "script",
											visibility: "Visible"
									}]
							});
					}
			});
			chrome.storage.sync.get(['idnum'], function(result) {
					if (typeof result.idnum === "undefined") {
							chrome.storage.sync.set({
									"idnum": 2
							});
					}
			});
			chrome.tabs.create({ url: "https://slashy.notion.site/slashy/Get-started-with-Slashy-498ef2b3b5724e5dbb20c7da643d0618" });
	} else if (details.reason == "update") {
			// Set commands on update
			chrome.storage.sync.get(['commands'], function(result) {
					if (typeof result.commands === "undefined") {
							chrome.storage.sync.set({
									"commands": [{
											id: 0,
											name: "/draw",
											label: "Make a drawing",
											description: "Add an annotation to the page.",
											image: chrome.runtime.getURL("assets/thingything.svg"),
											content: "",
											type: "script",
											visibility: "Visible"
									}, {
											id: 1,
											name: "/record",
											label: "Make a recording",
											description: "Create a video or audio recording.",
											image: chrome.runtime.getURL("assets/draw.png"),
											content: "",
											type: "script",
											visibility: "Visible"
									}]
							});
					}
			});
			chrome.storage.sync.get(['idnum'], function(result) {
					if (typeof result.idnum === "undefined") {
							chrome.storage.sync.set({
									"idnum": 2
							});
					}
			});
	}
});
