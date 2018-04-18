// ==UserScript==
// @name         Boomerang PCI Compliance check
// @namespace    http://nicj.net
// @version      1.1
// @description  Validates that a mPulse is suitable for Boomerang => 1.486.0
// @author       Nic Jansma (nic@nicj.net)
// @grant        none
// @match        */*
// @run-at       document-idle
// @downloadUrl  https://raw.githubusercontent.com/nicjansma/tampermonkey/master/boomr-pci-compliance.js
// @updateUrl    https://raw.githubusercontent.com/nicjansma/tampermonkey/master/boomr-pci-compliance.meta.js
// ==/UserScript==

(function(w) {
    "use strict";

    w.getBoomerangApiKey = function() {
        var apiKey = "";

        //
        // Determine the Boomerang URL from the IFRAME, if possible
        //
        var boomerangUrl = "";

        var tags = document.getElementsByTagName("iframe");
        for (var i = 0; i < tags.length; i++) {
            try {
                if (tags[i] &&
                    tags[i].contentWindow &&
                    tags[i].contentWindow.document) {
                    var scriptTag = tags[i].contentWindow.document.getElementById("boomr-if-as");
                    if (scriptTag &&
                        scriptTag.nodeName.toLowerCase() === "script" &&
                        scriptTag.src) {
                        boomerangUrl = scriptTag.src;
                        break;
                    }
                }
            } catch (e) {
                // NOP
            }
        }

        // get the API key from a global BOOMR_API_key or the script loader URL
        if (w && w.BOOMR_API_key) {
            apiKey = w.BOOMR_API_key;
        } else if (boomerangUrl && boomerangUrl.lastIndexOf("/") !== -1) {
            apiKey = boomerangUrl.substr(boomerangUrl.lastIndexOf("/") + 1);
        }

        console.log("\u{1F319} Boomerang PCI compliance:", w.BOOMR.version, apiKey);

        if (!apiKey) {
            console.error(
                "\u{1F319} Boomerang PCI compliance: Could not determine API key!",
                "Not compatible with Boomerang >= 1.486",
                "\u274C");
        } else {
            console.log(
                "\u{1F319} Boomerang PCI compliance: OK!", "\u2705");
        }
    };

    if (!w || !w.BOOMR || !w.BOOMR.version) {
        // Modern browsers
        w.document.addEventListener("onBoomerangLoaded", w.getBoomerangApiKey);
    } else {
        // already loaded, check now
        w.getBoomerangApiKey();
    }

}(window));
