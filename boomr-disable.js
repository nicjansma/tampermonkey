// ==UserScript==
// @name         Boomerang Disable
// @namespace    http://nicj.net
// @version      1.0
// @description  Disables Boomerang
// @author       Nic Jansma (nic@nicj.net)
// @grant        none
// @match        *://*/*
// @run-at       document-start
// @noframes
// @downloadUrl  https://raw.githubusercontent.com/nicjansma/tampermonkey/master/boomr-disable.js
// @updateUrl    https://raw.githubusercontent.com/nicjansma/tampermonkey/master/boomr-disable.meta.js
// ==/UserScript==

// The mPulse snippet aborts if it detects BOOMR.version
window.BOOMR = { version: "disabled" };
