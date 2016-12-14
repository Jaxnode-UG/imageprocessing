/*
 * David Fekke <david@fekke.com>
 * 
 * This code is based on the Adobe Generator Starter plugin and is provided as is.
 * This was used in the JaxNode image processing presentation for January 2017
 * 
 * This code is provided under the Apache-2.0 license
 */

(function () {
    "use strict";

    var PLUGIN_ID = require("./package.json").name,
        MENU_ID = "makelayerfrompath1",
        MENU_LABEL = "$$$/JavaScripts/Generator/Make Layer From Path 1/Menu=Make Layer From Path 1";
    
    var _generator = null,
        _currentDocumentId = null,
        _config = null;
    
    // Using Adobe ExtendScript to create a new layer from a path named 'Path 1'
    const makeNewLayerFromPath1 = `if (app.documents.length > 0) {
        var docRef = app.activeDocument;
        var n = docRef.pathItems.length;
            if((n>0)&&(docRef.pathItems[0].name=="Path 1" ))  {
                docRef.pathItems[0].makeSelection();
                docRef.selection.copy();
                var coolLayer = docRef.artLayers.add();
                coolLayer.name = "My Layer";
                docRef.paste();
            }
        }`;

    /*********** INIT ***********/

    function init(generator, config) {
        _generator = generator;
        _config = config;

        console.log("initializing generator getting started tutorial with config %j", _config);
        
        _generator.addMenuItem(MENU_ID, MENU_LABEL, true, false).then(
            function () {
                console.log("Menu created", MENU_ID);
            }, function () {
                console.error("Menu creation failed", MENU_ID);
            }
        );
        _generator.onPhotoshopEvent("generatorMenuChanged", handleGeneratorMenuClicked);

        function initLater() {
            // Flip foreground color
            
            //sendJavascript(makeNewLayerFromPath1);

            _generator.onPhotoshopEvent("currentDocumentChanged", handleCurrentDocumentChanged);
            _generator.onPhotoshopEvent("imageChanged", handleImageChanged);
            _generator.onPhotoshopEvent("toolChanged", handleToolChanged);
            requestEntireDocument();
            
        }
        
        process.nextTick(initLater);



    }

    /*********** EVENTS ***********/

    function handleCurrentDocumentChanged(id) {
        console.log("handleCurrentDocumentChanged: "+id)
        setCurrentDocumentId(id);
    }

    function handleImageChanged(document) {
        console.log("Image " + document.id + " was changed:");//, stringify(document));
    }

    function handleToolChanged(document){
        console.log("Tool changed " + document.id + " was changed:");//, stringify(document));
    }

    function handleGeneratorMenuClicked(event) {
        // Ignore changes to other menus
        var menu = event.generatorMenuChanged;
        if (!menu || menu.name !== MENU_ID) {
            return;
        }

        sendJavascript(makeNewLayerFromPath1);

        var startingMenuState = _generator.getMenuState(menu.name);
        console.log("Menu event %s, starting state %s", stringify(event), stringify(startingMenuState));
    }

    /*********** CALLS ***********/

    function requestEntireDocument(documentId) {
        if (!documentId) {
            console.log("Determining the current document ID");
        }
        
        _generator.getDocumentInfo(documentId).then(
            function (document) {
                console.log("Received complete document:", stringify(document));
            },
            function (err) {
                console.error("[Tutorial] Error in getDocumentInfo:", err);
            }
        ).done();
    }

    function updateMenuState(enabled) {
        console.log("Setting menu state to", enabled);
        _generator.toggleMenu(MENU_ID, true, enabled);
    }

    /*********** HELPERS ***********/


    function sendJavascript(str){
        _generator.evaluateJSXString(str).then(
            function(result){
                console.log(result);
            },
            function(err){
                console.log(err);
            });
    }

    function setCurrentDocumentId(id) {
        if (_currentDocumentId === id) {
            return;
        }
        console.log("Current document ID:", id);
        _currentDocumentId = id;
    }

    function stringify(object) {
        try {
            return JSON.stringify(object, null, "    ");
        } catch (e) {
            console.error(e);
        }
        return String(object);
    }

    exports.init = init;

    // Unit test function exports
    exports._setConfig = function (config) { _config = config; };
    
}());