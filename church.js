// javascript
function JS_ADD(a, b){ return a + b }
function JS_SUBTRACT(a, b){ return a - b }
function JS_PRODUCT(a, b){ return a * b }
function JS_ADD_ONE(x){ return x + 1 }
function JS_SUB_ONE(x){ return x - 1 }
function JS_DIVIDE(a, b){ return a / b }

// church numerals
// http://matt.might.net/articles/js-church/

// JS -> Church
function JS_TO_CHURCH(n) {
  return (f) => (z) => {
   for (var i = 0; i < n; i++) 
     z = f(z);
   return z;
  };
};

// Church -> JS
function CHURCH_TO_JS(n) {
  return n ((x) => x+1) (0);
}


var CHURCH_SUCC = (n) => (f) => (z) => f (n (f) (z)) ;
var CHURCH_ZERO = (f) => (z) => z;
var CHURCH_ONE = SUCC(ZERO);
var CHURCH_TWO = SUCC(ONE);
// CHURCH_PLUS(m)(n) <-> JS_ADD(m, n)
// CHURCH_PLUS(ChuchNumeral: m)(ChurchNumeral: n): ChurchNumeral
var CHURCH_PLUS = (n) => (m) => (f) => (z) => (n(f) (m(f)(z))) ;
var CHURCH_MULT = (n) => (m) => (f) => (z) => (n (m(f)) (z)) ;
var CHURCH_POW = (n) => (x) => x((k) => CHURCH_MULT(k)(n))(CHURCH_ONE)
// Substract 1:
var CHURCH_PRED = (n) => (f) => (z) => ((n ((g) => ((h) => h(g(f))))) ((u) => z))((u) => u) ;
var CHURCH_SUB = (n) => (m) => (m(PRED))(n);


// unary strings
function UNARY_TO_JS(x){ return x.length }

function CHURCH_TO_UNARY(n) {
  return n ((x) => x+'|') ('');
}

function UNARY_ADD(a, b){ return a + b }
function UNARY_SUCCESSOR(x){ return x + '|' }





