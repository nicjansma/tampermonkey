// ==UserScript==
// @name         PaintTiming
// @namespace    http://nicj.net
// @version      1.0
// @description  Logs PaintTiming to the console
// @author       Nic Jansma (nic@nicj.net)
// @grant        none
// @match        *
// @run-at       document-start
// @downloadUrl  https://raw.githubusercontent.com/nicjansma/tampermonkey/master/painttiming.js
// @updateUrl    https://raw.githubusercontent.com/nicjansma/tampermonkey/master/painttiming.meta.js
// ==/UserScript==

(function() {
    "use strict";

    // only run in top frame
    if (window.self !== window.top) {
        return;
    }

    console.log("PaintTiming: Initializing");

    var observer = new window.PerformanceObserver(function(list) {
        var perfEntries = list.getEntries();

        for (var i = 0; i < perfEntries.length; i++) {
            console.log("PaintTiming: ",
                perfEntries[i].name,
                perfEntries[i].startTime);
        }
    });

    if (typeof window.PerformancePaintTiming !== "undefined") {
        console.log("PaintTiming: Appears to be supported");
    } else {
        console.log("PaintTiming: Not supported");
        return;
    }

    try {
        observer.observe({ entryTypes: ["paint"], buffered: true });
    } catch (e) {
        console.log("PaintTiming: Not supported");
    }
}());
