// ==UserScript==
// @name         LongTasks
// @version      1.1
// @description  Logs LongTasks to the console
// @author       Nic Jansma (nic@nicj.net)
// @grant        none
// @match        */*
// @run-at       document-start
// @downloadUrl  https://raw.githubusercontent.com/nicjansma/tampermonkey/master/longtasks.js
// @updateUrl    https://raw.githubusercontent.com/nicjansma/tampermonkey/master/longtasks.meta.js
// ==/UserScript==

(function() {
    // only run in top frame
    if (window.self !== window.top) {
        return;
    }

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

    if (typeof window.PerformanceLongTaskTiming !== "undefined") {
        console.log("LongTasks: Appears to be supported");
    } else {
        console.log("LongTasks: Not supported");
    }

    try {
        observer.observe({entryTypes: ["longtask"]});
    } catch (e) {
        console.log("LongTasks: Not supported");
    }
})();
