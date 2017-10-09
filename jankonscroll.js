// ==UserScript==
// @name         JankOnScroll
// @version      1.0
// @description  Causes jank on scroll (wheel event)
// @author       Nic Jansma (nic@nicj.net)
// @grant        none
// @match        */*
// @run-at       document-start
// @downloadUrl  https://raw.githubusercontent.com/nicjansma/tampermonkey/master/jankonscroll.js
// @updateUrl    https://raw.githubusercontent.com/nicjansma/tampermonkey/master/jankonscroll.meta.js
// ==/UserScript==

(function() {
    var DELAY = 100;

    console.log("JankOnScroll: Initializing");

    function delay() {
        var start = Date.now();
        while(Date.now() < start + DELAY) {
            // NOP
        }
    }

    document.addEventListener("wheel", delay);
    document.addEventListener("scroll", delay);
})();
