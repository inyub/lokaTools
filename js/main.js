/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';

    var csInterface = new CSInterface();
    
    var rootDir = "/";
    var isWindows = window.navigator.platform.toLowerCase().indexOf("win") > -1;

    if (isWindows) {
                        rootDir = csInterface.getSystemPath(SystemPath.COMMON_FILES).substring(0, 3);
    }

    var processPath = "/usr/bin/open";
      if (isWindows) {
        processPath = rootDir + "Windows/explorer.exe";
    }
    
    function init() {
        
        themeManager.init();
        
        // Flyout menu XML string 
		var flyoutXML = '<Menu> \
							<MenuItem Id="enabledMenuItem" Label="How to" Enabled="true" Checked="false"/> \
							\
							<MenuItem Label="---" /> \
							\
							<MenuItem Label="Parent Menu (wont work on PS CC 2014.2.0)"> \
								<MenuItem Label="Child Menu 1"/> \
								<MenuItem Label="Child Menu 2"/> \
							</MenuItem> \
						</Menu>';

		// Uses the XML string to build the menu
		csInterface.setPanelFlyoutMenu(flyoutXML);
        
        // Flyout Menu Click Callback
		function flyoutMenuClickedHandler (event) {
            //csInterface.evalScript("alert('Clicked!\\n \"" + event.data.menuName + "\"');");
            
            var url = "https://docs.google.com/a/h2-investments.com/presentation/d/1EzzfFFO4woWr1XVUzgds7BEClz1IAuWlBspbCN7SfNU/edit?usp=sharing";
            window.cep.process.createProcess(processPath, url);
        }
        // Listen for the Flyout menu clicks
		csInterface.addEventListener("com.adobe.csxs.events.flyoutMenuClicked", flyoutMenuClickedHandler);
        
        
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
    
