// ==UserScript==
// @name         mPulse Boomerang
// @version      1.0
// @description  Injects mPulse's Boomerang onto a page
// @author       Nic Jansma (nic@nicj.net)
// @grant        none
// @match        */*
// @run-at       document-start
// @downloadUrl  https://raw.githubusercontent.com/nicjansma/tampermonkey/master/mpulse-boomerang.js
// @updateUrl    https://raw.githubusercontent.com/nicjansma/tampermonkey/master/mpulse-boomerang.meta.js
// ==/UserScript==

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
    var API_KEY = "";

    // Boomerang config
    window.BOOMR_config = {};

    // skip if no API key is set
    if (!API_KEY || API_KEY.length === 0) {
        return;
    }

    // skip if already loaded
    if (window.BOOMR && window.BOOMR.version) {
        return;
    }

    var dom, doc, where, iframe = document.createElement("iframe"), win = window;

    function boomerangSaveLoadTime(e) {
        win.BOOMR_onload = (e && e.timeStamp) || new Date().getTime();
    }

    if (win.addEventListener) {
        win.addEventListener("load", boomerangSaveLoadTime, false);
    } else if (win.attachEvent) {
        win.attachEvent("onload", boomerangSaveLoadTime);
    }

    iframe.src = "javascript:void(0)";
    iframe.title = ""; iframe.role = "presentation";
    (iframe.frameElement || iframe).style.cssText = "width:0;height:0;border:0;display:none;";
    where = document.getElementsByTagName("script")[0];
    where.parentNode.insertBefore(iframe, where);

    try {
        doc = iframe.contentWindow.document;
    } catch (e) {
        dom = document.domain;
        iframe.src = "javascript:var d=document.open();d.domain='" + dom + "';void(0);";
        doc = iframe.contentWindow.document;
    }

    doc.open()._l = function() {
        var js = this.createElement("script");
        if (dom) {
            this.domain = dom;
        }
        js.id = "boomr-if-as";
        js.src = "//c.go-mpulse.net/boomerang/" + API_KEY;
        BOOMR_lstart = new Date().getTime();
        this.body.appendChild(js);
    };

    doc.write('<body onload="document._l();">');
    doc.close();
}());
