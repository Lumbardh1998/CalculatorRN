
// Klasa e operatorit gjenerik. Implementimi i operatorëve individualë do të përcaktohet në OperatorCache.
// "evaluate" duhet të jetë një funksion që merr një shembull global.swisscalc.lib.shuntingYard si parametër dhe kthen rezultatin.
global.swisscalc = global.swisscalc || {};
global.swisscalc.lib = global.swisscalc.lib || {};
global.swisscalc.lib.operator = function(arity, associativity, precedence, numOperands, isOpenParen, isCloseParen, evaluate) {
	this.Arity 			= arity;
	this.Associativity 	= associativity;
	this.Precedence 	= precedence;
	this.NumOperands 	= numOperands;
	this.IsOpenParen 	= isOpenParen;
	this.IsCloseParen = isCloseParen;
	this.evaluate   	= evaluate;
};

// Konstantet
global.swisscalc.lib.operator.ARITY_NULLARY 		= 0;
global.swisscalc.lib.operator.ARITY_UNARY 			= 1;
global.swisscalc.lib.operator.ARITY_BINARY 		= 2;
global.swisscalc.lib.operator.ASSOCIATIVITY_NONE 	= 0;
global.swisscalc.lib.operator.ASSOCIATIVITY_RIGHT 	= 1;
global.swisscalc.lib.operator.ASSOCIATIVITY_LEFT 	= 2;

// Funksionet statike
global.swisscalc.lib.operator.degreesToRadians = function(degrees) { return degrees * (Math.PI / 180.0); };
global.swisscalc.lib.operator.radiansToDegrees = function(radians) { return radians * (180.0 / Math.PI); };

// Rikthen true nëse përparësia është më e lartë se operatori i dhënë
global.swisscalc.lib.operator.prototype.isHigherPrecedence = function(operator) {
	if (this.Precedence == operator.Precedence)
		return (this.Associativity == global.swisscalc.lib.operator.ASSOCIATIVITY_LEFT);
	return (this.Precedence > operator.Precedence);
};