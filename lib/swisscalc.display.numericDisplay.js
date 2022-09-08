
// Klasa për paraqitjen e një numri me pikë lundruese.

global.swisscalc = global.swisscalc || {};
global.swisscalc.display = global.swisscalc.display || {};

// Konstruktor.
// groupDigits: Shifrat duhet të grupohen me presje (true/false) (e parazgjedhur: e vërtetë)
// maxLength: Numri maksimal i karaktereve për t'u shfaqur (parazgjedhja: 20)
global.swisscalc.display.numericDisplay = function(groupDigits, maxLength) { 
	this._display = "0";
	this._groupDigits = (typeof groupDigits === "undefined") ? true : groupDigits;
	this._maxLength = (typeof maxLength === "undefined") ? 20 : maxLength;
};

// Rikthen ekranin aktual
global.swisscalc.display.numericDisplay.prototype.getCurrentDisplay = function() { 
	return (this._groupDigits)
		? global.swisscalc.lib.format.groupDigits(this._display)
		: this._display;
};

// Shton karakterin e dhënë në ekran, nëse është e përshtatshme.
// Shifrat e vetme të vlefshme janë: 0...9, . (dhjetore). Duhet të jetë një varg.
global.swisscalc.display.numericDisplay.prototype.addDigit = function(digit) {

//Mos e kaloni gjatësinë maksimale.
	if (this._display.length >= this._maxLength)
		return;
		
	// Mos shtoni disa dhjetore...
	if (digit == "." && this._display.indexOf(".") >= 0)
		return;
		
	// Nëse jo një dhjetore dhe ekrani është bosh, hiqni 0...
	if (digit != "." && this._display == "0")
		this._display = "";
		
	// Shtoni shifrën në fund (shënim: '.' do të rezultojë në '0.')...
	this._display += digit;
};

// Shton ose heq shenjën negative
global.swisscalc.display.numericDisplay.prototype.negate = function() {
	var fChar = this._display.charAt(0);
	this._display = (fChar == "-") ? this._display.substring(1) : "-" + this._display;
};

// Heq karakterin e fundit nëse është e mundur
global.swisscalc.display.numericDisplay.prototype.backspace = function() {
	var len = this._display.length;	
	if (len == 1)
		this._display = "0";
	else if (len == 2 && this._display.charAt(0) == "-")
		this._display = "0";
	else
		this._display = this._display.substring(0, len - 1);
};

// Pastron ekranin
global.swisscalc.display.numericDisplay.prototype.clear = function() {
	this._display = "0";
};
 
//Kthen pamjen si një vlerë numerike
global.swisscalc.display.numericDisplay.prototype.getDisplayValue = function() {
	return parseFloat(this._display);
};

// Formaton vlerën dhe vendos ekranin. "val" duhet të jetë një numër.
global.swisscalc.display.numericDisplay.prototype.setDisplayValue = function(val) {
	
// TODO: Mund të duhet të bëjë disa formatim/rrumbullakim.
	this._display = val.toString();
};
