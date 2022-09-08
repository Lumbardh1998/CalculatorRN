 
//Zbatimi i algoritmit Shunting Yard.
global.swisscalc = global.swisscalc || {};
global.swisscalc.lib = global.swisscalc.lib || {};
global.swisscalc.lib.shuntingYard = function() { 
	this._numOpenParen 	= 0;
	this._operands 		= [];
	this._operators 	= [];
	this._actionBuffer 	= [];
};

// Vëzhgon vlerën më të lartë në pirg. Kthen 0 nëse është bosh.

global.swisscalc.lib.shuntingYard.prototype.peekOperand = function() {
	var len = this._operands.length;
	return (len !== 0) ? this._operands[len-1] : 0.0;
};

// Shfaq vlerën më të lartë në pirg. Kthen 0 nëse është bosh.
global.swisscalc.lib.shuntingYard.prototype.popOperand = function() {
	var len = this._operands.length;
	return (len !== 0) ? this._operands.pop() : 0.0;
};

// Rikthen numrin e operandëve.
global.swisscalc.lib.shuntingYard.prototype.numOperands = function() {
	return this._operands.length;
};

//Shfaqet operatori më i lartë në pirg.
global.swisscalc.lib.shuntingYard.prototype.popOperator = function() {
	return this._actionBuffer.pop();
};

// Kthen numrin e operatorëve.
global.swisscalc.lib.shuntingYard.prototype.numOperators = function() {
	return this._actionBuffer.length;
};

//E kthen të vërtetë nëse nën-shprehja po vlerësohet aktualisht.
global.swisscalc.lib.shuntingYard.prototype.inSubExpression = function() {
	return this._numOpenParen > 0;
};

// Pastron të gjitha pirgjet.
global.swisscalc.lib.shuntingYard.prototype.clear = function() {
	this._operands.length = 0;
	this._operators.length = 0;
	this._actionBuffer.length = 0;
};

//Zbraz pirgun dhe kthen vlerësimin përfundimtar.
global.swisscalc.lib.shuntingYard.prototype.evaluate = function() {
	// Push all _actionBuffer to _operators...
    for (var i = 0; i < this._actionBuffer.length; i++)
        this._operators.push(this._actionBuffer[i]);
    this._actionBuffer.length = 0;
		
	// Vlerësoni të gjithë operatoret
	while (this._operators.length > 0) {
		var operator = this._operators.pop();
		this.applyOperator(operator);
	}
	
	// Kontrolloni për gabime dhe ktheni rezultatin.
	if (this._operands.length != 1)
		console.error("Invalid operand length (" + this._operands.length + ")");
        
	return this._operands.pop();
};

// Vlerëson operatorin e dhënë dhe i shton rezultatin operatoreve
global.swisscalc.lib.shuntingYard.prototype.applyOperator = function(operator) {
	var val = operator.evaluate(this);
	this.addOperand(val);
};

// Shton një operand në pirg.
global.swisscalc.lib.shuntingYard.prototype.addOperand = function(operand) {
	this._operands.push(operand);
};

// Shton operatorin e dhënë.
global.swisscalc.lib.shuntingYard.prototype.addOperator = function(operator) {
	if (operator.IsOpenParen) {
		this.addOpenParen(operator);
	} else if (operator.IsCloseParen) {
		this.addCloseParen(operator);
	} else if (operator.Arity == global.swisscalc.lib.operator.ARITY_NULLARY) {
		this.addNullaryOperator(operator);
	} else if (operator.Arity == global.swisscalc.lib.operator.ARITY_UNARY) {
		this.addUnaryOperator(operator);
	} else if (operator.Arity == global.swisscalc.lib.operator.ARITY_BINARY) {
		this.addBinaryOperator(operator);
	}
};

// Vlerëson Operatorin Nullary dhe e shtyn rezultatin në rafte.
global.swisscalc.lib.shuntingYard.prototype.addNullaryOperator = function(operator) {
	this.applyOperator(operator);
};

// Vlerëson Operatorin Nullary dhe e shtyn rezultatin në rafte.
global.swisscalc.lib.shuntingYard.prototype.addUnaryOperator = function(operator) {
	this.applyOperator(operator);
};

// Së pari shton operatorin në actionBuffer përpara se të angazhohet për ndonjë gjë.
global.swisscalc.lib.shuntingYard.prototype.addBinaryOperator = function(operator) {
	// Nëse jo kllapa, kryeni kontrollet e përparësisë si zakonisht.
	while (this._actionBuffer.length > 0)
	{
		// Nëse e para nuk është më e lartë, dilni...
		var abLen = this._actionBuffer.length;
		if (!this._actionBuffer[abLen-1].isHigherPrecedence(operator))
			break;
			
		var prevOperator = this._actionBuffer.pop();
		this.applyOperator(prevOperator);
	}
	
	this._actionBuffer.push(operator);
};

//Shton operatorin e kllapave të hapura. Thjesht shtohet te actionBuffer
global.swisscalc.lib.shuntingYard.prototype.addOpenParen = function(operator) {
	this._actionBuffer.push(operator);
	this._numOpenParen++;
};

// Shton operatorin e mbylljes së kllapave. Nxit operatorët derisa të arrihet hapja.
global.swisscalc.lib.shuntingYard.prototype.addCloseParen = function(operator) {
	// Injoro nëse nuk ka kllapa të hapura.
	if (this._numOpenParen === 0)
		return;
		
	this._numOpenParen--;
	while (this._actionBuffer.length > 0)
	{
		// Nëse hasni një prizë të hapur, kthehuni...
		var nextOperator = this._actionBuffer.pop();
		if (nextOperator.IsOpenParen)
			return;
			
		// Vlerësoni operatorin dhe më pas shtyjeni atë si operand...
		this.applyOperator(nextOperator);
	}
};