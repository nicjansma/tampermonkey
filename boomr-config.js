// ==UserScript==
// @name         Boomerang BOOMR_config
// @namespace    http://nicj.net
// @version      1.0
// @description  Overrides Boomerang config
// @author       Nic Jansma (nic@nicj.net)
// @grant        none
// @match        *
// @run-at       document-start
// @downloadUrl  https://raw.githubusercontent.com/nicjansma/tampermonkey/master/boomr-config.js
// @updateUrl    https://raw.githubusercontent.com/nicjansma/tampermonkey/master/boomr-config.meta.js
// ==/UserScript==

/* eslint-disable camelcase */
window.BOOMR_config = {
    /*
    Continuity: {
        enabled: true,
        waitAfterOnload: 5000
    }
    */

    /*
    instrument_xhr: false,
    SPA: {
        routeFilter: function(e) {
            return true;
        }
    }
    */

    /*
    instrument_xhr: true,
    PageParams: {
        xhr: "all"
    }
    */

    /*
    AutoXHR: {
        alwaysSendXhr: true
    }
    */
};
