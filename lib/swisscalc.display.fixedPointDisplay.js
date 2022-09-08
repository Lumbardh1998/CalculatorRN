

// Klasa për shfaqjen e një numri me pikë fikse.

global.swisscalc = global.swisscalc || {};
global.swisscalc.display = global.swisscalc.display || {};

// Konstruktori.
// numDecimalPlaces: Numri i karaktereve për të treguar dhjetorin e kaluar (parazgjedhja: 2)
// maxLength: Numri maksimal i karaktereve për t'u shfaqur (parazgjedhja: 20)
global.swisscalc.display.fixedPointDisplay = function(numDecimalPlaces, maxLength) { 
	this._display = "";
	this._isNegative = false;
	this._numDecimalPlaces = (typeof numDecimalPlaces === "undefined") ? 2 : numDecimalPlaces;
	this._maxLength = (typeof maxLength === "undefined") ? 20 : maxLength;
};

// Rikthen ekranin aktual
global.swisscalc.display.fixedPointDisplay.prototype.getCurrentDisplay = function() { 
	var str = "";
	var len = this._display.length;		// Numri i karakterve
	var num = this._numDecimalPlaces;	// Numri i numrave dhjetorë
	
	// Nëse nuk ka shifra dhjetore, trajtojeni veçmas.
	if (num === 0) { 
		if (len === 0) return "0";							// Nese nuk ka karaktere ktheni 0
		if (this._isNegative) return "-" + this._display;	// Nese negative shto -
		return this._display;								// Përndryshe, shfaqni siç është
	}
	
	if (len > num) {
		var p1  = this._display.substring(0, len - num);
		var p2  = this._display.substring(len - num, len);
		str = p1 + "." + p2;
	} else if (len == num) {
		str = "0." + this._display;
	} else if (len < num) { 
		str = "0.";
		for (var i = 0; i < num - len; i++) str += "0";
		str += this._display;
	}
	
	if (this._isNegative) str = "-" + str;
	
	return str;
};

// Shton karakterin e dhënë në ekran, nëse është e përshtatshme.
// Shifrat e vetme të vlefshme janë: 0...9, . (dhjetore). Duhet të jetë një varg.
global.swisscalc.display.fixedPointDisplay.prototype.addDigit = function(digit) {
	// Mos e kaloni gjatësinë maksimale
	if (this._display.length >= this._maxLength)
		return;
		
	// Mos shtoni numra dhjetorë edhe pse thotë se mundeni
	if (digit == ".")
		return;
		
	// Nëse ekrani është bosh, mos shtoni asnjë 0
	if (this._display.length === 0 && digit == "0")
		return;
		
	// Shtoni shifrën në fund (shënim: '.' do të rezultojë në '0.').
	this._display += digit;
};

// Shton ose heq shenjën negative
global.swisscalc.display.fixedPointDisplay.prototype.negate = function() {
	this._isNegative = !this._isNegative;
};

// Heq karakterin e fundit nëse është e mundur
global.swisscalc.display.fixedPointDisplay.prototype.backspace = function() {
	var len = this._display.length;	
	if (len == 1)
		this._display = "";
	else if (len == 2 && this._display.charAt(0) == "-")
		this._display = "";
	else
		this._display = this._display.substring(0, len - 1);
};

// Pastron ekranin
global.swisscalc.display.fixedPointDisplay.prototype.clear = function() {
	this._display = "";
};

// Kthen pamjen si një vlerë numerike
global.swisscalc.display.fixedPointDisplay.prototype.getDisplayValue = function() {
	var sDisplay = this.getCurrentDisplay();
	return parseFloat(sDisplay);
};