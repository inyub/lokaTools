/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/


var base = 'DE';
var dplcate = ['EN','ES','FR','IT','NL','PL','RU','TR']

function openFile() {
var importedCSV =  File.openDialog ("Open CSV", "*.csv, *.txt, *.xls, *.xlsx", false);

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
var doArr = str.split(',');

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
			filePath = Folder.myDocuments + '/' + app.activeDocument.name + '.csv';
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
		fileOut.writeln("Context, Image directory, EN, Max length, DE, ES, FR, IT, NL, PL, RU, TR, US EN");

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

                        killBreaks = ","+","+","+length50+","+currentLayer.textItem.contents+","+","+","+","+","+","+","+","
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
    tut.add("StaticText", undefined, "HG, DE, EN, ES, FR, IT, NL, PL, RU, TR");
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

function doSomething(placeHolder, saveName) {
    var oldPath = activeDocument.path;
    var w = new Window("dialog", "Loka Export");
    w.alignChildren = "center";
    var title = w.add('statictext {text:"Run Export Script", characters: 20, justify: "left"}');
    title.graphics.font = "dialog:14";
    
    var settingName = w.add("group");
    settingName.add("StaticText", undefined, "&Enter Name:");
    var newName = settingName.add("edittext", undefined, "background");
        newName.shortcutKey ="e";
        newName.characters = 15;
    var settingLabel = settingName.add("StaticText", undefined, "-xx.");
        var radioPNG = settingName.add("radiobutton", undefined, "PNG");
        var radioJPG = settingName.add("radiobutton", undefined, "JPG");
            radioPNG.value = true;
  
    w.add ("panel", [0,25,360,23]);
    //w.add("StaticText", undefined, "Nutze den Tontrennung Slider bei PNG und bei JPG den Quality Slider");
    var settingTontrennung = w.add("group");
    var checkTontrennung = settingTontrennung.add("checkbox", undefined, "Tontrennung");
    var value = settingTontrennung.add('edittext{text: 50, characters: 3, justify:"center", active: true}');
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
   
    var settingQuality = w.add('group{orientation:"row", justify:"left"}');
    //var panel = settingQuality.add('panel', [0,0,100,100], 'Gray', {borderStyle:'gray'});//border
    settingQuality.add('statictext {text:" JPG Only Quality", characters: 25, justify: "left"}');
    var valueQ = settingQuality.add('edittext{text: 50, characters: 3, justify:"center", active: true}');
    var sliderQ = settingQuality.add('slider{minvalue: 0, maxvalue: 200, value: 100}');
    
    //var checkQuality = settingQuality.add("checkbox", undefined, "Quality");
     sliderQ.onChanging = function () {
        valueQ.text = sliderQ.value/2;
    }
    valueQ.onChanging = function () {
        sliderQ.value = Number(valueQ.text)*2;
    }
    w.add ("panel", [0,25,360,23]);
    var miscGroup = w.add("group");
    var checkCrop = miscGroup.add("checkbox", undefined, "Crop Image");
    checkCrop.value = false;
    w.add ("panel", [0,25,360,23]);
    var buttonGroup = w.add("group");
    var convert_button = buttonGroup.add("button", undefined, "Export");
    var close_button = buttonGroup.add("button", undefined, "Cancel");

    convert_button.onClick = function () {
        newName = newName.text;
        // Select Loka Folder
        // =======================================================
        function lokaDe() {
            // =======================================================
            var idslct = charIDToTypeID("slct");
            var desc96 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref20 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            ref20.putName(idLyr, "DE");
            desc96.putReference(idnull, ref20);
            var idMkVs = charIDToTypeID("MkVs");
            desc96.putBoolean(idMkVs, false);
            var idLyrI = charIDToTypeID("LyrI");
            var list18 = new ActionList();
            list18.putInteger(5267);
            desc96.putList(idLyrI, list18);
            executeAction(idslct, desc96, DialogModes.NO);

            // =======================================================
            var idslct = charIDToTypeID("slct");
            var desc97 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref21 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            ref21.putName(idLyr, "HG");
            desc97.putReference(idnull, ref21);
            var idselectionModifier = stringIDToTypeID("selectionModifier");
            var idselectionModifierType = stringIDToTypeID("selectionModifierType");
            var idaddToSelection = stringIDToTypeID("addToSelection");
            desc97.putEnumerated(idselectionModifier, idselectionModifierType, idaddToSelection);
            var idMkVs = charIDToTypeID("MkVs");
            desc97.putBoolean(idMkVs, false);
            var idLyrI = charIDToTypeID("LyrI");
            var list19 = new ActionList();
            list19.putInteger(5624);
            list19.putInteger(5267);
            desc97.putList(idLyrI, list19);
            executeAction(idslct, desc97, DialogModes.NO);

            // =======================================================
            var idmodalStateChanged = stringIDToTypeID("modalStateChanged");
            var desc98 = new ActionDescriptor();
            var idLvl = charIDToTypeID("Lvl ");
            desc98.putInteger(idLvl, 1);
            var idStte = charIDToTypeID("Stte");
            var idStte = charIDToTypeID("Stte");
            var identer = stringIDToTypeID("enter");
            desc98.putEnumerated(idStte, idStte, identer);
            var idkcanDispatchWhileModal = stringIDToTypeID("kcanDispatchWhileModal");
            desc98.putBoolean(idkcanDispatchWhileModal, true);
            //executeAction( idmodalStateChanged, desc98, DialogModes.NO );

            // =======================================================
            var idmodalStateChanged = stringIDToTypeID("modalStateChanged");
            var desc99 = new ActionDescriptor();
            var idLvl = charIDToTypeID("Lvl ");
            desc99.putInteger(idLvl, 0);
            var idStte = charIDToTypeID("Stte");
            var idStte = charIDToTypeID("Stte");
            var idexit = stringIDToTypeID("exit");
            desc99.putEnumerated(idStte, idStte, idexit);
            var idkcanDispatchWhileModal = stringIDToTypeID("kcanDispatchWhileModal");
            desc99.putBoolean(idkcanDispatchWhileModal, true);
            //executeAction( idmodalStateChanged, desc99, DialogModes.NO );

            // =======================================================
            var idMk = charIDToTypeID("Mk  ");
            var desc100 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref22 = new ActionReference();
            var idDcmn = charIDToTypeID("Dcmn");
            ref22.putClass(idDcmn);
            desc100.putReference(idnull, ref22);
            var idNm = charIDToTypeID("Nm  ");
            desc100.putString(idNm, newName);
            var idUsng = charIDToTypeID("Usng");
            var ref23 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            var idOrdn = charIDToTypeID("Ordn");
            var idTrgt = charIDToTypeID("Trgt");
            ref23.putEnumerated(idLyr, idOrdn, idTrgt);
            desc100.putReference(idUsng, ref23);
            var idVrsn = charIDToTypeID("Vrsn");
            desc100.putInteger(idVrsn, 5);
            executeAction(idMk, desc100, DialogModes.NO);





            var postfix = "-de";
            main(postfix);
        }
        //=======================================================
        function lokaEn() {

            // =======================================================
            var idslct = charIDToTypeID("slct");
            var desc1221 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref595 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            ref595.putName(idLyr, "EN");
            desc1221.putReference(idnull, ref595);
            var idselectionModifier = stringIDToTypeID("selectionModifier");
            var idselectionModifierType = stringIDToTypeID("selectionModifierType");
            var idaddToSelection = stringIDToTypeID("addToSelection");
            desc1221.putEnumerated(idselectionModifier, idselectionModifierType, idaddToSelection);
            var idMkVs = charIDToTypeID("MkVs");
            desc1221.putBoolean(idMkVs, false);
            var idLyrI = charIDToTypeID("LyrI");
            var list385 = new ActionList();
            list385.putInteger(5);
            list385.putInteger(9);
            desc1221.putList(idLyrI, list385);
            executeAction(idslct, desc1221, DialogModes.NO);

            // =======================================================
            var idslct = charIDToTypeID("slct");
            var desc1222 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref596 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            ref596.putName(idLyr, "HG");
            desc1222.putReference(idnull, ref596);
            var idMkVs = charIDToTypeID("MkVs");
            desc1222.putBoolean(idMkVs, false);
            var idLyrI = charIDToTypeID("LyrI");
            var list386 = new ActionList();
            list386.putInteger(5);
            desc1222.putList(idLyrI, list386);
            executeAction(idslct, desc1222, DialogModes.NO);

            // =======================================================
            var idslct = charIDToTypeID("slct");
            var desc1223 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref597 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            ref597.putName(idLyr, "EN");
            desc1223.putReference(idnull, ref597);
            var idselectionModifier = stringIDToTypeID("selectionModifier");
            var idselectionModifierType = stringIDToTypeID("selectionModifierType");
            var idaddToSelection = stringIDToTypeID("addToSelection");
            desc1223.putEnumerated(idselectionModifier, idselectionModifierType, idaddToSelection);
            var idMkVs = charIDToTypeID("MkVs");
            desc1223.putBoolean(idMkVs, false);
            var idLyrI = charIDToTypeID("LyrI");
            var list387 = new ActionList();
            list387.putInteger(5);
            list387.putInteger(9);
            desc1223.putList(idLyrI, list387);
            executeAction(idslct, desc1223, DialogModes.NO);

            // =======================================================
            var idmodalStateChanged = stringIDToTypeID("modalStateChanged");
            var desc1224 = new ActionDescriptor();
            var idLvl = charIDToTypeID("Lvl ");
            desc1224.putInteger(idLvl, 1);
            var idStte = charIDToTypeID("Stte");
            var idStte = charIDToTypeID("Stte");
            var identer = stringIDToTypeID("enter");
            desc1224.putEnumerated(idStte, idStte, identer);
            var idkcanDispatchWhileModal = stringIDToTypeID("kcanDispatchWhileModal");
            desc1224.putBoolean(idkcanDispatchWhileModal, true);
            //executeAction( idmodalStateChanged, desc1224, DialogModes.NO );

            // =======================================================
            var idmodalStateChanged = stringIDToTypeID("modalStateChanged");
            var desc1225 = new ActionDescriptor();
            var idLvl = charIDToTypeID("Lvl ");
            desc1225.putInteger(idLvl, 0);
            var idStte = charIDToTypeID("Stte");
            var idStte = charIDToTypeID("Stte");
            var idexit = stringIDToTypeID("exit");
            desc1225.putEnumerated(idStte, idStte, idexit);
            var idkcanDispatchWhileModal = stringIDToTypeID("kcanDispatchWhileModal");
            desc1225.putBoolean(idkcanDispatchWhileModal, true);
            //executeAction( idmodalStateChanged, desc1225, DialogModes.NO );

            // =======================================================
            var idMk = charIDToTypeID("Mk  ");
            var desc1226 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref598 = new ActionReference();
            var idDcmn = charIDToTypeID("Dcmn");
            ref598.putClass(idDcmn);
            desc1226.putReference(idnull, ref598);
            var idNm = charIDToTypeID("Nm  ");
            desc1226.putString(idNm, newName);
            var idUsng = charIDToTypeID("Usng");
            var ref599 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            var idOrdn = charIDToTypeID("Ordn");
            var idTrgt = charIDToTypeID("Trgt");
            ref599.putEnumerated(idLyr, idOrdn, idTrgt);
            desc1226.putReference(idUsng, ref599);
            var idVrsn = charIDToTypeID("Vrsn");
            desc1226.putInteger(idVrsn, 5);
            executeAction(idMk, desc1226, DialogModes.NO);



            var postfix = "-en";
            main(postfix);
        }
        //=======================================================
        function lokaEs() {

            // =======================================================
            var idslct = charIDToTypeID("slct");
            var desc1295 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref639 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            ref639.putName(idLyr, "ES");
            desc1295.putReference(idnull, ref639);
            var idMkVs = charIDToTypeID("MkVs");
            desc1295.putBoolean(idMkVs, false);
            var idLyrI = charIDToTypeID("LyrI");
            var list408 = new ActionList();
            list408.putInteger(11);
            desc1295.putList(idLyrI, list408);
            executeAction(idslct, desc1295, DialogModes.NO);

            // =======================================================
            var idslct = charIDToTypeID("slct");
            var desc1296 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref640 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            ref640.putName(idLyr, "HG");
            desc1296.putReference(idnull, ref640);
            var idselectionModifier = stringIDToTypeID("selectionModifier");
            var idselectionModifierType = stringIDToTypeID("selectionModifierType");
            var idaddToSelection = stringIDToTypeID("addToSelection");
            desc1296.putEnumerated(idselectionModifier, idselectionModifierType, idaddToSelection);
            var idMkVs = charIDToTypeID("MkVs");
            desc1296.putBoolean(idMkVs, false);
            var idLyrI = charIDToTypeID("LyrI");
            var list409 = new ActionList();
            list409.putInteger(5);
            list409.putInteger(11);
            desc1296.putList(idLyrI, list409);
            executeAction(idslct, desc1296, DialogModes.NO);

            // =======================================================
            var idmodalStateChanged = stringIDToTypeID("modalStateChanged");
            var desc1297 = new ActionDescriptor();
            var idLvl = charIDToTypeID("Lvl ");
            desc1297.putInteger(idLvl, 1);
            var idStte = charIDToTypeID("Stte");
            var idStte = charIDToTypeID("Stte");
            var identer = stringIDToTypeID("enter");
            desc1297.putEnumerated(idStte, idStte, identer);
            var idkcanDispatchWhileModal = stringIDToTypeID("kcanDispatchWhileModal");
            desc1297.putBoolean(idkcanDispatchWhileModal, true);
            //executeAction( idmodalStateChanged, desc1297, DialogModes.NO );

            // =======================================================
            var idmodalStateChanged = stringIDToTypeID("modalStateChanged");
            var desc1298 = new ActionDescriptor();
            var idLvl = charIDToTypeID("Lvl ");
            desc1298.putInteger(idLvl, 0);
            var idStte = charIDToTypeID("Stte");
            var idStte = charIDToTypeID("Stte");
            var idexit = stringIDToTypeID("exit");
            desc1298.putEnumerated(idStte, idStte, idexit);
            var idkcanDispatchWhileModal = stringIDToTypeID("kcanDispatchWhileModal");
            desc1298.putBoolean(idkcanDispatchWhileModal, true);
            //executeAction( idmodalStateChanged, desc1298, DialogModes.NO );

            // =======================================================
            var idMk = charIDToTypeID("Mk  ");
            var desc1299 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref641 = new ActionReference();
            var idDcmn = charIDToTypeID("Dcmn");
            ref641.putClass(idDcmn);
            desc1299.putReference(idnull, ref641);
            var idNm = charIDToTypeID("Nm  ");
            desc1299.putString(idNm, newName);
            var idUsng = charIDToTypeID("Usng");
            var ref642 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            var idOrdn = charIDToTypeID("Ordn");
            var idTrgt = charIDToTypeID("Trgt");
            ref642.putEnumerated(idLyr, idOrdn, idTrgt);
            desc1299.putReference(idUsng, ref642);
            var idVrsn = charIDToTypeID("Vrsn");
            desc1299.putInteger(idVrsn, 5);
            executeAction(idMk, desc1299, DialogModes.NO);


            var postfix = "-es";
            main(postfix);
        }
        //=====================================================
        function lokaFr() {
            // =======================================================
            var idslct = charIDToTypeID("slct");
            var desc1525 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref701 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            ref701.putName(idLyr, "HG");
            desc1525.putReference(idnull, ref701);
            var idMkVs = charIDToTypeID("MkVs");
            desc1525.putBoolean(idMkVs, false);
            var idLyrI = charIDToTypeID("LyrI");
            var list457 = new ActionList();
            list457.putInteger(5);
            desc1525.putList(idLyrI, list457);
            executeAction(idslct, desc1525, DialogModes.NO);

            // =======================================================
            var idslct = charIDToTypeID("slct");
            var desc1526 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref702 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            ref702.putName(idLyr, "FR");
            desc1526.putReference(idnull, ref702);
            var idselectionModifier = stringIDToTypeID("selectionModifier");
            var idselectionModifierType = stringIDToTypeID("selectionModifierType");
            var idaddToSelection = stringIDToTypeID("addToSelection");
            desc1526.putEnumerated(idselectionModifier, idselectionModifierType, idaddToSelection);
            var idMkVs = charIDToTypeID("MkVs");
            desc1526.putBoolean(idMkVs, false);
            var idLyrI = charIDToTypeID("LyrI");
            var list458 = new ActionList();
            list458.putInteger(5);
            list458.putInteger(27);
            desc1526.putList(idLyrI, list458);
            executeAction(idslct, desc1526, DialogModes.NO);

            // =======================================================
            var idmodalStateChanged = stringIDToTypeID("modalStateChanged");
            var desc1527 = new ActionDescriptor();
            var idLvl = charIDToTypeID("Lvl ");
            desc1527.putInteger(idLvl, 1);
            var idStte = charIDToTypeID("Stte");
            var idStte = charIDToTypeID("Stte");
            var identer = stringIDToTypeID("enter");
            desc1527.putEnumerated(idStte, idStte, identer);
            var idkcanDispatchWhileModal = stringIDToTypeID("kcanDispatchWhileModal");
            desc1527.putBoolean(idkcanDispatchWhileModal, true);
            //executeAction( idmodalStateChanged, desc1527, DialogModes.NO );

            // =======================================================
            var idmodalStateChanged = stringIDToTypeID("modalStateChanged");
            var desc1528 = new ActionDescriptor();
            var idLvl = charIDToTypeID("Lvl ");
            desc1528.putInteger(idLvl, 0);
            var idStte = charIDToTypeID("Stte");
            var idStte = charIDToTypeID("Stte");
            var idexit = stringIDToTypeID("exit");
            desc1528.putEnumerated(idStte, idStte, idexit);
            var idkcanDispatchWhileModal = stringIDToTypeID("kcanDispatchWhileModal");
            desc1528.putBoolean(idkcanDispatchWhileModal, true);
            //executeAction( idmodalStateChanged, desc1528, DialogModes.NO );

            // =======================================================
            var idMk = charIDToTypeID("Mk  ");
            var desc1529 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref703 = new ActionReference();
            var idDcmn = charIDToTypeID("Dcmn");
            ref703.putClass(idDcmn);
            desc1529.putReference(idnull, ref703);
            var idNm = charIDToTypeID("Nm  ");
            desc1529.putString(idNm, newName);
            var idUsng = charIDToTypeID("Usng");
            var ref704 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            var idOrdn = charIDToTypeID("Ordn");
            var idTrgt = charIDToTypeID("Trgt");
            ref704.putEnumerated(idLyr, idOrdn, idTrgt);
            desc1529.putReference(idUsng, ref704);
            var idVrsn = charIDToTypeID("Vrsn");
            desc1529.putInteger(idVrsn, 5);
            executeAction(idMk, desc1529, DialogModes.NO);

            var postfix = "-fr";
            main(postfix);

        }
        //=======================================================
        function lokaIt() {

            // =======================================================
            var idslct = charIDToTypeID("slct");
            var desc1571 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref719 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            ref719.putName(idLyr, "HG");
            desc1571.putReference(idnull, ref719);
            var idMkVs = charIDToTypeID("MkVs");
            desc1571.putBoolean(idMkVs, false);
            var idLyrI = charIDToTypeID("LyrI");
            var list466 = new ActionList();
            list466.putInteger(5);
            desc1571.putList(idLyrI, list466);
            executeAction(idslct, desc1571, DialogModes.NO);

            // =======================================================
            var idslct = charIDToTypeID("slct");
            var desc1572 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref720 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            ref720.putName(idLyr, "IT");
            desc1572.putReference(idnull, ref720);
            var idselectionModifier = stringIDToTypeID("selectionModifier");
            var idselectionModifierType = stringIDToTypeID("selectionModifierType");
            var idaddToSelection = stringIDToTypeID("addToSelection");
            desc1572.putEnumerated(idselectionModifier, idselectionModifierType, idaddToSelection);
            var idMkVs = charIDToTypeID("MkVs");
            desc1572.putBoolean(idMkVs, false);
            var idLyrI = charIDToTypeID("LyrI");
            var list467 = new ActionList();
            list467.putInteger(5);
            list467.putInteger(22);
            desc1572.putList(idLyrI, list467);
            executeAction(idslct, desc1572, DialogModes.NO);

            // =======================================================
            var idmodalStateChanged = stringIDToTypeID("modalStateChanged");
            var desc1573 = new ActionDescriptor();
            var idLvl = charIDToTypeID("Lvl ");
            desc1573.putInteger(idLvl, 1);
            var idStte = charIDToTypeID("Stte");
            var idStte = charIDToTypeID("Stte");
            var identer = stringIDToTypeID("enter");
            desc1573.putEnumerated(idStte, idStte, identer);
            var idkcanDispatchWhileModal = stringIDToTypeID("kcanDispatchWhileModal");
            desc1573.putBoolean(idkcanDispatchWhileModal, true);
            //executeAction( idmodalStateChanged, desc1573, DialogModes.NO );

            // =======================================================
            var idmodalStateChanged = stringIDToTypeID("modalStateChanged");
            var desc1574 = new ActionDescriptor();
            var idLvl = charIDToTypeID("Lvl ");
            desc1574.putInteger(idLvl, 0);
            var idStte = charIDToTypeID("Stte");
            var idStte = charIDToTypeID("Stte");
            var idexit = stringIDToTypeID("exit");
            desc1574.putEnumerated(idStte, idStte, idexit);
            var idkcanDispatchWhileModal = stringIDToTypeID("kcanDispatchWhileModal");
            desc1574.putBoolean(idkcanDispatchWhileModal, true);
            //executeAction( idmodalStateChanged, desc1574, DialogModes.NO );

            // =======================================================
            var idMk = charIDToTypeID("Mk  ");
            var desc1575 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref721 = new ActionReference();
            var idDcmn = charIDToTypeID("Dcmn");
            ref721.putClass(idDcmn);
            desc1575.putReference(idnull, ref721);
            var idNm = charIDToTypeID("Nm  ");
            desc1575.putString(idNm, newName);
            var idUsng = charIDToTypeID("Usng");
            var ref722 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            var idOrdn = charIDToTypeID("Ordn");
            var idTrgt = charIDToTypeID("Trgt");
            ref722.putEnumerated(idLyr, idOrdn, idTrgt);
            desc1575.putReference(idUsng, ref722);
            var idVrsn = charIDToTypeID("Vrsn");
            desc1575.putInteger(idVrsn, 5);
            executeAction(idMk, desc1575, DialogModes.NO);



            var postfix = "-it";
            main(postfix);
        }
        //=======================================================
        function lokaNl() {

            // =======================================================
            var idslct = charIDToTypeID("slct");
            var desc1639 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref746 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            ref746.putName(idLyr, "HG");
            desc1639.putReference(idnull, ref746);
            var idMkVs = charIDToTypeID("MkVs");
            desc1639.putBoolean(idMkVs, false);
            var idLyrI = charIDToTypeID("LyrI");
            var list484 = new ActionList();
            list484.putInteger(5);
            desc1639.putList(idLyrI, list484);
            executeAction(idslct, desc1639, DialogModes.NO);

            // =======================================================
            var idslct = charIDToTypeID("slct");
            var desc1640 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref747 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            ref747.putName(idLyr, "NL");
            desc1640.putReference(idnull, ref747);
            var idselectionModifier = stringIDToTypeID("selectionModifier");
            var idselectionModifierType = stringIDToTypeID("selectionModifierType");
            var idaddToSelection = stringIDToTypeID("addToSelection");
            desc1640.putEnumerated(idselectionModifier, idselectionModifierType, idaddToSelection);
            var idMkVs = charIDToTypeID("MkVs");
            desc1640.putBoolean(idMkVs, false);
            var idLyrI = charIDToTypeID("LyrI");
            var list485 = new ActionList();
            list485.putInteger(5);
            list485.putInteger(22);
            desc1640.putList(idLyrI, list485);
            executeAction(idslct, desc1640, DialogModes.NO);

            // =======================================================
            var idmodalStateChanged = stringIDToTypeID("modalStateChanged");
            var desc1641 = new ActionDescriptor();
            var idLvl = charIDToTypeID("Lvl ");
            desc1641.putInteger(idLvl, 1);
            var idStte = charIDToTypeID("Stte");
            var idStte = charIDToTypeID("Stte");
            var identer = stringIDToTypeID("enter");
            desc1641.putEnumerated(idStte, idStte, identer);
            var idkcanDispatchWhileModal = stringIDToTypeID("kcanDispatchWhileModal");
            desc1641.putBoolean(idkcanDispatchWhileModal, true);
            //executeAction( idmodalStateChanged, desc1641, DialogModes.NO );

            // =======================================================
            var idmodalStateChanged = stringIDToTypeID("modalStateChanged");
            var desc1642 = new ActionDescriptor();
            var idLvl = charIDToTypeID("Lvl ");
            desc1642.putInteger(idLvl, 0);
            var idStte = charIDToTypeID("Stte");
            var idStte = charIDToTypeID("Stte");
            var idexit = stringIDToTypeID("exit");
            desc1642.putEnumerated(idStte, idStte, idexit);
            var idkcanDispatchWhileModal = stringIDToTypeID("kcanDispatchWhileModal");
            desc1642.putBoolean(idkcanDispatchWhileModal, true);
            //executeAction( idmodalStateChanged, desc1642, DialogModes.NO );

            // =======================================================
            var idMk = charIDToTypeID("Mk  ");
            var desc1643 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref748 = new ActionReference();
            var idDcmn = charIDToTypeID("Dcmn");
            ref748.putClass(idDcmn);
            desc1643.putReference(idnull, ref748);
            var idNm = charIDToTypeID("Nm  ");
            desc1643.putString(idNm, newName);
            var idUsng = charIDToTypeID("Usng");
            var ref749 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            var idOrdn = charIDToTypeID("Ordn");
            var idTrgt = charIDToTypeID("Trgt");
            ref749.putEnumerated(idLyr, idOrdn, idTrgt);
            desc1643.putReference(idUsng, ref749);
            var idVrsn = charIDToTypeID("Vrsn");
            desc1643.putInteger(idVrsn, 5);
            executeAction(idMk, desc1643, DialogModes.NO);



            var postfix = "-nl";
            main(postfix);
        }
        //=======================================================
        function lokaPl() {

            // =======================================================
            var idslct = charIDToTypeID("slct");
            var desc1682 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref761 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            ref761.putName(idLyr, "PL");
            desc1682.putReference(idnull, ref761);
            var idMkVs = charIDToTypeID("MkVs");
            desc1682.putBoolean(idMkVs, false);
            var idLyrI = charIDToTypeID("LyrI");
            var list495 = new ActionList();
            list495.putInteger(25);
            desc1682.putList(idLyrI, list495);
            executeAction(idslct, desc1682, DialogModes.NO);

            // =======================================================
            var idslct = charIDToTypeID("slct");
            var desc1683 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref762 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            ref762.putName(idLyr, "HG");
            desc1683.putReference(idnull, ref762);
            var idselectionModifier = stringIDToTypeID("selectionModifier");
            var idselectionModifierType = stringIDToTypeID("selectionModifierType");
            var idaddToSelection = stringIDToTypeID("addToSelection");
            desc1683.putEnumerated(idselectionModifier, idselectionModifierType, idaddToSelection);
            var idMkVs = charIDToTypeID("MkVs");
            desc1683.putBoolean(idMkVs, false);
            var idLyrI = charIDToTypeID("LyrI");
            var list496 = new ActionList();
            list496.putInteger(5);
            list496.putInteger(25);
            desc1683.putList(idLyrI, list496);
            executeAction(idslct, desc1683, DialogModes.NO);

            // =======================================================
            var idmodalStateChanged = stringIDToTypeID("modalStateChanged");
            var desc1684 = new ActionDescriptor();
            var idLvl = charIDToTypeID("Lvl ");
            desc1684.putInteger(idLvl, 1);
            var idStte = charIDToTypeID("Stte");
            var idStte = charIDToTypeID("Stte");
            var identer = stringIDToTypeID("enter");
            desc1684.putEnumerated(idStte, idStte, identer);
            var idkcanDispatchWhileModal = stringIDToTypeID("kcanDispatchWhileModal");
            desc1684.putBoolean(idkcanDispatchWhileModal, true);
            //executeAction( idmodalStateChanged, desc1684, DialogModes.NO );

            // =======================================================
            var idmodalStateChanged = stringIDToTypeID("modalStateChanged");
            var desc1685 = new ActionDescriptor();
            var idLvl = charIDToTypeID("Lvl ");
            desc1685.putInteger(idLvl, 0);
            var idStte = charIDToTypeID("Stte");
            var idStte = charIDToTypeID("Stte");
            var idexit = stringIDToTypeID("exit");
            desc1685.putEnumerated(idStte, idStte, idexit);
            var idkcanDispatchWhileModal = stringIDToTypeID("kcanDispatchWhileModal");
            desc1685.putBoolean(idkcanDispatchWhileModal, true);
            //executeAction( idmodalStateChanged, desc1685, DialogModes.NO );

            // =======================================================
            var idMk = charIDToTypeID("Mk  ");
            var desc1686 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref763 = new ActionReference();
            var idDcmn = charIDToTypeID("Dcmn");
            ref763.putClass(idDcmn);
            desc1686.putReference(idnull, ref763);
            var idNm = charIDToTypeID("Nm  ");
            desc1686.putString(idNm, newName);
            var idUsng = charIDToTypeID("Usng");
            var ref764 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            var idOrdn = charIDToTypeID("Ordn");
            var idTrgt = charIDToTypeID("Trgt");
            ref764.putEnumerated(idLyr, idOrdn, idTrgt);
            desc1686.putReference(idUsng, ref764);
            var idVrsn = charIDToTypeID("Vrsn");
            desc1686.putInteger(idVrsn, 5);
            executeAction(idMk, desc1686, DialogModes.NO);



            var postfix = "-pl";
            main(postfix);
        }
        //=======================================================
        function lokaRu() {

            // =======================================================
            var idslct = charIDToTypeID("slct");
            var desc1722 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref773 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            ref773.putName(idLyr, "RU");
            desc1722.putReference(idnull, ref773);
            var idMkVs = charIDToTypeID("MkVs");
            desc1722.putBoolean(idMkVs, false);
            var idLyrI = charIDToTypeID("LyrI");
            var list505 = new ActionList();
            list505.putInteger(28);
            desc1722.putList(idLyrI, list505);
            executeAction(idslct, desc1722, DialogModes.NO);

            // =======================================================
            var idslct = charIDToTypeID("slct");
            var desc1723 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref774 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            ref774.putName(idLyr, "HG");
            desc1723.putReference(idnull, ref774);
            var idselectionModifier = stringIDToTypeID("selectionModifier");
            var idselectionModifierType = stringIDToTypeID("selectionModifierType");
            var idaddToSelection = stringIDToTypeID("addToSelection");
            desc1723.putEnumerated(idselectionModifier, idselectionModifierType, idaddToSelection);
            var idMkVs = charIDToTypeID("MkVs");
            desc1723.putBoolean(idMkVs, false);
            var idLyrI = charIDToTypeID("LyrI");
            var list506 = new ActionList();
            list506.putInteger(5);
            list506.putInteger(28);
            desc1723.putList(idLyrI, list506);
            executeAction(idslct, desc1723, DialogModes.NO);

            // =======================================================
            var idmodalStateChanged = stringIDToTypeID("modalStateChanged");
            var desc1724 = new ActionDescriptor();
            var idLvl = charIDToTypeID("Lvl ");
            desc1724.putInteger(idLvl, 1);
            var idStte = charIDToTypeID("Stte");
            var idStte = charIDToTypeID("Stte");
            var identer = stringIDToTypeID("enter");
            desc1724.putEnumerated(idStte, idStte, identer);
            var idkcanDispatchWhileModal = stringIDToTypeID("kcanDispatchWhileModal");
            desc1724.putBoolean(idkcanDispatchWhileModal, true);
            //executeAction( idmodalStateChanged, desc1724, DialogModes.NO );

            // =======================================================
            var idmodalStateChanged = stringIDToTypeID("modalStateChanged");
            var desc1725 = new ActionDescriptor();
            var idLvl = charIDToTypeID("Lvl ");
            desc1725.putInteger(idLvl, 0);
            var idStte = charIDToTypeID("Stte");
            var idStte = charIDToTypeID("Stte");
            var idexit = stringIDToTypeID("exit");
            desc1725.putEnumerated(idStte, idStte, idexit);
            var idkcanDispatchWhileModal = stringIDToTypeID("kcanDispatchWhileModal");
            desc1725.putBoolean(idkcanDispatchWhileModal, true);
            //executeAction( idmodalStateChanged, desc1725, DialogModes.NO );

            // =======================================================
            var idMk = charIDToTypeID("Mk  ");
            var desc1726 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref775 = new ActionReference();
            var idDcmn = charIDToTypeID("Dcmn");
            ref775.putClass(idDcmn);
            desc1726.putReference(idnull, ref775);
            var idNm = charIDToTypeID("Nm  ");
            desc1726.putString(idNm, newName);
            var idUsng = charIDToTypeID("Usng");
            var ref776 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            var idOrdn = charIDToTypeID("Ordn");
            var idTrgt = charIDToTypeID("Trgt");
            ref776.putEnumerated(idLyr, idOrdn, idTrgt);
            desc1726.putReference(idUsng, ref776);
            var idVrsn = charIDToTypeID("Vrsn");
            desc1726.putInteger(idVrsn, 5);
            executeAction(idMk, desc1726, DialogModes.NO);



            var postfix = "-ru";
            main(postfix);
        }
        //=======================================================
        function lokaTr() {

            // =======================================================
            var idslct = charIDToTypeID("slct");
            var desc1763 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref787 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            ref787.putName(idLyr, "TR");
            desc1763.putReference(idnull, ref787);
            var idMkVs = charIDToTypeID("MkVs");
            desc1763.putBoolean(idMkVs, false);
            var idLyrI = charIDToTypeID("LyrI");
            var list514 = new ActionList();
            list514.putInteger(31);
            desc1763.putList(idLyrI, list514);
            executeAction(idslct, desc1763, DialogModes.NO);

            // =======================================================
            var idslct = charIDToTypeID("slct");
            var desc1764 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref788 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            ref788.putName(idLyr, "HG");
            desc1764.putReference(idnull, ref788);
            var idselectionModifier = stringIDToTypeID("selectionModifier");
            var idselectionModifierType = stringIDToTypeID("selectionModifierType");
            var idaddToSelection = stringIDToTypeID("addToSelection");
            desc1764.putEnumerated(idselectionModifier, idselectionModifierType, idaddToSelection);
            var idMkVs = charIDToTypeID("MkVs");
            desc1764.putBoolean(idMkVs, false);
            var idLyrI = charIDToTypeID("LyrI");
            var list515 = new ActionList();
            list515.putInteger(5);
            list515.putInteger(31);
            desc1764.putList(idLyrI, list515);
            executeAction(idslct, desc1764, DialogModes.NO);

            // =======================================================
            var idmodalStateChanged = stringIDToTypeID("modalStateChanged");
            var desc1765 = new ActionDescriptor();
            var idLvl = charIDToTypeID("Lvl ");
            desc1765.putInteger(idLvl, 1);
            var idStte = charIDToTypeID("Stte");
            var idStte = charIDToTypeID("Stte");
            var identer = stringIDToTypeID("enter");
            desc1765.putEnumerated(idStte, idStte, identer);
            var idkcanDispatchWhileModal = stringIDToTypeID("kcanDispatchWhileModal");
            desc1765.putBoolean(idkcanDispatchWhileModal, true);
            //executeAction( idmodalStateChanged, desc1765, DialogModes.NO );

            // =======================================================
            var idmodalStateChanged = stringIDToTypeID("modalStateChanged");
            var desc1766 = new ActionDescriptor();
            var idLvl = charIDToTypeID("Lvl ");
            desc1766.putInteger(idLvl, 0);
            var idStte = charIDToTypeID("Stte");
            var idStte = charIDToTypeID("Stte");
            var idexit = stringIDToTypeID("exit");
            desc1766.putEnumerated(idStte, idStte, idexit);
            var idkcanDispatchWhileModal = stringIDToTypeID("kcanDispatchWhileModal");
            desc1766.putBoolean(idkcanDispatchWhileModal, true);
            //executeAction( idmodalStateChanged, desc1766, DialogModes.NO );

            // =======================================================
            var idMk = charIDToTypeID("Mk  ");
            var desc1767 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref789 = new ActionReference();
            var idDcmn = charIDToTypeID("Dcmn");
            ref789.putClass(idDcmn);
            desc1767.putReference(idnull, ref789);
            var idNm = charIDToTypeID("Nm  ");
            desc1767.putString(idNm, newName);
            var idUsng = charIDToTypeID("Usng");
            var ref790 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            var idOrdn = charIDToTypeID("Ordn");
            var idTrgt = charIDToTypeID("Trgt");
            ref790.putEnumerated(idLyr, idOrdn, idTrgt);
            desc1767.putReference(idUsng, ref790);
            var idVrsn = charIDToTypeID("Vrsn");
            desc1767.putInteger(idVrsn, 5);
            executeAction(idMk, desc1767, DialogModes.NO);



            var postfix = "-tr";
            main(postfix);
        }
        //=======================================================
        //======================Save Thing==========================
        //=======================================================


        function main(postfix) {
            activeDocument.mergeVisibleLayers();

            if (checkTontrennung.value === true) {

                var idPstr = charIDToTypeID("Pstr");
                var desc28 = new ActionDescriptor();
                var idLvls = charIDToTypeID("Lvls");
                desc28.putInteger(idLvls, value.text);
                executeAction(idPstr, desc28, DialogModes.NO);
            }
            
            if (checkCrop.value === true) {
            activeDocument.mergeVisibleLayers();  
            activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);  
            }
            
            if (radioPNG.value === true) {
                var saveFile = File(oldPath + "/" + newName + postfix + ".png");
                SavePNG(saveFile);
            } else {
                var saveFile = File(oldPath + "/" + newName + postfix + ".jpg");
                SaveJPG(saveFile);
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
        }
        //========================================================

        //copyHG();
        lokaDe();
        lokaEn();
        lokaEs();
        lokaFr();
        lokaIt();
        lokaNl();
        lokaPl();
        lokaRu();
        lokaTr();
        w.close();
    }


    w.show();
    // =======================================================
    /*function copyHG() {
    	var idslct = charIDToTypeID("slct");
    	var desc804 = new ActionDescriptor();
    	var idnull = charIDToTypeID("null");
    	var ref397 = new ActionReference();
    	var idLyr = charIDToTypeID("Lyr ");
    	ref397.putName(idLyr, "HG");
    	desc804.putReference(idnull, ref397);
    	var idMkVs = charIDToTypeID("MkVs");
    	desc804.putBoolean(idMkVs, false);
    	var idLyrI = charIDToTypeID("LyrI");
    	var list254 = new ActionList();
    	list254.putInteger(5);
    	desc804.putList(idLyrI, list254);
    	executeAction(idslct, desc804, DialogModes.NO);

    	// =======================================================
    	var idMk = charIDToTypeID("Mk  ");
    	var desc769 = new ActionDescriptor();
    	var idnull = charIDToTypeID("null");
    	var ref381 = new ActionReference();
    	var idDcmn = charIDToTypeID("Dcmn");
    	ref381.putClass(idDcmn);
    	desc769.putReference(idnull, ref381);
    	var idNm = charIDToTypeID("Nm  ");
    	desc769.putString(charIDToTypeID('Nm  '), newName);
    	var idUsng = charIDToTypeID("Usng");
    	var ref382 = new ActionReference();
    	var idLyr = charIDToTypeID("Lyr ");
    	var idOrdn = charIDToTypeID("Ordn");
    	var idTrgt = charIDToTypeID("Trgt");
    	ref382.putEnumerated(idLyr, idOrdn, idTrgt);
    	desc769.putReference(idUsng, ref382);
    	var idVrsn = charIDToTypeID("Vrsn");
    	desc769.putInteger(idVrsn, 5);
    	executeAction(idMk, desc769, DialogModes.NO);
    }*/

}

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