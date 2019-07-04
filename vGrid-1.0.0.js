/*
 * vGrid JavaScript framework v1.0.0
 * https://framework.vilshub.com/
 *
 *
 * Released under the MIT license
 * https://framework.vilshub.com/license
 *
 * Date: 2019-06-20T22:30Z
 */

"use strict";

/**************************Helper functions***********************/
function roundToDec(value, decimals) {
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
};
function validateNumber(number){
	if (typeof number != "number"){
		throw new TypeError("Please provide a real number");
	}else{
		return true;
	}
};
function validateString(string){
	if (typeof string != "string"){
		throw new TypeError("Please provide a string");
	}else{
		return true;
	}
};
function getStyles(element, property){
	if(window.getComputedStyle){
		var styleHandler = getComputedStyle(element, null);
	}else{
		var styleHandler = element.currentStyle;
	}
	var propertyValue = styleHandler[property];
	return propertyValue;
}
/*****************************************************************/

function vGrid (){
	var self = this;
	var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	var gridCon = document.createElement("div");
	var gridControllers = document.createElement("div");
	var root = document.querySelector("html");
	var toolOverlay = document.createElement("div");
	var gridToolButton = document.createElement("div");
	var modalScrollControl = 0, crntY = 0, crntX = 0 , height=25, baseFontSize=16, lineColor="black", toolFontColor="black";
	var fontSizeToolContent = '<h3>Font size hierarchy</h3>\
								<div class="vGridTool">\
									<table border="0">\
										<tbody>\
											<tr>\
				  								<td>Scale ratio</td>\
											</tr>\
											<tr>\
				  								<td><input type="text" id="vScaleRatio"></td>\
											</tr>\
			  							</tbody>\
									</table>\
								<div class="vGridToolDisplay">\
									<table border="0">\
										 <tbody>\
										 </tbody>\
									</table>\
								</div>\
									<button id="vfontsizeBt">Close</button>\
								</div>';
	var baseLineheightToolContent = '<h3>Baseline grid size multiples</h3>\
										<div class="vGridTool">\
											<div class="vGridToolDisplay" >\
												<table border="0">\
												  <tbody>\
												  </tbody>\
												</table>\
											</div>\
											<button id="vbaselineBt">Close</button>\
										</div>';
	var unitConverterContent = '<h3>Unit converter</h3>\
		<div class="vGridTool">\
			<div class="vGridToolDisplay" >\
				<div id="vUnitsCon">\
					<div id="vLeft">\
						<span> From </span>\
						<table width="100%" border="0">\
						  <tbody>\
							<tr>\
							  <td>rem</td>\
							  <td>px</td>\
							</tr>\
							<tr>\
							  <td><input type="radio" name="funit" value="rem" checked="checked"/></td>\
							  <td><input type="radio" name="funit" value="px"/></td>\
							</tr>\
						  </tbody>\
						</table>\
					</div>\
					<div id="vRight">\
						<span> To </span>\
						<table width="100%" border="0">\
						  <tbody>\
							<tr>\
							  <td>rem</td>\
							  <td>px</td>\
							</tr>\
							<tr>\
							  <td><input type="radio" name="tunit" value="rem"/></td>\
							  <td><input type="radio" name="tunit" value="px" checked="checked"/></td>\
							</tr>\
						  </tbody>\
						</table>\
					</div>\
				</div>\
				<table border="0">\
					<tbody>\
						<tr>\
							<td><input type="text" id="vfrom"></td>\
							<td><input type="text" id="vto" readonly></td>\
						</tr>\
					</tbody>\
				</table>\
			</div>\
			<button id="vcalcBt">Close</button>\
		</div>';
	var gotoContent = '<h3>Goto x grid multiple</h3>\
		<div class="vGridTool">\
			<div id="vGotoLevel">\
				<div id="inputField">\
					<table border="0">\
						<tbody>\
							<tr>\
								<td>Goto baseline grid level</td>\
							</tr>\
							<tr>\
								<td><input type="text" id="vGoto"></td>\
							</tr>\
						</tbody>\
					</table>\
					<div class="vGridToolDisplay">\
						<table border="0">\
							 <tbody>\
							 </tbody>\
						</table>\
					</div>\
				</div>\
			</div>\
			<button id="vgotoBt">Close</button>\
		</div>';

	/******Grid tool font size************/
	function fontSizeHierarchy(){
		modalScrollControl =1;
		crntY = window.scrollY;
		crntX = window.scrollX;
		var ratioInput = document.getElementById("vScaleRatio");
		var displayCon = document.querySelector(".vGridToolDisplay table tbody");
		var level = -3;
		var bn = 1;
		var tobckresult = [];
		var ratio = ratioInput.value;
		var result = baseFontSize;
		var template = "";
		level = -3;
		bn = 1
		displayCon.innerHTML = "";

		if(ratio > 0){
			for(var x=0; x<=8 ; x++){
				if (x <= 1){
					var result = Math.round(result/ratio);
					tobckresult[x] = result;
					if(x == 1){
						for(var y =0; y<tobckresult.length; y++){
							var template = "<tr>\
									<td>Level "+level+"</td>\
									<td>"+tobckresult[bn]+"px</td>\
								</tr>";
							displayCon.innerHTML += template;
							level++;
							bn --;
						}
						result = baseFontSize;
						level += 2;
					}
				}else{

					template = "<tr>\
									<td>Level "+level+"</td>\
									<td>"+result+"px</td>\
								</tr>";
					displayCon.innerHTML += template;
					level++;
					result = Math.round(result*ratio);
				}

			}
		}
	}
	/*************************************/

	/******Grid tool Baseline height multiples************/
	function baseLineHeightHierarchy (){
		modalScrollControl =1;
		crntY = window.scrollY;
		crntX = window.scrollX;
		var displayCon = document.querySelector(".vGridToolDisplay table tbody");
		var baselineHeight = height;
		var level = -3;
		var bn = 1;
		var tobckresult = [];
		var template = "";
		displayCon.innerHTML = "";
		for(var x=0; x<=12 ; x++){
			if (x <= 1){
				var result = height;
				tobckresult[x] = result;
				if(x == 1){
					for(var y =0; y<tobckresult.length; y++){
						template = "<tr>\
								<td>Level "+level+"</td>\
								<td>"+tobckresult[bn]+"px</td>\
							</tr>";
						displayCon.innerHTML += template;
						level++;
						bn --;
					}
					result = height;
					level += 2;
				}
			}else{
				result = level*height;
				template = "<tr>\
								<td>Level "+level+"</td>\
								<td>"+result+"px</td>\
							</tr>";
				displayCon.innerHTML += template;
				level++;
			}

		}
	}
	/****************************************************/

	/******Grid tool unit conerter************/
	function unitConvert(){
		var fromInput = document.getElementById("vfrom");
		var toInput = document.getElementById("vto");
		var fromUnit = document.getElementById("vLeft").querySelector("input[type='radio']:checked");
		var toUnit = document.getElementById("vRight").querySelector("input[type='radio']:checked");
		var result = 20;
		if (fromInput.value > 0){
			if(fromUnit.value == "rem" && toUnit.value == "px"){
				result = Math.round(fromInput.value * 16);
			}else if(fromUnit.value == "px" && toUnit.value == "rem"){
				result = roundToDec((fromInput.value / 16), 2);
			}else if (fromUnit.value == "rem" && toUnit.value == "rem"){
				result = fromInput.value;
			}else if (fromUnit.value == "px" && toUnit.value == "px"){
				result = fromInput.value;
			}
			toInput.value = result;
		}else{
			toInput.value = 0;
		}
	}
	/*****************************************/

	/******Grid tool goto level************/
	function gotoLevel(){
		modalScrollControl =1;
		crntY = window.scrollY;
		crntX = window.scrollX;
		var levelInput = document.getElementById("vGoto");
		var displayCon = document.querySelector(".vGridToolDisplay table tbody");
		var level = levelInput.value;
		var baseHeight = height;
		var result = baseHeight*level;
		var template = "<tr>\
						<td>Level "+level+"</td>\
						<td>"+result+"px</td>\
					</tr>";
		displayCon.innerHTML = template;
	}
	/*************************************/

	/******Get root base properties************/
	function getRootBaseProperties(){
		var fontSize = getStyles(root, "font-size");
		var lineHeight = getStyles(root, "line-height");

		////set font size
		baseFontSize = parseInt(fontSize, "px");

		//set line height
		height = parseInt(lineHeight, "px");
	}

	/************Set up grid***************/
	function setUpGrid(){
		svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
		svg.setAttribute("width", 1);
		svg.setAttribute("height", height);
		var background = "<rect x='0' y='0' height='"+height+"' width='1' style='fill:#00cc00 ;fill-opacity:0'/>";
		var line = "<line x1='0' y1='"+height+"' x2='1' y2='"+height+"' style='stroke:"+lineColor+"'/>";
		gridCon.setAttribute("class", "vGridCon");

		gridToolButton.setAttribute("id", "vGridToolsButtons");
		toolOverlay.setAttribute("id", "vGridToolsOverlay");
		gridToolButton.innerHTML = '<button id="vfontSizeHchy">Font size hierachy</button>\
							<button id="vbaseLineGridMutpl">Baseline grid multiples</button>\
							<button id="vConverter">Unit converter</button>\
							<button id="vGotoLvl">Goto x grid multiple</button>';
		toolOverlay.innerHTML = '<div  class="vGridToolCon" data-close="0"></div>'

		svg.innerHTML = "";
		svg.innerHTML += background;
		svg.innerHTML += line;
		var svgBlob = new Blob([svg.outerHTML], {type:"image/svg+xml;charset=utf-8"});
		var urlOBJ = URL.createObjectURL(svgBlob);
		gridCon.style["background-image"] = "url("+urlOBJ+")";

		/******Controllers************/
		gridControllers.setAttribute("class", "vGridController");
		gridControllers.innerHTML = "";
		gridControllers.innerHTML += "<button id='on'>ON</button>";
		gridControllers.innerHTML += "<button id='off'>OFF</button>";
		gridControllers.innerHTML += "<button id='exit'>EXIT</button>";

		root.style["height"] = root.scrollHeight+"px";
	}
	/***************************************/

	/************Assign event listeners***************/
	function assignEventListeners(){
		document.body.addEventListener("click", function(e){
			if(e.target.nodeName == "BUTTON" && e.target.id == "on"){
				document.body.append(gridCon);
			}else if(e.target.nodeName == "BUTTON" && e.target.id == "off"){
				var currentGrid = document.body.querySelector(".vGridCon");
				if (currentGrid != null){
					document.body.removeChild(currentGrid);
				};
			}else if(e.target.nodeName == "BUTTON" && e.target.id == "exit"){
				var controller = document.body.querySelector(".vGridController");
				var toolButtonCon = document.getElementById("vGridToolsButtons");
				var tconOverlay = document.getElementById("vGridToolsOverlay");
				var grid  = document.body.querySelector(".vGridCon");
				if (grid != null){
					document.body.removeChild(grid);
				};
				document.body.removeChild(controller);
				document.body.removeChild(tconOverlay);
				document.body.removeChild(toolButtonCon);
			}else if(e.target.nodeName == "BUTTON" && e.target.id == "vfontSizeHchy"){
				var tconOverlay = document.querySelector("#vGridToolsOverlay");
				var toolsCon = document.querySelector(".vGridToolCon");
				tconOverlay.style["display"] = "block";
				toolsCon.setAttribute("id", "vfontSize");
				toolsCon.innerHTML = fontSizeToolContent;
				toolsCon.scrollHeight;
				toolsCon.style["width"] = "250px";
				toolsCon.style["margin-left"] = "-125px";
				toolsCon.style["opacity"] = "1";
			}else if (e.target.nodeName == "BUTTON" && e.target.id == "vbaseLineGridMutpl"){
				var tconOverlay = document.querySelector("#vGridToolsOverlay");
				var toolsCon = document.querySelector(".vGridToolCon");
				tconOverlay.style["display"] = "block";
				toolsCon.setAttribute("id", "vbaseline");
				toolsCon.innerHTML = baseLineheightToolContent;
				toolsCon.scrollHeight;
				toolsCon.style["width"] = "220px";
				toolsCon.style["margin-left"] = "-110px";
				toolsCon.style["opacity"] = "1";
				baseLineHeightHierarchy();
			}else if (e.target.nodeName == "BUTTON" && e.target.id == "vConverter"){
				var tconOverlay = document.querySelector("#vGridToolsOverlay");
				var toolsCon = document.querySelector(".vGridToolCon");
				tconOverlay.style["display"] = "block";
				toolsCon.setAttribute("id", "vcalc");
				toolsCon.innerHTML = unitConverterContent;
				toolsCon.scrollHeight;
				toolsCon.style["width"] = "220px";
				toolsCon.style["margin-left"] = "-110px";
				toolsCon.style["opacity"] = "1";
			}else if (e.target.nodeName == "BUTTON" && e.target.id == "vGotoLvl"){
				var tconOverlay = document.querySelector("#vGridToolsOverlay");
				var toolsCon = document.querySelector(".vGridToolCon");
				tconOverlay.style["display"] = "block";
				toolsCon.setAttribute("id", "vgoto");
				toolsCon.innerHTML = gotoContent;
				toolsCon.scrollHeight;
				toolsCon.style["width"] = "280px";
				toolsCon.style["margin-left"] = "-140px";
				toolsCon.style["opacity"] = "1";
			}else if(e.target.nodeName == "BUTTON" && e.target.id == "vfontsizeBt" ){
				var toolsCon = document.querySelector(".vGridToolCon");
				toolsCon.setAttribute("data-close", "1");
				toolsCon.style["opacity"] = "0";
			}else if(e.target.nodeName == "BUTTON" && e.target.id == "vbaselineBt" ){
				var toolsCon = document.querySelector(".vGridToolCon");
				toolsCon.setAttribute("data-close", "1");
				toolsCon.style["opacity"] = "0";
			}else if(e.target.nodeName == "BUTTON" && e.target.id == "vcalcBt" ){
				var toolsCon = document.querySelector(".vGridToolCon");
				toolsCon.setAttribute("data-close", "1");
				toolsCon.style["opacity"] = "0";
			}else if(e.target.nodeName == "BUTTON" && e.target.id == "vgotoBt" ){
				var toolsCon = document.querySelector(".vGridToolCon");
				toolsCon.setAttribute("data-close", "1");
				toolsCon.style["opacity"] = "0";
			}

		}, false);
		document.body.addEventListener("transitionend", function(e){
			var tcon = document.querySelector(".vGridToolCon");
			if(e.target.nodeName == "DIV" && e.target.getAttribute("data-close") == "1"){
				var tconOverlay = document.querySelector("#vGridToolsOverlay");
				tcon.setAttribute("data-close", "0");
				tconOverlay.style["display"] = "none";
				modalScrollControl =0;
			}else if(e.target.nodeName == "DIV" && e.target.getAttribute("data-close") == "0"){
				modalScrollControl =1;
				crntY = window.scrollY;
				crntX = window.scrollX;
			}
		}, false);
		document.body.addEventListener("keyup", function(e){
			if(e.target.nodeName == "INPUT" && e.target.id == "vfrom" ){
				unitConvert();
			}
		}, false);
		document.body.addEventListener("change", function(e){
			if(e.target.nodeName == "INPUT" && e.target.id == "vfrom" ){
				unitConvert();
			}else if(e.target.nodeName == "INPUT" && e.target.type == "radio"){
				unitConvert();
			}
		}, false);
		document.body.addEventListener("change", function(e){
			if(e.target.nodeName == "INPUT" && e.target.id == "vScaleRatio"){
				fontSizeHierarchy();
			}
		}, false);
		document.body.addEventListener("keyup", function(e){
			if(e.target.nodeName == "INPUT" && e.target.id == "vScaleRatio"){
				fontSizeHierarchy();
			}
		}, false);
		window.addEventListener("scroll", function(){
			if (modalScrollControl == 1){
				scrollTo(crntX, crntY);
			}
		}, false)
		document.body.addEventListener("change", function(e){
			if(e.target.nodeName == "INPUT" && e.target.id == "vGoto"){
				 gotoLevel();
			}
		}, false);
		document.body.addEventListener("keyup", function(e){
			if(e.target.nodeName == "INPUT" && e.target.id == "vGoto"){
				 gotoLevel();
			}
		}, false);
		window.addEventListener("resize", function(){
			if(baseFontSize != parseInt(getStyles(root, "font-size"), "px")){
				getRootBaseProperties();
				setUpGrid();
			}
		}, false);
	}
	/*************************************************/
	this.initialize = function(){
		getRootBaseProperties();
		setUpGrid();
		assignEventListeners();
	}
	this.ForceONWithNoGrid = function(){
		document.body.append(gridControllers);
		document.body.append(gridToolButton);
		document.body.append(toolOverlay);

		var buttonsCon = document.getElementById("vGridToolsButtons");
		var controllerCon = document.querySelector(".vGridController");
		buttonsCon.style["color"] = toolFontColor;
		controllerCon.style["color"] = toolFontColor;
	}
	this.ForceONWithGrid = function(){
		document.body.append(gridCon);
		document.body.append(gridControllers);
		document.body.append(gridToolButton);
		document.body.append(toolOverlay);

		var buttonsCon = document.getElementById("vGridToolsButtons");
		var controllerCon = document.querySelector(".vGridController");
		buttonsCon.style["color"] = toolFontColor;
		controllerCon.style["color"] = toolFontColor;
	}
	Object.defineProperties(this, {
		baseFontSize:{
			set:function(value){
				if(validateNumber(value)){
					baseFontSize = value;
				}
			}
		},
		height:{
			set:function(value){
				if (validateNumber(value)){
					height = value;
				}
			}
		},
		lineColor:{
			set:function(value){
				if (validateString(value)){
					lineColor = value
				}
			}
		},
		toolFontColor:{
			set:function(value){
				if(validateString(value)){
					toolFontColor = value
				}
			}
		}
	});
};
