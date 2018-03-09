// ==UserScript==
// @name         ResourceTiming2 transferSize
// @namespace    http://nicj.net
// @version      1.0
// @description  Overrides Boomerang config
// @author       Nic Jansma (nic@nicj.net)
// @grant        none
// @match        *
// @run-at       document-idle
// @downloadUrl  https://raw.githubusercontent.com/nicjansma/tampermonkey/master/resourcetiming2-transfersize.js
// @updateUrl    https://raw.githubusercontent.com/nicjansma/tampermonkey/master/resourcetiming2-transfersize.meta.js
// ==/UserScript==
(function() {
    "use strict";

    if (typeof performance.setResourceTimingBufferSize === "function") {
        performance.setResourceTimingBufferSize(9999);
    }

    // only run in top frame)
    if (window.self !== window.top) {
        return;
    }

    /**
     * Finds the sum of the ResourceTiming2 transferSizes
     *
     * @param {Window} frame Window
     * @param {boolean} isTopWindow Whether this is the top window or not
     * @param {number} depth Frame depth
     *
     * @returns {number} Sum of sizes of this frame and all sub-frames
     */
    function findResourceTimingTransferSize(frame, isTopWindow, depth) {
        var size = 0, i, navEntries, subFrames,
            navEntry, t;

        if (typeof isTopWindow === "undefined") {
            isTopWindow = true;
        }

        if (typeof depth === "undefined") {
            depth = 0;
        }

        if (depth > 10) {
            return size;
        }

        try {
            if (!isFrameAccessible(frame)) {
                return size;
            }

            subFrames = frame.document.getElementsByTagName("iframe");

            // get sub-frames' entries first
            if (subFrames && subFrames.length) {
                for (i = 0; i < subFrames.length; i++) {
                    size += findResourceTimingTransferSize(subFrames[i].contentWindow, false, depth + 1);
                }
            }

            if (typeof frame.performance.getEntriesByType !== "function") {
                return size;
            }

            // add an entry for the top page
            if (isTopWindow) {
                navEntries = frame.performance.getEntriesByType("navigation");
                if (navEntries && navEntries.length === 1) {
                    navEntry = navEntries[0];

                    if (navEntry.transferSize) {
                        size += navEntry.transferSize;
                    }
                }
            }

            // offset all of the entries by the specified offset for this frame
            var frameEntries = frame.performance.getEntriesByType("resource");

            for (i = 0; frameEntries && i < frameEntries.length; i++) {
                t = frameEntries[i];
                if (t.transferSize) {
                    size += t.transferSize;
                }
            }
        } catch (e) {
            return size;
        }

        return size;
    }

    /**
     * Checks if the current execution context can access the specified frame.
     *
     * Note: In Safari, this will still produce a console error message, even
     * though the exception is caught.

     * @param {Window} frame The frame to check if access can haz
     *
     * @returns {boolean} true if true, false otherwise
     */
    function isFrameAccessible(frame) {
        /* eslint-disable no-unused-vars */
        var dummy;
        /* eslint-enable no-unused-vars */

        try {
            // Try to access location.href first to trigger any Cross-Origin
            // warnings.  There's also a bug in Chrome ~48 that might cause
            // the browser to crash if accessing X-O frame.performance.
            // https://code.google.com/p/chromium/issues/detail?id=585871
            // This variable is not otherwise used.
            dummy = frame.location && frame.location.href;

            // Try to access frame.document to trigger X-O exceptions with that
            dummy = frame.document;

            if (("performance" in frame) && frame.performance) {
                return true;
            }
        } catch (e) {
            // empty
        }

        return false;
    }

    window.checkTransferSize = function() {
        console.log("transferSize: " + findResourceTimingTransferSize(window));
    };

    window.checkTransferSize();
}());
