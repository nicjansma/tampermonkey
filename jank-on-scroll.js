// ==UserScript==
// @name         Jank on Scroll
// @namespace    http://nicj.net
// @version      1.0
// @description  Causes jank on scroll (wheel event)
// @author       Nic Jansma (nic@nicj.net)
// @grant        none
// @match        *
// @run-at       document-start
// @downloadUrl  https://raw.githubusercontent.com/nicjansma/tampermonkey/master/jank-on-scroll.js
// @updateUrl    https://raw.githubusercontent.com/nicjansma/tampermonkey/master/jank-on-scroll.meta.js
// ==/UserScript==

(function() {
    "use strict";

    var DELAY = 100;

    console.log("JankOnScroll: Initializing");

    function delay() {
        var start = Date.now();
        while (Date.now() < start + DELAY) {
            // NOP
        }
    }

    document.addEventListener("wheel", delay);
    document.addEventListener("scroll", delay);
}());
