
global.swisscalc = global.swisscalc || {};
global.swisscalc.lib = global.swisscalc.lib || {};
global.swisscalc.lib.format = function() {};

// Shton presje në vargun numerik të dhënë për shifrat e grupit.
global.swisscalc.lib.format.groupDigits = function(number) {
	var parts = number.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return parts.join(".");
};

// Formaton numrin e dhënë si varg monedhe 
global.swisscalc.lib.format.asUSCurrency = function(number) {
	var s = number.toFixed(2);
	s = global.swisscalc.lib.format.groupDigits(s);
	return (s.charAt(0) == "-")	? "-$" + s.substring(1)	: "$" + s;
};