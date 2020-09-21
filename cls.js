// ==UserScript==
// @name         CLS
// @namespace    http://nicj.net
// @version      1.0
// @description  Cumulative Layout Shift debugger
// @author       Nic Jansma (nic@nicj.net)
// @grant        none
// @match        *://*/*
// @run-at       document-start
// @noframes
// @downloadUrl  https://raw.githubusercontent.com/nicjansma/tampermonkey/master/cls.js
// @updateUrl    https://raw.githubusercontent.com/nicjansma/tampermonkey/master/cls.meta.js
// ==/UserScript==

(function() {
    "use strict";

    window.clsScore = 0;

    try {
        var po = new PerformanceObserver(function(list) {
            var entries = list.getEntries();
            for (var i = 0; i < entries.length; i++) {
                if (!entries[i].hadRecentInput) {
                    window.clsScore += entries[i].value;
                    console.error("CLS", entries[i]);
                }
            }
        });

        po.observe({ type: "layout-shift", buffered: true });
    } catch (e) {
        // not supported
    }
}());
