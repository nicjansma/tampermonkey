// ==UserScript==
// @name         mPulse Boomerang Sync
// @version      1.2
// @description  Injects mPulse's Boomerang onto a page synchronously (not recommended!)
//               - can be useful for debugging if boomerang is loading slowly
// @author       Nic Jansma (nic@nicj.net)
// @grant        none
// @match        *
// @run-at       document-start
// @downloadUrl  https://raw.githubusercontent.com/nicjansma/tampermonkey/master/mpulse-boomerang-sync.js
// @updateUrl    https://raw.githubusercontent.com/nicjansma/tampermonkey/master/mpulse-boomerang-sync.meta.js
// ==/UserScript==

/* eslint-disable camelcase, no-script-url, no-underscore-dangle, no-undef */
(function() {
    "use strict";

    // only run in top frame)
    if (window.self !== window.top) {
        return;
    }

    //
    // Configuration
    //

    // mPulse API key
    window.BOOMR_API_key = "";

    // Boomerang config
    window.BOOMR_config = {};

    // skip if no API key is set
    if (!window.BOOMR_API_key || window.BOOMR_API_key.length === 0) {
        return;
    }

    // skip if already loaded
    if (window.BOOMR && window.BOOMR.version) {
        return;
    }

    var js = document.createElement("script");
    js.src = "//c.go-mpulse.net/boomerang/" + window.BOOMR_API_key;
    window.BOOMR_lstart = new Date().getTime();
    document.head.appendChild(js);
}());
