/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';

    var csInterface = new CSInterface();
    
    
    function init() {
                
        themeManager.init();
        $("#btn_export").click(function () {
            csInterface.evalScript('createCSV()');
        });     
        $("#btn_import").click(function () {
            csInterface.evalScript('openFile()');
        });
        $("#btn_loka").click(function () {          
            csInterface.evalScript('doSomething()');
        });
        $("#btn_info").click(function () {          
            csInterface.evalScript('explain()');
        });
    }
        
    init();

}());
    
