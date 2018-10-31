// ==UserScript==
// @name         Boomerang Duplicate t_other
// @namespace    http://nicj.net
// @version      1.0
// @description  Copies t_other timers to their own timer_ parameter
// @author       Nic Jansma (nic@nicj.net)
// @grant        none
// @match        *://*/*
// @run-at       document-start
// @noframes
// @downloadUrl  https://raw.githubusercontent.com/nicjansma/tampermonkey/master/boomr-duplicate-tother.js
// @updateUrl    https://raw.githubusercontent.com/nicjansma/tampermonkey/master/boomr-duplicate-tother.meta.js
// ==/UserScript==

/**
 * The `DuplicateTimersToBeacon` Boomerang plugin duplicates any mPulse Custom Timers
 * that are logged in the beacon's `t_other` parameter into distinct beacon parameters.
 *
 * e.g:
 *
 *     t_other=boomerang|17,boomr_fb|2516,boomr_ld|2351,boomr_lat|165,custom5|2112,custom0|27
 *
 * Will add two more beacon parameters:
 *
 *     timer_custom5=2112
 *     timer_custom0=27
*/
(function(w) {
    "use strict";

    if (!w) {
        return;
    }

    w.BOOMR = w.BOOMR || {};
    w.BOOMR.plugins = w.BOOMR.plugins || {};

    w.BOOMR.plugins.DuplicateTimersToBeacon = {
        varsAdded: [],

        onBeforeBeacon: function(beaconData) {
            var tOther = beaconData ? beaconData.t_other : false;

            if (tOther) {
                var tOthers = tOther.split(",");

                for (var i = 0; i < tOthers.length; i++) {
                    var nameValue = tOthers[i].split("|");

                    if (nameValue[0].indexOf("custom") === 0) {
                        beaconData["timer_" + nameValue[0]] = nameValue[1];
                        this.varsAdded.push("timer_" + nameValue[0]);
                    }
                }
            }
        },

        init: function() {
            w.BOOMR.subscribe("before_beacon", this.onBeforeBeacon, {}, this);
            w.BOOMR.subscribe("before_custom_beacon", this.onBeforeBeacon, {}, this);

            // remove vars after each beacon
            w.BOOMR.subscribe("beacon", function() {
                w.BOOMR.removeVar(this.varsAdded);
                this.varsAdded = [];
            }, {}, this);
        },

        /* eslint-disable camelcase */
        is_complete: function() {
            return true;
        }
    };
}(window));
