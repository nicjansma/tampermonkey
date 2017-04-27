// ==UserScript==
// @name         LongTasks
// @version      1.0
// @description  Logs LongTasks to the console
// @author       Nic Jansma (nic@nicj.net)
// @grant        none
// @match        */*
// @run-at       document-start
// ==/UserScript==

(function() {
    console.log("LongTasks: Initializing");

    var observer = new PerformanceObserver(function(list) {
        var perfEntries = list.getEntries();
        for (var i = 0; i < perfEntries.length; i++) {
            console.log("LongTasks: ",
                        perfEntries[i].name,
                        perfEntries[i].duration,
                        perfEntries[i].attribution.length,
                        perfEntries[i].attribution[0].containerType,
                        perfEntries[i].attribution[0].containerName,
                        perfEntries[i].attribution[0].containerSrc,
                        perfEntries[i].attribution[0].containerId,
                        perfEntries[i]);
        }
    });

    try {
        observer.observe({entryTypes: ["longtask"]});
    } catch (e) {
        console.log("LongTasks: Not supported");
    }
})();
