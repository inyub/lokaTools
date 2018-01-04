/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/


#target Photoshop
#target estoolkit
var savePath = activeDocument.path;
var savePostfix;
var dynFolderName;
var giveFileName;
var doubleSize ="@2x";
var quadSize = "@4x";



function runScript(){
    //alert(savePath);
    var dialogMain = new Window("dialog", "Loka Exporter");
        dialogMain.alignChildren = "left";
        //var titleMain = dialogMain.add('StaticText {text:"Export Settings", characters: 20, justify: "center"}');
        //titleMain.graphics.font = "dialog: 14";

        // Hier wird der Export Name generiert
        var exportName = dialogMain.add("group");
            exportName.add("StaticText", undefined,  "&Enter Name:");
            var nameDropdown = exportName.add("dropdownlist", undefined, ["background", "teaser-2100x637", "teaser-1400x650", "-", ""]);
            nameDropdown.selection = 0;
            giveFileName = exportName.add("edittext", undefined, "", "custom");
            giveFileName.shortcutKey ="e";
            giveFileName.characters = 10;
            var exportPostfixDemo = exportName.add("StaticText", undefined, "-xx.");
            var radioPNG = exportName.add("radiobutton", undefined, "&PNG");
            radioPNG.shortcutKey = "p";
            var radioSuperPNG = exportName.add("radiobutton", undefined, "&PNG-8");
            //radioJPG.shortcutKey = "s";
            var radioJPG = exportName.add("radiobutton", undefined, "&JPG");
            radioJPG.shortcutKey = "j";
            
                radioPNG.value = true;

        var exportBackground = dialogMain.add("group");
        exportBackground.alignChildren = "left";
        exportBackground.add("StaticText", undefined, "&Background Folder Name");
        var staticFolderName = exportBackground.add("EditText", undefined, "HG");
        staticFolderName.shortcutKey ="b";
    
        var includeHG = exportBackground.add("checkbox", undefined, "",)
        includeHG.value = true;
    
        var exportFolder = dialogMain.add("group");
        exportFolder.add("StaticText", undefined, "&Localized Folder Name     ");
        dynFolderName = exportFolder.add("EditText", undefined, "CS,DE,EN,ES,FR,IT,NL,PL,RU,TR");
        dynFolderName.shortcutKey = "l"; //wie L
        var exportPostfix = dialogMain.add("group");
        exportPostfix.add("StaticText", undefined, "Export Loca Post&fix         ");
        var dynExportName = exportPostfix.add("EditText", undefined, "-cS,-de,-en,-es,-fr,-it,-nl,-pl,-ru,-tr");
        dynExportName.shortcutKey = "f"; 
         var describ = dialogMain.add('StaticText {text:"                                             List Folder Name and Postfix without Comma", characters: 20, justify: "center"}');
        describ.graphics.font = "dialog: 9";
    
        dialogMain.add("panel", [0,25,530,23]);
    
        var saveLocationInfo = dialogMain.add("group");

        var btnSelectFolder = saveLocationInfo.add("button", undefined, "Select Folder");
        btnSelectFolder.graphics.font = "dialog: 9";
        btnSelectFolder.onClick = function () {
            var f = Folder.selectDialog("Select Folder", undefined, true);
            savePath = f;
            //alert(savePath);
            saveLocaText.text = savePath;
            this.window.layout.layout(true);
        } 
        
        var btnResetSave = saveLocationInfo.add("button", undefined, "Reset");
            btnResetSave.onClick = function() {
            var f = activeDocument.path;
            savePath = f;
            //alert(savePath);
            saveLocaText.text = savePath;
            this.window.layout.layout(true);
        }
    
        var btnFolder = saveLocationInfo.add("button", undefined,"Open");
        btnFolder.graphics.font = "dialog: 9";
        btnFolder.onClick = function () {
            savePath.execute();
        }
        var saveLocaText = saveLocationInfo.add("StaticText", undefined, savePath);
        saveLocaText.graphics.font = "dialog: 9";
    

    
        dialogMain.add("panel", [0,25,530,23]);

        // Hier sind Settings wie Tontrennung und JPG Qualität
        var settingTontrennung = dialogMain.add("group");
        var checkTontrennung = settingTontrennung.add("checkbox", undefined, "&Tontrennung");
        var value = settingTontrennung.add('edittext{text: 50, characters: 3, justify:"center", active: true}');
        value.shortcutKey = "t";
        var slider = settingTontrennung.add('slider{minvalue: 0, maxvalue: 255, value: 50}');

        checkTontrennung.value = true;
        var check = checkTontrennung.value;
        var setting = value.text;
        slider.onChanging = function () {
            value.text = slider.value
        }
        value.onChanging = function () {
            slider.value = Number(value.text)
        }

        var settingQuality = dialogMain.add('group{orientation:"row", justify:"left"}');
        settingQuality.add('statictext {text:" JPG Only Quality", characters: 25, justify: "left"}');
        var valueQ = settingQuality.add('edittext{text: 50, characters: 3, justify:"center", active: true}');
        var sliderQ = settingQuality.add('slider{minvalue: 0, maxvalue: 200, value: 100}');

         sliderQ.onChanging = function () {
            valueQ.text = sliderQ.value/2;
        }
        valueQ.onChanging = function () {
            sliderQ.value = Number(valueQ.text)*2;
        }

        dialogMain.add ("panel", [0,25,530,23]);

        var miscGroup = dialogMain.add("group");
        var checkCrop = miscGroup.add("checkbox", undefined, "Crop Image");
        checkCrop.value = false;
        var checkMobilScale = miscGroup.add("checkbox", undefined, "3 Sizes (@4x, @2x, 'none')");
        checkMobilScale.value = false;

        dialogMain.add ("panel", [0,25,530,23]);

        var buttonGroup = dialogMain.add("group", undefined, "center");
        buttonGroup.add("StaticText", undefined, "                                                          ");
        var convert_button = buttonGroup.add("button", undefined, "Export");
        var close_button = buttonGroup.add("button", undefined, "Cancel");

        convert_button.onClick = function () {
            // Speichert die Eingaben für den nächsten Start
            var desc1 = new ActionDescriptor();  
            desc1.putString(0, dynFolderName.text);  
            app.putCustomOptions("9b604d88-b4d6-4f08-8eb9-e3ea0e61e45c", desc1, true);  
            var desc2 = new ActionDescriptor();  
            desc2.putString(0, dynExportName.text);  
            app.putCustomOptions("36132d7e-520e-4bd4-9a43-2bdbfea6ee8e", desc2, true);  

            dynFolderName = dynFolderName.text.split(",");
            savePostfix = dynExportName.text.split(",");
            //Hier werden die Funktionen für den Export aufgerufen
            for (i=0; i<dynFolderName.length; i++) {
                folderToImg(includeHG);
                saveImg();
            }
             dialogMain.close();
            };

    try {  
        var desc1 = app.getCustomOptions("9b604d88-b4d6-4f08-8eb9-e3ea0e61e45c");  
        dynFolderName.text = desc1.getString(0);  
    } catch (e1) {  
        dynFolderName.text = "predefined value";  

    } 
    try {  
        var desc2 = app.getCustomOptions("36132d7e-520e-4bd4-9a43-2bdbfea6ee8e");  
        dynExportName.text = desc2.getString(0);  
    } catch (e2) {  
        dynExportName.text = "predefined value";  
    }   
    
    

    dialogMain.show();





    // =======================================================
    // ===============LOOP THRU' DA LAYERS ====================
    // =======================================================


    function folderToImg(includeHG) {
        // ======================================================= SELECT Background
        if ( includeHG.value == true ) {
        var idslct = charIDToTypeID( "slct" );
            var desc14 = new ActionDescriptor();
            var idnull = charIDToTypeID( "null" );
                var ref2 = new ActionReference();
                var idLyr = charIDToTypeID( "Lyr " );
                ref2.putName( idLyr, staticFolderName.text ); //  STATIC FOLDERNAME  - Always "HG"
            desc14.putReference( idnull, ref2 );
            var idMkVs = charIDToTypeID( "MkVs" );
            desc14.putBoolean( idMkVs, false );
            var idLyrI = charIDToTypeID( "LyrI" );
                var list2 = new ActionList();
                list2.putInteger( 18433 );
            desc14.putList( idLyrI, list2 );
        executeAction( idslct, desc14, DialogModes.NO );
        }
        // ======================================================= SELECT LOKA FOLDER
        var idslct = charIDToTypeID( "slct" );
            var desc15 = new ActionDescriptor();
            var idnull = charIDToTypeID( "null" );
                var ref3 = new ActionReference();
                var idLyr = charIDToTypeID( "Lyr " );
                ref3.putName( idLyr, dynFolderName[i] ); // DYNAMIC FOLDERNAME - Loops Thru Array
            desc15.putReference( idnull, ref3 );
        if ( includeHG.value == true ) {
            var idselectionModifier = stringIDToTypeID( "selectionModifier" );
            var idselectionModifierType = stringIDToTypeID( "selectionModifierType" );
            var idaddToSelection = stringIDToTypeID( "addToSelection" );
            desc15.putEnumerated( idselectionModifier, idselectionModifierType, idaddToSelection );
        }
            var idMkVs = charIDToTypeID( "MkVs" );
            desc15.putBoolean( idMkVs, false );
            var idLyrI = charIDToTypeID( "LyrI" );
                var list3 = new ActionList();
                list3.putInteger( 18433 );
                list3.putInteger( 18829 );
            desc15.putList( idLyrI, list3 );
        executeAction( idslct, desc15, DialogModes.NO );

        // ======================================================= NEW DOC
        var idMk = charIDToTypeID( "Mk  " );
            var desc19 = new ActionDescriptor();
            var idnull = charIDToTypeID( "null" );
                var ref4 = new ActionReference();
                var idDcmn = charIDToTypeID( "Dcmn" );
                ref4.putClass( idDcmn );
            desc19.putReference( idnull, ref4 );
            var idNm = charIDToTypeID( "Nm  " );
            desc19.putString( idNm, giveFileName.text );
            var idUsng = charIDToTypeID( "Usng" );
                var ref5 = new ActionReference();
                var idLyr = charIDToTypeID( "Lyr " );
                var idOrdn = charIDToTypeID( "Ordn" );
                var idTrgt = charIDToTypeID( "Trgt" );
                ref5.putEnumerated( idLyr, idOrdn, idTrgt );
            desc19.putReference( idUsng, ref5 );
            var idVrsn = charIDToTypeID( "Vrsn" );
            desc19.putInteger( idVrsn, 5 );
        executeAction( idMk, desc19, DialogModes.NO );
    };

    function saveImg() {
        activeDocument.mergeVisibleLayers();

        if (checkTontrennung.value === true) {
            var idPstr = charIDToTypeID("Pstr");
            var desc28 = new ActionDescriptor();
            var idLvls = charIDToTypeID("Lvls");
            desc28.putInteger(idLvls, value.text);
            executeAction(idPstr, desc28, DialogModes.NO);
        }

        if (checkCrop.value === true) {
        activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);  
        }

        if (radioPNG.value === true) {
            if (checkMobilScale.value == true) {
                saveFile = File(savePath + "/" + nameDropdown.selection.text + giveFileName.text + savePostfix[i] + quadSize+ ".png");
                SavePNG(saveFile);

                resize50();

                saveFile = File(savePath + "/" + nameDropdown.selection.text + giveFileName.text + savePostfix[i] + doubleSize+ ".png");
                SavePNG(saveFile);

                resize50();

                saveFile = File(savePath + "/" + nameDropdown.selection.text + giveFileName.text + savePostfix[i] + ".png");
                SavePNG(saveFile);
                }
            else {
            saveFile = File(savePath + "/" + nameDropdown.selection.text + giveFileName.text + savePostfix[i] + ".png");
            SavePNG(saveFile);
            }
        } else if (radioJPG.value === true) {
            if (checkMobilScale.value == true) {
                saveFile = File(savePath + "/" + nameDropdown.selection.text + giveFileName.text + savePostfix[i] + quadSize+ ".jpg");
                SaveJPG(saveFile);

                resize50();

                saveFile = File(savePath + "/" + nameDropdown.selection.text + giveFileName.text + savePostfix[i] + doubleSize+ ".jpg");
                SaveJPG(saveFile);

                resize50();

                saveFile = File(savePath + "/" + nameDropdown.selection.text + giveFileName.text + savePostfix[i] + ".jpg");
                SaveJPG(saveFile);
                }
            saveFile = File(savePath + "/" + nameDropdown.selection.text + giveFileName.text + savePostfix[i] + ".jpg");
            SaveJPG(saveFile);
        } else {
            if (checkMobilScale.value == true) {
                saveFile = File(savePath + "/" + nameDropdown.selection.text + giveFileName.text + savePostfix[i] + quadSize+ ".png");
                SavePNG8(saveFile);

                resize50();

                saveFile = File(savePath + "/" + nameDropdown.selection.text + giveFileName.text + savePostfix[i] + doubleSize+ ".png");
                SavePNG8(saveFile);

                resize50();

                saveFile = File(savePath + "/" + nameDropdown.selection.text + giveFileName.text + savePostfix[i] + ".png");
                SavePNG8(saveFile);
                }
            else {
            saveFile = File(savePath + "/" + nameDropdown.selection.text + giveFileName.text + savePostfix[i] + ".png");
            SavePNG8(saveFile);
            }
        }

        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

        function SavePNG(saveFile) {
            var pngOpts = new ExportOptionsSaveForWeb;
            pngOpts.format = SaveDocumentType.PNG
            pngOpts.PNG8 = false;
            pngOpts.transparency = true;
            pngOpts.interlaced = true;
            //pngOpts.lossy = 0;
            pngOpts.quality = 100;
            pngOpts.colorReduction = ColorReductionType.SELECTIVE;
            //activeDocument.exportDocument(new File(saveFile),ExportType.SAVEFORWEB,pngOpts);   
            activeDocument.exportDocument(new File(saveFile), ExportType.SAVEFORWEB, pngOpts);
        }

        function SaveJPG(saveFile) {
            var jpgOpts = new ExportOptionsSaveForWeb;
            jpgOpts.format = SaveDocumentType.JPEG
            jpgOpts.includeProfile = false;   
            jpgOpts.optimized = true;
            jpgOpts.interlaced = 0;
            //pngOpts.lossy = 0;
            jpgOpts.quality = valueQ.text;  
            activeDocument.exportDocument(new File(saveFile), ExportType.SAVEFORWEB, jpgOpts);
        }
        
        function SavePNG8(saveFile) {
           
            // =======================================================
            var idsave = charIDToTypeID( "save" );
                var desc1773 = new ActionDescriptor();
                var idAs = charIDToTypeID( "As  " );
                    var desc1774 = new ActionDescriptor();
                    var idpngC = charIDToTypeID( "pngC" );
                    desc1774.putInteger( idpngC, 9 );
                    var idpngF = charIDToTypeID( "pngF" );
                    desc1774.putInteger( idpngF, 248 );
                    var idpngS = charIDToTypeID( "pngS" );
                    desc1774.putInteger( idpngS, 0 );
                    var idpngQ = charIDToTypeID( "pngQ" );
                    desc1774.putBoolean( idpngQ, true );
                    var idpngq = charIDToTypeID( "pngq" );
                    desc1774.putInteger( idpngq, 60 );
                    var idpngA = charIDToTypeID( "pngA" );
                    var idalfT = charIDToTypeID( "alfT" );
                    var idalfT = charIDToTypeID( "alfT" );
                    desc1774.putEnumerated( idpngA, idalfT, idalfT );
                    var idpngX = charIDToTypeID( "pngX" );
                    desc1774.putBoolean( idpngX, false );
                    var idpngI = charIDToTypeID( "pngI" );
                    desc1774.putBoolean( idpngI, false );
                    var idpngM = charIDToTypeID( "pngM" );
                    desc1774.putBoolean( idpngM, false );
                var idfnordSuperPNG = stringIDToTypeID( "fnord SuperPNG" );
                desc1773.putObject( idAs, idfnordSuperPNG, desc1774 );
                var idIn = charIDToTypeID( "In  " );
                desc1773.putPath( idIn, new File( saveFile ) );
                var idDocI = charIDToTypeID( "DocI" );
                desc1773.putInteger( idDocI, 1264 );
                var idCpy = charIDToTypeID( "Cpy " );
                desc1773.putBoolean( idCpy, true );
                var idsaveStage = stringIDToTypeID( "saveStage" );
                var idsaveStageType = stringIDToTypeID( "saveStageType" );
                var idsaveSucceeded = stringIDToTypeID( "saveSucceeded" );
                desc1773.putEnumerated( idsaveStage, idsaveStageType, idsaveSucceeded );
            executeAction( idsave, desc1773, DialogModes.NO );

        }
    }

    function resize50() {
        app.preferences.rulerUnits = Units.PERCENT;
        activeDocument.resizeImage(50, undefined, undefined, ResampleMethod.BICUBICSHARPER);
    }

    
};




var base = 'DE';
var dplcate = ['EN','ES','FR','IT','NL','PL','RU','TR']

function openFile() {
var importedCSV =  File.openDialog ("Open CSV", "*.tsv, *.txt, *.xls, *.xlsx, *.csv", false);

importedCSV.open('r');

// User Cancelled
if(importedCSV == null)
{
    alert("User Cancelled");
    exit(0); //leave script
}


var str = "";




while(!importedCSV.eof) {//as long "end of file" is not reached
    str += importedCSV.readln();
    str += "\n";
}
var doArr = str.split('\t');

//0-12 Titel Leiste
//13-25 Nächste Reihe
//26-38
//Gedanken: Eine Reihe ist 12 lang, um von DE1 zu DE2 braucht es 13

alert(str);

importCSV();

function importCSV() {

var rootDoc = app.activeDocument.name;

for (s=0; s<dplcate.length; s++){ //loop to select language

    //  Select and Duplicate "DE"
    // =======================================================
    var idslct = charIDToTypeID( "slct" );
        var desc7 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref7 = new ActionReference();
            var idLyr = charIDToTypeID( "Lyr " );
            ref7.putName( idLyr, base );
        desc7.putReference( idnull, ref7 );
        var idMkVs = charIDToTypeID( "MkVs" );
        desc7.putBoolean( idMkVs, false );
        var idLyrI = charIDToTypeID( "LyrI" );
            var list4 = new ActionList();
            list4.putInteger( 8 );
        desc7.putList( idLyrI, list4 );
    executeAction( idslct, desc7, DialogModes.NO );

    //duplicate to new file
    // =======================================================
    var idMk = charIDToTypeID( "Mk  " );
        var desc149 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref35 = new ActionReference();
            var idDcmn = charIDToTypeID( "Dcmn" );
            ref35.putClass( idDcmn );
        desc149.putReference( idnull, ref35 );
        var idNm = charIDToTypeID( "Nm  " );
        desc149.putString( idNm, dplcate[s] ); //var doc name
        var idUsng = charIDToTypeID( "Usng" );
            var ref36 = new ActionReference();
            var idLyr = charIDToTypeID( "Lyr " );
            var idOrdn = charIDToTypeID( "Ordn" );
            var idTrgt = charIDToTypeID( "Trgt" );
            ref36.putEnumerated( idLyr, idOrdn, idTrgt );
        desc149.putReference( idUsng, ref36 );
        var idLyrN = charIDToTypeID( "LyrN" );
        desc149.putString( idLyrN, dplcate[s].toString()); //var layer group name
        var idVrsn = charIDToTypeID( "Vrsn" );
        desc149.putInteger( idVrsn, 5 );
    executeAction( idMk, desc149, DialogModes.NO );
    //=======================================================

    //select duplicate
    // =======================================================
    var idslct = charIDToTypeID( "slct" );
        var desc7 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref7 = new ActionReference();
            var idLyr = charIDToTypeID( "Lyr " );
            ref7.putName( idLyr, dplcate[s] ); //variable
        desc7.putReference( idnull, ref7 );
        var idMkVs = charIDToTypeID( "MkVs" );
        desc7.putBoolean( idMkVs, false );
        var idLyrI = charIDToTypeID( "LyrI" );
            var list4 = new ActionList();
            list4.putInteger( 8 );
        desc7.putList( idLyrI, list4 );
    executeAction( idslct, desc7, DialogModes.NO );

    // =======================================================
     changeText(app.activeDocument); // Call the Magic
    // =======================================================
    var idDplc = charIDToTypeID( "Dplc" );
        var desc28 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var ref17 = new ActionReference();
            var idLyr = charIDToTypeID( "Lyr " );
            var idOrdn = charIDToTypeID( "Ordn" );
            var idTrgt = charIDToTypeID( "Trgt" );
            ref17.putEnumerated( idLyr, idOrdn, idTrgt );
        desc28.putReference( idnull, ref17 );
        var idT = charIDToTypeID( "T   " );
            var ref18 = new ActionReference();
            var idDcmn = charIDToTypeID( "Dcmn" );
            ref18.putName( idDcmn, rootDoc);
        desc28.putReference( idT, ref18 );
        var idNm = charIDToTypeID( "Nm  " );
        desc28.putString( idNm, dplcate[s]);
        var idVrsn = charIDToTypeID( "Vrsn" );
        desc28.putInteger( idVrsn, 5 );
        var idIdnt = charIDToTypeID( "Idnt" );
            var list8 = new ActionList();
            list8.putInteger( 40 );
            list8.putInteger( 41 );
            list8.putInteger( 42 );
            list8.putInteger( 43 );
            list8.putInteger( 44 );
        desc28.putList( idIdnt, list8 );
    executeAction( idDplc, desc28, DialogModes.NO );

    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
}


function changeText(duplcateLayer) 
		{

			// Get layers and sets
			var layers	= duplcateLayer.artLayers;
			var layerSets	= duplcateLayer.layerSets;
            
            // Clean text for needed Output
             var readLayer;
             var neededOutput;
             
             // Language Index
             var languageIndex;
             switch (dplcate[s])
            {
               case 'EN': languageIndex= -2;
               break;
               case 'ES': languageIndex= 1;
               break;
               case 'FR': languageIndex= 2;
               break;
               case 'IT': languageIndex= 3;
               break;
               case 'NL': languageIndex= 4;
               break;
               case 'PL': languageIndex= 5;
               break;
               case 'RU': languageIndex= 6;
               break;
               case 'TR': languageIndex= 7;
               break;
               default: alert("Something is wrong");
            }
             

            // Loop all layers
			if (layers.length > 0)
			{
				for (var layerIndex = layers.length; layerIndex > 0; layerIndex--)
				{

					// curentLayer ref
					var currentLayer = layers[layerIndex-1];

					// Only read VISIBLE and TEXT layers
					if ( (currentLayer.visible) && (currentLayer.kind == LayerKind.TEXT) )
					{
                           readLayer = currentLayer.textItem.contents;
                           neededOutput = readLayer.replace(/(\r\n|\n|\r)/gm," ");
						for (i=0; i<doArr.length; i++) {
                                doArr[i]=doArr[i].replace("<b>","");
                                doArr[i]=doArr[i].replace("</b>","");
                                if (neededOutput == doArr[i]) {
                                        currentLayer.textItem.contents = doArr[i+languageIndex];
                                    }
                            }
                        
					}

				}
			}
			
			// Loop all layerSets
            
			if (layerSets.length > 0)
			{
				for (var layerSetIndex = layerSets.length; layerSetIndex > 0; layerSetIndex--)
				{

					// curentLayerSet ref
					var currentLayerSet = layerSets[layerSetIndex-1];

					// Recursion
					changeText(currentLayerSet);

				}
			}

		}
    }


function createCSV(){
    
	// Use save as dialog (true/false)?
	var useDialog	= true;
	
	// Open file when done (true/false)?
	var openFile	= true;


	//TextExport Flow

	 	// Linefeed
		if ($.os.search(/windows/i) != -1)
			fileLineFeed = "windows";
		else
			fileLineFeed = "macintosh";
	 
	 	// Use Dialog
	 	if (useDialog == true)
	 	{
			// Pop up save dialog
			var saveFile = File.saveDialog("Folder to save into (filename does not matter):");

			// User Cancelled
			if(saveFile == null)
			{
				alert("User Cancelled");
				exit(0); //leave script
			}
			// set filePath and fileName to the one chosen in the dialog
			filePath = saveFile.path + "/" + saveFile.name;
		} 
		
		// Don't use Dialog
		else 
		{
			// Auto set filePath and fileName
			filePath = Folder.myDocuments + '/' + app.activeDocument.name + '.tsv';
		}
		
		// create outfile
		fileOut	= new File(filePath);

		// clear dummyFile
		dummyFile = null;

		// set linefeed
		fileOut.linefeed = fileLineFeed;

		// open for write
		fileOut.open("w", "TEXT");

		// Append title of document to file
		fileOut.writeln("Context\tImage directory\tEN\tMax length\tDE\tES\tFR\tIT\tNL\tPL\tRU\tTR\tUS EN");

		// call to the core with the current document
		exportCSV(app.activeDocument);


		// close the file
		fileOut.close();

		// Give notice that we're done or open the file
		if (openFile === true)
			fileOut.execute();
		else
			alert("TextExport has finished - File was saved to:\n" + Folder.decode(filePath));

  
  	//TextExport Core Function
      //------------------------------------------
	
  
		function exportCSV(localizeLayer) 
		{

			// Get layers and sets
			var layers	= localizeLayer.artLayers;
			var layerSets	= localizeLayer.layerSets;
            
            // Clean text for needed Output
             var killBreaks;
             var neededOutput

            // Loop all layers
			if (layers.length > 0)
			{
				for (var layerIndex = layers.length; layerIndex > 0; layerIndex--)
				{

					// curentLayer ref
					var currentLayer = layers[layerIndex-1];

					// Only read VISIBLE and TEXT layers
					if ( (currentLayer.visible) && (currentLayer.kind == LayerKind.TEXT) )
					{
                        var length50 =(currentLayer.textItem.contents.length+currentLayer.textItem.contents.length/100*50).toFixed();

                        killBreaks = "\t"+"\t"+"\t"+length50+"\t"+currentLayer.textItem.contents+"\t"+"\t"+"\t"+"\t"+"\t"+"\t"+"\t"+"\t"
                        neededOutput = killBreaks.replace(/(\r\n|\n|\r)/gm," ");
				        fileOut.writeln(neededOutput);						
					}

				}
			}
			
			// Loop all layerSets
            
			if (layerSets.length > 0)
			{
				for (var layerSetIndex = layerSets.length; layerSetIndex > 0; layerSetIndex--)
				{

					// curentLayerSet ref
					var currentLayerSet = layerSets[layerSetIndex-1];

					// Recursion
					if (currentLayerSet.visible) {
					exportCSV(currentLayerSet);
                    }


				}
			}

		}

}

//=================================================================================================================
//=================================================================================================================
//==============================================Image Exporter=====================================================
//=================================================================================================================
//=================================================================================================================

var doc = app.activeDocument;
function explain() {
    var tut = new Window("palette", "Info");

    tut.add("StaticText", undefined, "How to");

    tut.add("StaticText", undefined, "Ordner müssen richtig benannt sein (HG, DE, EN, ES...)");
    //var iconTT = File("/icons/ico_tt.png")
    var checkCaps = tut.add("checkbox", undefined, "Make Caps");
    //checkCaps.value = false;
    
    tut.add("StaticText", undefined, "Alle Loka Ordner und der HG Ordner müssen eingeblendet sein");
    tut.add("StaticText", undefined, "Export klicken, im Popup gewünschten Namen einfügen.");
    tut.add("StaticText", undefined, "Länderkennung fügt sich automatisch hinzu. zB: -DE");
    tut.add("StaticText", undefined, "Für einen Erfolgreichen Export, bitte drauf achten, dass keine Ebene folgende Benennung hat:");
    tut.add("StaticText", undefined, "HG, DE, EN, ES, FR, IT, NL, PL, RU, TR, CZ");
    tut.add("StaticText", undefined, "Diese sind exklusiv für die Export Layergroups vorbehalten - und somit Tabu!");
    var convert_button = tut.add("button", undefined, "Okay");
    convert_button.onClick = function () {
         if (checkCaps.value === true) {
             correctFolderName();
             tut.close();
         }
        tut.close();

    }
    tut.show();
}


//=== ACHTUNG
function convertCaps() {
    // =======================================================
//Hintergrund
var idslct = charIDToTypeID( "slct" );
    var desc413 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref254 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        ref254.putName( idLyr, "hg" );
    desc413.putReference( idnull, ref254 );
    var idMkVs = charIDToTypeID( "MkVs" );
    desc413.putBoolean( idMkVs, false );
    var idLyrI = charIDToTypeID( "LyrI" );
        var list185 = new ActionList();
        list185.putInteger( 292 );
    desc413.putList( idLyrI, list185 );
executeAction( idslct, desc413, DialogModes.NO );

// =======================================================
var idsetd = charIDToTypeID( "setd" );
    var desc414 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref255 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref255.putEnumerated( idLyr, idOrdn, idTrgt );
    desc414.putReference( idnull, ref255 );
    var idT = charIDToTypeID( "T   " );
        var desc415 = new ActionDescriptor();
        var idNm = charIDToTypeID( "Nm  " );
        desc415.putString( idNm, """HG""" );
    var idLyr = charIDToTypeID( "Lyr " );
    desc414.putObject( idT, idLyr, desc415 );
executeAction( idsetd, desc414, DialogModes.NO );

    // =======================================================
//Deutsch
var idslct = charIDToTypeID( "slct" );
    var desc413 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref254 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        ref254.putName( idLyr, "de" );
    desc413.putReference( idnull, ref254 );
    var idMkVs = charIDToTypeID( "MkVs" );
    desc413.putBoolean( idMkVs, false );
    var idLyrI = charIDToTypeID( "LyrI" );
        var list185 = new ActionList();
        list185.putInteger( 292 );
    desc413.putList( idLyrI, list185 );
executeAction( idslct, desc413, DialogModes.NO );

// =======================================================
var idsetd = charIDToTypeID( "setd" );
    var desc414 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref255 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref255.putEnumerated( idLyr, idOrdn, idTrgt );
    desc414.putReference( idnull, ref255 );
    var idT = charIDToTypeID( "T   " );
        var desc415 = new ActionDescriptor();
        var idNm = charIDToTypeID( "Nm  " );
        desc415.putString( idNm, """DE""" );
    var idLyr = charIDToTypeID( "Lyr " );
    desc414.putObject( idT, idLyr, desc415 );
executeAction( idsetd, desc414, DialogModes.NO );

// =======================================================
//English
var idslct = charIDToTypeID( "slct" );
    var desc413 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref254 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        ref254.putName( idLyr, "en" );
    desc413.putReference( idnull, ref254 );
    var idMkVs = charIDToTypeID( "MkVs" );
    desc413.putBoolean( idMkVs, false );
    var idLyrI = charIDToTypeID( "LyrI" );
        var list185 = new ActionList();
        list185.putInteger( 292 );
    desc413.putList( idLyrI, list185 );
executeAction( idslct, desc413, DialogModes.NO );

// =======================================================
var idsetd = charIDToTypeID( "setd" );
    var desc414 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref255 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref255.putEnumerated( idLyr, idOrdn, idTrgt );
    desc414.putReference( idnull, ref255 );
    var idT = charIDToTypeID( "T   " );
        var desc415 = new ActionDescriptor();
        var idNm = charIDToTypeID( "Nm  " );
        desc415.putString( idNm, """EN""" );
    var idLyr = charIDToTypeID( "Lyr " );
    desc414.putObject( idT, idLyr, desc415 );
executeAction( idsetd, desc414, DialogModes.NO );

// =======================================================
//Espanish
var idslct = charIDToTypeID( "slct" );
    var desc413 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref254 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        ref254.putName( idLyr, "es" );
    desc413.putReference( idnull, ref254 );
    var idMkVs = charIDToTypeID( "MkVs" );
    desc413.putBoolean( idMkVs, false );
    var idLyrI = charIDToTypeID( "LyrI" );
        var list185 = new ActionList();
        list185.putInteger( 292 );
    desc413.putList( idLyrI, list185 );
executeAction( idslct, desc413, DialogModes.NO );

// =======================================================
var idsetd = charIDToTypeID( "setd" );
    var desc414 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref255 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref255.putEnumerated( idLyr, idOrdn, idTrgt );
    desc414.putReference( idnull, ref255 );
    var idT = charIDToTypeID( "T   " );
        var desc415 = new ActionDescriptor();
        var idNm = charIDToTypeID( "Nm  " );
        desc415.putString( idNm, """ES""" );
    var idLyr = charIDToTypeID( "Lyr " );
    desc414.putObject( idT, idLyr, desc415 );
executeAction( idsetd, desc414, DialogModes.NO );

// =======================================================
//French
var idslct = charIDToTypeID( "slct" );
    var desc413 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref254 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        ref254.putName( idLyr, "fr" );
    desc413.putReference( idnull, ref254 );
    var idMkVs = charIDToTypeID( "MkVs" );
    desc413.putBoolean( idMkVs, false );
    var idLyrI = charIDToTypeID( "LyrI" );
        var list185 = new ActionList();
        list185.putInteger( 292 );
    desc413.putList( idLyrI, list185 );
executeAction( idslct, desc413, DialogModes.NO );

// =======================================================
var idsetd = charIDToTypeID( "setd" );
    var desc414 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref255 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref255.putEnumerated( idLyr, idOrdn, idTrgt );
    desc414.putReference( idnull, ref255 );
    var idT = charIDToTypeID( "T   " );
        var desc415 = new ActionDescriptor();
        var idNm = charIDToTypeID( "Nm  " );
        desc415.putString( idNm, """FR""" );
    var idLyr = charIDToTypeID( "Lyr " );
    desc414.putObject( idT, idLyr, desc415 );
executeAction( idsetd, desc414, DialogModes.NO );

// =======================================================
//Italiano
var idslct = charIDToTypeID( "slct" );
    var desc413 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref254 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        ref254.putName( idLyr, "it" );
    desc413.putReference( idnull, ref254 );
    var idMkVs = charIDToTypeID( "MkVs" );
    desc413.putBoolean( idMkVs, false );
    var idLyrI = charIDToTypeID( "LyrI" );
        var list185 = new ActionList();
        list185.putInteger( 292 );
    desc413.putList( idLyrI, list185 );
executeAction( idslct, desc413, DialogModes.NO );

// =======================================================
var idsetd = charIDToTypeID( "setd" );
    var desc414 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref255 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref255.putEnumerated( idLyr, idOrdn, idTrgt );
    desc414.putReference( idnull, ref255 );
    var idT = charIDToTypeID( "T   " );
        var desc415 = new ActionDescriptor();
        var idNm = charIDToTypeID( "Nm  " );
        desc415.putString( idNm, """IT""" );
    var idLyr = charIDToTypeID( "Lyr " );
    desc414.putObject( idT, idLyr, desc415 );
executeAction( idsetd, desc414, DialogModes.NO );

// =======================================================
//NL Dutch
var idslct = charIDToTypeID( "slct" );
    var desc413 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref254 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        ref254.putName( idLyr, "nl" );
    desc413.putReference( idnull, ref254 );
    var idMkVs = charIDToTypeID( "MkVs" );
    desc413.putBoolean( idMkVs, false );
    var idLyrI = charIDToTypeID( "LyrI" );
        var list185 = new ActionList();
        list185.putInteger( 292 );
    desc413.putList( idLyrI, list185 );
executeAction( idslct, desc413, DialogModes.NO );

// =======================================================
var idsetd = charIDToTypeID( "setd" );
    var desc414 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref255 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref255.putEnumerated( idLyr, idOrdn, idTrgt );
    desc414.putReference( idnull, ref255 );
    var idT = charIDToTypeID( "T   " );
        var desc415 = new ActionDescriptor();
        var idNm = charIDToTypeID( "Nm  " );
        desc415.putString( idNm, """NL""" );
    var idLyr = charIDToTypeID( "Lyr " );
    desc414.putObject( idT, idLyr, desc415 );
executeAction( idsetd, desc414, DialogModes.NO );

// =======================================================
//Polish
var idslct = charIDToTypeID( "slct" );
    var desc413 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref254 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        ref254.putName( idLyr, "pl" );
    desc413.putReference( idnull, ref254 );
    var idMkVs = charIDToTypeID( "MkVs" );
    desc413.putBoolean( idMkVs, false );
    var idLyrI = charIDToTypeID( "LyrI" );
        var list185 = new ActionList();
        list185.putInteger( 292 );
    desc413.putList( idLyrI, list185 );
executeAction( idslct, desc413, DialogModes.NO );

// =======================================================
var idsetd = charIDToTypeID( "setd" );
    var desc414 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref255 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref255.putEnumerated( idLyr, idOrdn, idTrgt );
    desc414.putReference( idnull, ref255 );
    var idT = charIDToTypeID( "T   " );
        var desc415 = new ActionDescriptor();
        var idNm = charIDToTypeID( "Nm  " );
        desc415.putString( idNm, """PL""" );
    var idLyr = charIDToTypeID( "Lyr " );
    desc414.putObject( idT, idLyr, desc415 );
executeAction( idsetd, desc414, DialogModes.NO );

// =======================================================
//Russian
var idslct = charIDToTypeID( "slct" );
    var desc413 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref254 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        ref254.putName( idLyr, "ru" );
    desc413.putReference( idnull, ref254 );
    var idMkVs = charIDToTypeID( "MkVs" );
    desc413.putBoolean( idMkVs, false );
    var idLyrI = charIDToTypeID( "LyrI" );
        var list185 = new ActionList();
        list185.putInteger( 292 );
    desc413.putList( idLyrI, list185 );
executeAction( idslct, desc413, DialogModes.NO );

// =======================================================
var idsetd = charIDToTypeID( "setd" );
    var desc414 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref255 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref255.putEnumerated( idLyr, idOrdn, idTrgt );
    desc414.putReference( idnull, ref255 );
    var idT = charIDToTypeID( "T   " );
        var desc415 = new ActionDescriptor();
        var idNm = charIDToTypeID( "Nm  " );
        desc415.putString( idNm, """RU""" );
    var idLyr = charIDToTypeID( "Lyr " );
    desc414.putObject( idT, idLyr, desc415 );
executeAction( idsetd, desc414, DialogModes.NO );

// =======================================================
//Turkish
var idslct = charIDToTypeID( "slct" );
    var desc413 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref254 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        ref254.putName( idLyr, "tr" );
    desc413.putReference( idnull, ref254 );
    var idMkVs = charIDToTypeID( "MkVs" );
    desc413.putBoolean( idMkVs, false );
    var idLyrI = charIDToTypeID( "LyrI" );
        var list185 = new ActionList();
        list185.putInteger( 292 );
    desc413.putList( idLyrI, list185 );
executeAction( idslct, desc413, DialogModes.NO );

// =======================================================
var idsetd = charIDToTypeID( "setd" );
    var desc414 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref255 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref255.putEnumerated( idLyr, idOrdn, idTrgt );
    desc414.putReference( idnull, ref255 );
    var idT = charIDToTypeID( "T   " );
        var desc415 = new ActionDescriptor();
        var idNm = charIDToTypeID( "Nm  " );
        desc415.putString( idNm, """TR""" );
    var idLyr = charIDToTypeID( "Lyr " );
    desc414.putObject( idT, idLyr, desc415 );
executeAction( idsetd, desc414, DialogModes.NO );

}

// =======================================================
// =======================================================
// =======================================================


function correctFolderName(){
    for (var i = 0; i < doc.layers.length; i++) {
 
//Set up variables for current and new name
          var currentName_hg = "hg";
          var currentName_Hg = "Hg";
          var newName_HG = "HG";
          exchangeName(currentName_hg, currentName_Hg, newName_HG);

          var currentName_de = "de";
          var currentName_De = "De";
          var newName_DE = "DE";
          exchangeName(currentName_de, currentName_De, newName_DE);
          
          var currentName_en = "en";
          var currentName_En = "En";
          var newName_EN = "EN";
           exchangeName(currentName_en, currentName_En, newName_EN);
 
           var currentName_es = "es";
          var currentName_Es = "Es";
          var newName_ES = "ES";
           exchangeName(currentName_es, currentName_Es, newName_ES);
 
           var currentName_fr = "fr";
          var currentName_Fr = "Fr";
          var newName_FR = "FR";
           exchangeName(currentName_fr, currentName_Fr, newName_FR);
           
          var currentName_it = "it";
          var currentName_It = "It";
          var newName_IT = "IT";
           exchangeName(currentName_it, currentName_It, newName_IT);
 
           var currentName_nl = "nl";
          var currentName_Nl = "Nl";
          var newName_NL = "NL";
           exchangeName(currentName_nl, currentName_Nl, newName_NL);
           
           var currentName_pl = "pl";
          var currentName_Pl = "Pl";
          var newName_PL = "PL";
           exchangeName(currentName_pl, currentName_Pl, newName_PL);
           
           var currentName_ru = "ru";
          var currentName_Ru = "Ru";
          var newName_RU = "RU";
           exchangeName(currentName_ru, currentName_Ru, newName_RU);
           
           var currentName_tr = "tr";
          var currentName_Tr = "Tr";
          var newName_TR = "TR";
           exchangeName(currentName_tr, currentName_Tr, newName_TR);
 
//Set up Variable to access layer name
    function exchangeName(currentName1, currentName2, newName)  {
          var currentLayer = app.activeDocument.layers[i];
 
          if (currentLayer.name == currentName1) {
                    currentLayer.name = newName;
          }
           else if (currentLayer.name == currentName2) {
             currentLayer.name = newName;
          }
           /*else {
                currentLayer.name = currentLayer.name;
            }*/
      };
    }
}

// ===============================================================================
// ==========================Duplicate Folder for Loka============================
// ===============================================================================
function dplcFolder(lngs) {
        // =======================================================
        var idslct = charIDToTypeID("slct");
        var desc1718 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref365 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        ref365.putName(idLyr, "DE");
        desc1718.putReference(idnull, ref365);
        var idMkVs = charIDToTypeID("MkVs");
        desc1718.putBoolean(idMkVs, false);
        var idLyrI = charIDToTypeID("LyrI");
        var list432 = new ActionList();
        list432.putInteger(2);
        desc1718.putList(idLyrI, list432);
        executeAction(idslct, desc1718, DialogModes.NO);
        // =======================================================
        var idDplc = charIDToTypeID("Dplc");
        var desc1722 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref366 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        var idOrdn = charIDToTypeID("Ordn");
        var idTrgt = charIDToTypeID("Trgt");
        ref366.putEnumerated(idLyr, idOrdn, idTrgt);
        desc1722.putReference(idnull, ref366);
        var idNm = charIDToTypeID("Nm  ");
        desc1722.putString(idNm, lngs); //FolderName
        var idVrsn = charIDToTypeID("Vrsn");
        desc1722.putInteger(idVrsn, 5);
        var idIdnt = charIDToTypeID("Idnt");
        var list433 = new ActionList();
        list433.putInteger(5);
        list433.putInteger(6);
        list433.putInteger(7);
        desc1722.putList(idIdnt, list433);
        executeAction(idDplc, desc1722, DialogModes.NO);
    };

function dplcFolderForLoka() {
 
    var lngs = ["EN", "ES", "FR", "IT", "NL", "PL", "RU", "TR", "CZ"];
    for (i = 0; i < lngs.length; i++) {
        dplcFolder(lngs[i]);
    };
};

