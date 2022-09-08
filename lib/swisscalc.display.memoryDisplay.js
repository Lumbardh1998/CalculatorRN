
// Klasa për shfaqjen/ruajtjen e kujtesës në një kalkulator.

global.swisscalc = global.swisscalc || {};
global.swisscalc.display = global.swisscalc.display || {};
global.swisscalc.display.memoryDisplay = function() { 
	this._display = "";
	this._memValue = 0;
	this._hasMemory = false;
};

// Kthehet e vërtetë nëse memoria është caktuar.
global.swisscalc.display.memoryDisplay.prototype.hasMemory = function() {
	return this._hasMemory;
};

// Rikthen ekranin aktual
global.swisscalc.display.memoryDisplay.prototype.getCurrentDisplay = function() {
	return this._display;
};

// Rikthen vlerën e kujtesës.
global.swisscalc.display.memoryDisplay.prototype.memoryRecall = function() {
	return this._memValue;
};

// Vendos memorien në vlerën e dhënë.
global.swisscalc.display.memoryDisplay.prototype.memorySet = function(val) {
	this._hasMemory = true;
	this._memValue = val;
	this._display = "M";
};

// Shton numrin e dhënë në kujtesë.
global.swisscalc.display.memoryDisplay.prototype.memoryPlus = function(val) {
	this._hasMemory = true;
	this._memValue += val;
	this._display = "M";
};

// Zbret vlerën e dhënë nga kujtesa.
global.swisscalc.display.memoryDisplay.prototype.memoryMinus = function(val) {
	this._hasMemory = true;
	this._memValue -= val;
	this._display = "M";
};

//Pastron kujtesën.
global.swisscalc.display.memoryDisplay.prototype.memoryClear = function() {
	this._hasMemory = false;
	this._memValue = 0;
	this._display = "";
};
