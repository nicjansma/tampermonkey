// ==UserScript==
// @name         Interaction Delay
// @namespace    http://nicj.net
// @version      1.0
// @description  Measures interaction (click, scroll, keyboard) delays and logs associated long tasks
// @author       Nic Jansma (nic@nicj.net)
// @grant        none
// @match        *://*/*
// @run-at       document-start
// @noframes
// @downloadUrl  https://raw.githubusercontent.com/nicjansma/tampermonkey/master/interaction-delay.js
// @updateUrl    https://raw.githubusercontent.com/nicjansma/tampermonkey/master/interaction-delay.meta.js
// ==/UserScript==
/* global $ */
(function() {
    "use strict";

    var ret = {};

    $("*").each(function() {
        var str = $(this).css("font-family");

        str = str + ":" + $(this).css("font-weight");
        str = str + ":" + $(this).css("font-style");

        if (ret[str]) {
            ret[str] = ret[str] + 1;
        } else {
            ret[str] = 1;
        }
    });

    console.log(ret);
}());
