(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (!x.$)
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}



// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var message = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + message);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.aX.J === region.Z.J)
	{
		return 'on line ' + region.aX.J;
	}
	return 'on lines ' + region.aX.J + ' through ' + region.Z.J;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

var _Json_decodeInt = { $: 2 };
var _Json_decodeBool = { $: 3 };
var _Json_decodeFloat = { $: 4 };
var _Json_decodeValue = { $: 5 };
var _Json_decodeString = { $: 6 };

function _Json_decodeList(decoder) { return { $: 7, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 8, b: decoder }; }

function _Json_decodeNull(value) { return { $: 9, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 10,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 11,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 12,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 13,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 14,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 15,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 3:
			return (typeof value === 'boolean')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a BOOL', value);

		case 2:
			if (typeof value !== 'number') {
				return _Json_expecting('an INT', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return elm$core$Result$Ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return elm$core$Result$Ok(value);
			}

			return _Json_expecting('an INT', value);

		case 4:
			return (typeof value === 'number')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a FLOAT', value);

		case 6:
			return (typeof value === 'string')
				? elm$core$Result$Ok(value)
				: (value instanceof String)
					? elm$core$Result$Ok(value + '')
					: _Json_expecting('a STRING', value);

		case 9:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 5:
			return elm$core$Result$Ok(_Json_wrap(value));

		case 7:
			if (!Array.isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 8:
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 10:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 11:
			var index = decoder.e;
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 12:
			if (typeof value !== 'object' || value === null || Array.isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 13:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 14:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 15:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 3:
		case 2:
		case 4:
		case 6:
		case 5:
			return true;

		case 9:
			return x.c === y.c;

		case 7:
		case 8:
		case 12:
			return _Json_equality(x.b, y.b);

		case 10:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 11:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 13:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 14:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 15:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel);
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.aM,
		impl.a_,
		impl.aY,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2, result.a);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});
var elm$core$Basics$False = 1;
var elm$core$Basics$True = 0;
var elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var elm$core$Basics$EQ = 1;
var elm$core$Basics$GT = 2;
var elm$core$Basics$LT = 0;
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$List$cons = _List_cons;
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.e) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.g),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.g);
		} else {
			var treeLen = builder.e * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.h) : builder.h;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.e);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.g) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.g);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{h: nodeList, e: (len / elm$core$Array$branchFactor) | 0, g: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var elm$core$Maybe$Nothing = {$: 1};
var elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var author$project$Main$init = function (flags) {
	return _Utils_Tuple2('', elm$core$Platform$Cmd$none);
};
var author$project$Main$GotInput = elm$core$Basics$identity;
var elm$json$Json$Decode$string = _Json_decodeString;
var author$project$Ports$onInput = _Platform_incomingPort('onInput', elm$json$Json$Decode$string);
var elm$core$Basics$identity = function (x) {
	return x;
};
var author$project$Main$subscriptions = function (_n0) {
	return author$project$Ports$onInput(elm$core$Basics$identity);
};
var elm$json$Json$Encode$string = _Json_wrap;
var author$project$Ports$sendOutput = _Platform_outgoingPort('sendOutput', elm$json$Json$Encode$string);
var Punie$elm_reader$Reader$Reader = elm$core$Basics$identity;
var Punie$elm_reader$Reader$flip = F3(
	function (f, x, y) {
		return A2(f, y, x);
	});
var Punie$elm_reader$Reader$run = function (_n0) {
	var f = _n0;
	return f;
};
var Punie$elm_reader$Reader$bind = F2(
	function (x, f) {
		return function (r) {
			return A2(
				Punie$elm_reader$Reader$flip(Punie$elm_reader$Reader$run),
				r,
				f(
					A2(Punie$elm_reader$Reader$run, x, r)));
		};
	});
var Punie$elm_reader$Reader$andThen = Punie$elm_reader$Reader$flip(Punie$elm_reader$Reader$bind);
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var Punie$elm_reader$Reader$reader = function (x) {
	return elm$core$Basics$always(x);
};
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var Punie$elm_reader$Reader$Except$fail = A2(elm$core$Basics$composeL, Punie$elm_reader$Reader$reader, elm$core$Result$Err);
var Punie$elm_reader$Reader$Except$succeed = A2(elm$core$Basics$composeL, Punie$elm_reader$Reader$reader, elm$core$Result$Ok);
var Punie$elm_reader$Reader$Except$unpack = F3(
	function (ferr, fval, result) {
		if (result.$ === 1) {
			var err = result.a;
			return ferr(err);
		} else {
			var val = result.a;
			return fval(val);
		}
	});
var Punie$elm_reader$Reader$Except$andMap = F2(
	function (v, f) {
		var go = function (k) {
			return A2(
				Punie$elm_reader$Reader$andThen,
				A2(
					Punie$elm_reader$Reader$Except$unpack,
					Punie$elm_reader$Reader$Except$fail,
					A2(elm$core$Basics$composeL, Punie$elm_reader$Reader$Except$succeed, k)),
				v);
		};
		return A2(
			Punie$elm_reader$Reader$andThen,
			A2(Punie$elm_reader$Reader$Except$unpack, Punie$elm_reader$Reader$Except$fail, go),
			f);
	});
var Punie$elm_reader$Reader$Except$andThen = F2(
	function (f, x) {
		return A2(
			Punie$elm_reader$Reader$andThen,
			A2(Punie$elm_reader$Reader$Except$unpack, Punie$elm_reader$Reader$Except$fail, f),
			x);
	});
var Punie$elm_reader$Reader$Except$join = function (x) {
	return A2(
		Punie$elm_reader$Reader$andThen,
		A2(Punie$elm_reader$Reader$Except$unpack, Punie$elm_reader$Reader$Except$fail, elm$core$Basics$identity),
		x);
};
var Punie$elm_reader$Reader$map = F2(
	function (f, _n0) {
		var g = _n0;
		return A2(elm$core$Basics$composeL, f, g);
	});
var elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
			var a = ra.a;
			return elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm$core$Result$Err(e);
		}
	});
var Punie$elm_reader$Reader$Except$map = A2(elm$core$Basics$composeL, Punie$elm_reader$Reader$map, elm$core$Result$map);
var author$project$Language$Checker$Mismatch = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var author$project$Language$Checker$NotFunction = function (a) {
	return {$: 1, a: a};
};
var Punie$elm_reader$Reader$local = F2(
	function (f, _n0) {
		var action = _n0;
		return A2(elm$core$Basics$composeL, action, f);
	});
var author$project$Language$Checker$extend = F2(
	function (xt, env) {
		return A2(elm$core$List$cons, xt, env);
	});
var author$project$Language$Checker$inEnv = function (_n0) {
	var x = _n0.a;
	var t = _n0.b;
	return Punie$elm_reader$Reader$local(
		author$project$Language$Checker$extend(
			_Utils_Tuple2(x, t)));
};
var Punie$elm_reader$Reader$ask = elm$core$Basics$identity;
var author$project$Language$Checker$NotInScope = function (a) {
	return {$: 2, a: a};
};
var author$project$Utils$lookup = F2(
	function (key, list) {
		lookup:
		while (true) {
			if (!list.b) {
				return elm$core$Maybe$Nothing;
			} else {
				var _n1 = list.a;
				var k = _n1.a;
				var v = _n1.b;
				var xs = list.b;
				if (_Utils_eq(k, key)) {
					return elm$core$Maybe$Just(v);
				} else {
					var $temp$key = key,
						$temp$list = xs;
					key = $temp$key;
					list = $temp$list;
					continue lookup;
				}
			}
		}
	});
var author$project$Language$Checker$lookupVar = function (x) {
	var lookup = function (env) {
		var _n0 = A2(author$project$Utils$lookup, x, env);
		if (_n0.$ === 1) {
			return Punie$elm_reader$Reader$Except$fail(
				author$project$Language$Checker$NotInScope(x));
		} else {
			var e = _n0.a;
			return Punie$elm_reader$Reader$Except$succeed(e);
		}
	};
	return A2(Punie$elm_reader$Reader$andThen, lookup, Punie$elm_reader$Reader$ask);
};
var author$project$Language$Syntax$TArr = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var author$project$Language$Syntax$TBool = {$: 1};
var author$project$Language$Syntax$TInt = {$: 0};
var author$project$Language$Checker$check = function (expr) {
	switch (expr.$) {
		case 1:
			if (!expr.a.$) {
				return Punie$elm_reader$Reader$Except$succeed(author$project$Language$Syntax$TInt);
			} else {
				return Punie$elm_reader$Reader$Except$succeed(author$project$Language$Syntax$TBool);
			}
		case 0:
			var x = expr.a;
			return author$project$Language$Checker$lookupVar(x);
		case 2:
			var op = expr.a;
			var e1 = expr.b;
			var e2 = expr.c;
			switch (op) {
				case 6:
					return A3(author$project$Language$Checker$checkEqualTypes, e1, e2, author$project$Language$Syntax$TBool);
				case 0:
					return A4(author$project$Language$Checker$checkBinOpTypes, e1, e2, author$project$Language$Syntax$TInt, author$project$Language$Syntax$TInt);
				case 1:
					return A4(author$project$Language$Checker$checkBinOpTypes, e1, e2, author$project$Language$Syntax$TInt, author$project$Language$Syntax$TInt);
				case 2:
					return A4(author$project$Language$Checker$checkBinOpTypes, e1, e2, author$project$Language$Syntax$TBool, author$project$Language$Syntax$TBool);
				case 3:
					return A4(author$project$Language$Checker$checkBinOpTypes, e1, e2, author$project$Language$Syntax$TBool, author$project$Language$Syntax$TBool);
				case 5:
					return A4(author$project$Language$Checker$checkBinOpTypes, e1, e2, author$project$Language$Syntax$TInt, author$project$Language$Syntax$TBool);
				default:
					return A4(author$project$Language$Checker$checkBinOpTypes, e1, e2, author$project$Language$Syntax$TInt, author$project$Language$Syntax$TBool);
			}
		case 3:
			var p = expr.a;
			var e1 = expr.b;
			var e2 = expr.c;
			var equalTypes = F2(
				function (t1, t2) {
					return _Utils_eq(t1, t2) ? Punie$elm_reader$Reader$Except$succeed(t1) : Punie$elm_reader$Reader$Except$fail(
						A2(author$project$Language$Checker$Mismatch, t2, t1));
				});
			var checkIfBool = function (tp) {
				if (tp.$ === 1) {
					return Punie$elm_reader$Reader$Except$join(
						A2(
							Punie$elm_reader$Reader$Except$andMap,
							author$project$Language$Checker$check(e2),
							A2(
								Punie$elm_reader$Reader$Except$map,
								equalTypes,
								author$project$Language$Checker$check(e1))));
				} else {
					return Punie$elm_reader$Reader$Except$fail(
						A2(author$project$Language$Checker$Mismatch, tp, author$project$Language$Syntax$TBool));
				}
			};
			return A2(
				Punie$elm_reader$Reader$Except$andThen,
				checkIfBool,
				author$project$Language$Checker$check(p));
		case 5:
			var x = expr.a;
			var t = expr.b;
			var exp = expr.c;
			return A2(
				Punie$elm_reader$Reader$Except$andThen,
				function (rhs) {
					return Punie$elm_reader$Reader$Except$succeed(
						A2(author$project$Language$Syntax$TArr, t, rhs));
				},
				A2(
					author$project$Language$Checker$inEnv,
					_Utils_Tuple2(x, t),
					author$project$Language$Checker$check(exp)));
		default:
			var e1 = expr.a;
			var e2 = expr.b;
			var checkIfFunction = F2(
				function (t1, t2) {
					if (t1.$ === 2) {
						var a = t1.a;
						var b = t1.b;
						return _Utils_eq(a, t2) ? Punie$elm_reader$Reader$Except$succeed(b) : Punie$elm_reader$Reader$Except$fail(
							A2(author$project$Language$Checker$Mismatch, t2, a));
					} else {
						var ty = t1;
						return Punie$elm_reader$Reader$Except$fail(
							author$project$Language$Checker$NotFunction(ty));
					}
				});
			return Punie$elm_reader$Reader$Except$join(
				A2(
					Punie$elm_reader$Reader$Except$andMap,
					author$project$Language$Checker$check(e1),
					A2(
						Punie$elm_reader$Reader$Except$map,
						checkIfFunction,
						author$project$Language$Checker$check(e2))));
	}
};
var author$project$Language$Checker$checkBinOpTypes = F4(
	function (e1, e2, opType, resultType) {
		var binOpTypes = F2(
			function (t1, t2) {
				var _n0 = _Utils_Tuple2(
					_Utils_eq(opType, t1),
					_Utils_eq(opType, t2));
				if (_n0.a) {
					if (_n0.b) {
						return Punie$elm_reader$Reader$Except$succeed(resultType);
					} else {
						return Punie$elm_reader$Reader$Except$fail(
							A2(author$project$Language$Checker$Mismatch, t2, opType));
					}
				} else {
					return Punie$elm_reader$Reader$Except$fail(
						A2(author$project$Language$Checker$Mismatch, t1, opType));
				}
			});
		return Punie$elm_reader$Reader$Except$join(
			A2(
				Punie$elm_reader$Reader$Except$andMap,
				author$project$Language$Checker$check(e2),
				A2(
					Punie$elm_reader$Reader$Except$map,
					binOpTypes,
					author$project$Language$Checker$check(e1))));
	});
var author$project$Language$Checker$checkEqualTypes = F3(
	function (e1, e2, resultType) {
		var equalTypes = F2(
			function (t1, t2) {
				return _Utils_eq(t1, t2) ? Punie$elm_reader$Reader$Except$succeed(resultType) : Punie$elm_reader$Reader$Except$fail(
					A2(author$project$Language$Checker$Mismatch, t2, t1));
			});
		return Punie$elm_reader$Reader$Except$join(
			A2(
				Punie$elm_reader$Reader$Except$andMap,
				author$project$Language$Checker$check(e2),
				A2(
					Punie$elm_reader$Reader$Except$map,
					equalTypes,
					author$project$Language$Checker$check(e1))));
	});
var author$project$Utils$flip = F3(
	function (f, x, y) {
		return A2(f, y, x);
	});
var author$project$Language$Checker$runCheck = function (env) {
	return A2(author$project$Utils$flip, Punie$elm_reader$Reader$run, env);
};
var author$project$Language$Checker$checkTop = F2(
	function (env, x) {
		return A2(
			author$project$Language$Checker$runCheck,
			env,
			author$project$Language$Checker$check(x));
	});
var stil4m$structured_writer$StructuredWriter$Joined = function (a) {
	return {$: 6, a: a};
};
var stil4m$structured_writer$StructuredWriter$join = stil4m$structured_writer$StructuredWriter$Joined;
var stil4m$structured_writer$StructuredWriter$Str = function (a) {
	return {$: 2, a: a};
};
var stil4m$structured_writer$StructuredWriter$string = stil4m$structured_writer$StructuredWriter$Str;
var author$project$Language$Pretty$parens = function (w) {
	return stil4m$structured_writer$StructuredWriter$join(
		_List_fromArray(
			[
				stil4m$structured_writer$StructuredWriter$string('('),
				w,
				stil4m$structured_writer$StructuredWriter$string(')')
			]));
};
var author$project$Language$Pretty$parensIf = function (b) {
	return b ? author$project$Language$Pretty$parens : elm$core$Basics$identity;
};
var stil4m$structured_writer$StructuredWriter$Spaced = function (a) {
	return {$: 5, a: a};
};
var stil4m$structured_writer$StructuredWriter$spaced = stil4m$structured_writer$StructuredWriter$Spaced;
var author$project$Language$Pretty$prettyType_ = F2(
	function (p, type_) {
		switch (type_.$) {
			case 0:
				return stil4m$structured_writer$StructuredWriter$string('Int');
			case 1:
				return stil4m$structured_writer$StructuredWriter$string('Bool');
			default:
				var a = type_.a;
				var b = type_.b;
				var isArrow = function (t) {
					if (t.$ === 2) {
						return true;
					} else {
						return false;
					}
				};
				return stil4m$structured_writer$StructuredWriter$spaced(
					_List_fromArray(
						[
							A2(
							author$project$Language$Pretty$parensIf,
							isArrow(a),
							A2(author$project$Language$Pretty$prettyType_, p, a)),
							stil4m$structured_writer$StructuredWriter$string('->'),
							A2(author$project$Language$Pretty$prettyType_, p, b)
						]));
		}
	});
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$core$List$concatMap = F2(
	function (f, list) {
		return elm$core$List$concat(
			A2(elm$core$List$map, f, list));
	});
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$concat = function (strings) {
	return A2(elm$core$String$join, '', strings);
};
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3(elm$core$String$repeatHelp, n, chunk, '');
	});
var stil4m$structured_writer$StructuredWriter$asIndent = function (amount) {
	return A2(elm$core$String$repeat, amount, ' ');
};
var stil4m$structured_writer$StructuredWriter$writeIndented = F2(
	function (indent_, w) {
		switch (w.$) {
			case 0:
				var _n1 = w.a;
				var pre = _n1.a;
				var sep = _n1.b;
				var post = _n1.c;
				var differentLines = w.b;
				var items = w.c;
				var seperator = differentLines ? ('\n' + (stil4m$structured_writer$StructuredWriter$asIndent(indent_) + sep)) : sep;
				return elm$core$String$concat(
					_List_fromArray(
						[
							pre,
							A2(
							elm$core$String$join,
							seperator,
							A2(
								elm$core$List$map,
								A2(
									elm$core$Basics$composeR,
									elm$core$Basics$identity,
									stil4m$structured_writer$StructuredWriter$writeIndented(indent_)),
								items)),
							post
						]));
			case 1:
				var items = w.a;
				return A2(
					elm$core$String$join,
					'\n' + stil4m$structured_writer$StructuredWriter$asIndent(indent_),
					A2(
						elm$core$List$concatMap,
						A2(
							elm$core$Basics$composeR,
							stil4m$structured_writer$StructuredWriter$writeIndented(0),
							elm$core$String$split('\n')),
						items));
			case 2:
				var s = w.a;
				return s;
			case 4:
				var n = w.a;
				var next = w.b;
				return _Utils_ap(
					stil4m$structured_writer$StructuredWriter$asIndent(n + indent_),
					A2(stil4m$structured_writer$StructuredWriter$writeIndented, n + indent_, next));
			case 5:
				var items = w.a;
				return A2(
					elm$core$String$join,
					' ',
					A2(
						elm$core$List$map,
						stil4m$structured_writer$StructuredWriter$writeIndented(indent_),
						items));
			case 6:
				var items = w.a;
				return elm$core$String$concat(
					A2(
						elm$core$List$map,
						stil4m$structured_writer$StructuredWriter$writeIndented(indent_),
						items));
			default:
				var x = w.a;
				var y = w.b;
				return _Utils_ap(
					A2(stil4m$structured_writer$StructuredWriter$writeIndented, indent_, x),
					A2(stil4m$structured_writer$StructuredWriter$writeIndented, indent_, y));
		}
	});
var stil4m$structured_writer$StructuredWriter$write = stil4m$structured_writer$StructuredWriter$writeIndented(0);
var author$project$Language$Pretty$prettyType = A2(
	elm$core$Basics$composeL,
	stil4m$structured_writer$StructuredWriter$write,
	author$project$Language$Pretty$prettyType_(0));
var author$project$Language$Checker$toString = function (te) {
	switch (te.$) {
		case 0:
			var t1 = te.a;
			var t2 = te.b;
			return 'Couldn\'t match expected type \'' + (author$project$Language$Pretty$prettyType(t2) + ('\' with actual type: \'' + (author$project$Language$Pretty$prettyType(t1) + '\'')));
		case 1:
			var t = te.a;
			return 'Tried to apply to non function type: \'' + (author$project$Language$Pretty$prettyType(t) + '\'');
		default:
			var n = te.a;
			return 'Variable not in scope: ' + n;
	}
};
var elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var author$project$Language$Eval$emptyScope = elm$core$Dict$empty;
var author$project$Language$Eval$VBool = function (a) {
	return {$: 1, a: a};
};
var author$project$Language$Eval$VClosure = F3(
	function (a, b, c) {
		return {$: 2, a: a, b: b, c: c};
	});
var author$project$Language$Eval$VInt = function (a) {
	return {$: 0, a: a};
};
var elm$core$Dict$Black = 1;
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$Red = 0;
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1) {
				case 0:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var author$project$Language$Eval$extend = F3(
	function (env, name, val) {
		return A3(elm$core$Dict$insert, name, val, env);
	});
var author$project$Language$Eval$ifthenelse = F3(
	function (p, a, b) {
		if ((!p.$) && (p.a.$ === 1)) {
			if (p.a.a) {
				return a;
			} else {
				return b;
			}
		} else {
			return elm$core$Result$Err('');
		}
	});
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$or = _Basics_or;
var author$project$Language$Eval$primOp = F3(
	function (op, a, b) {
		switch (op) {
			case 0:
				var _n1 = _Utils_Tuple2(a, b);
				if ((!_n1.a.$) && (!_n1.b.$)) {
					var x = _n1.a.a;
					var y = _n1.b.a;
					return elm$core$Result$Ok(
						author$project$Language$Eval$VInt(x + y));
				} else {
					return elm$core$Result$Err('');
				}
			case 1:
				var _n2 = _Utils_Tuple2(a, b);
				if ((!_n2.a.$) && (!_n2.b.$)) {
					var x = _n2.a.a;
					var y = _n2.b.a;
					return elm$core$Result$Ok(
						author$project$Language$Eval$VInt(x * y));
				} else {
					return elm$core$Result$Err('');
				}
			case 2:
				var _n3 = _Utils_Tuple2(a, b);
				if ((_n3.a.$ === 1) && (_n3.b.$ === 1)) {
					var x = _n3.a.a;
					var y = _n3.b.a;
					return elm$core$Result$Ok(
						author$project$Language$Eval$VBool(x && y));
				} else {
					return elm$core$Result$Err('');
				}
			case 3:
				var _n4 = _Utils_Tuple2(a, b);
				if ((_n4.a.$ === 1) && (_n4.b.$ === 1)) {
					var x = _n4.a.a;
					var y = _n4.b.a;
					return elm$core$Result$Ok(
						author$project$Language$Eval$VBool(x || y));
				} else {
					return elm$core$Result$Err('');
				}
			case 5:
				var _n5 = _Utils_Tuple2(a, b);
				if ((!_n5.a.$) && (!_n5.b.$)) {
					var x = _n5.a.a;
					var y = _n5.b.a;
					return elm$core$Result$Ok(
						author$project$Language$Eval$VBool(
							_Utils_cmp(x, y) < 0));
				} else {
					return elm$core$Result$Err('');
				}
			case 4:
				var _n6 = _Utils_Tuple2(a, b);
				if ((!_n6.a.$) && (!_n6.b.$)) {
					var x = _n6.a.a;
					var y = _n6.b.a;
					return elm$core$Result$Ok(
						author$project$Language$Eval$VBool(
							_Utils_cmp(x, y) > 0));
				} else {
					return elm$core$Result$Err('');
				}
			default:
				var _n7 = _Utils_Tuple2(a, b);
				_n7$2:
				while (true) {
					switch (_n7.a.$) {
						case 0:
							if (!_n7.b.$) {
								var x = _n7.a.a;
								var y = _n7.b.a;
								return elm$core$Result$Ok(
									author$project$Language$Eval$VBool(
										_Utils_eq(x, y)));
							} else {
								break _n7$2;
							}
						case 1:
							if (_n7.b.$ === 1) {
								var x = _n7.a.a;
								var y = _n7.b.a;
								return elm$core$Result$Ok(
									author$project$Language$Eval$VBool(
										_Utils_eq(x, y)));
							} else {
								break _n7$2;
							}
						default:
							break _n7$2;
					}
				}
				return elm$core$Result$Err('');
		}
	});
var author$project$Language$Eval$resultJoin = function (result) {
	if (result.$ === 1) {
		var err = result.a;
		return elm$core$Result$Err(err);
	} else {
		if (result.a.$ === 1) {
			var err = result.a.a;
			return elm$core$Result$Err(err);
		} else {
			var res = result.a.a;
			return elm$core$Result$Ok(res);
		}
	}
};
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$core$Result$map2 = F3(
	function (func, ra, rb) {
		if (ra.$ === 1) {
			var x = ra.a;
			return elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 1) {
				var x = rb.a;
				return elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				return elm$core$Result$Ok(
					A2(func, a, b));
			}
		}
	});
var author$project$Language$Eval$apply = F2(
	function (v1, v2) {
		if (v2.$ === 2) {
			var name = v2.a;
			var body = v2.b;
			var env = v2.c;
			return A2(
				author$project$Language$Eval$eval,
				A3(author$project$Language$Eval$extend, env, name, v1),
				body);
		} else {
			return elm$core$Result$Err('');
		}
	});
var author$project$Language$Eval$eval = F2(
	function (env, expr) {
		switch (expr.$) {
			case 1:
				if (!expr.a.$) {
					var x = expr.a.a;
					return elm$core$Result$Ok(
						author$project$Language$Eval$VInt(x));
				} else {
					var x = expr.a.a;
					return elm$core$Result$Ok(
						author$project$Language$Eval$VBool(x));
				}
			case 0:
				var x = expr.a;
				var _n1 = A2(elm$core$Dict$get, x, env);
				if (!_n1.$) {
					var val = _n1.a;
					return elm$core$Result$Ok(val);
				} else {
					return elm$core$Result$Err('');
				}
			case 2:
				var op = expr.a;
				var a = expr.b;
				var b = expr.c;
				var y = A2(author$project$Language$Eval$eval, env, b);
				var x = A2(author$project$Language$Eval$eval, env, a);
				return author$project$Language$Eval$resultJoin(
					A3(
						elm$core$Result$map2,
						author$project$Language$Eval$primOp(op),
						x,
						y));
			case 3:
				var p = expr.a;
				var a = expr.b;
				var b = expr.c;
				var y = A2(author$project$Language$Eval$eval, env, b);
				var x = A2(author$project$Language$Eval$eval, env, a);
				var pred = A2(author$project$Language$Eval$eval, env, p);
				return A3(author$project$Language$Eval$ifthenelse, pred, x, y);
			case 5:
				var x = expr.a;
				var body = expr.c;
				return elm$core$Result$Ok(
					A3(author$project$Language$Eval$VClosure, x, body, env));
			default:
				var a = expr.a;
				var b = expr.b;
				var y = A2(author$project$Language$Eval$eval, env, b);
				var x = A2(author$project$Language$Eval$eval, env, a);
				return author$project$Language$Eval$resultJoin(
					A3(elm$core$Result$map2, author$project$Language$Eval$apply, x, y));
		}
	});
var author$project$Language$Eval$runEval = author$project$Language$Eval$eval(author$project$Language$Eval$emptyScope);
var elm$core$String$fromInt = _String_fromNumber;
var author$project$Language$Eval$toString = function (val) {
	switch (val.$) {
		case 0:
			var x = val.a;
			return elm$core$String$fromInt(x);
		case 1:
			if (val.a) {
				return 'True';
			} else {
				return 'False';
			}
		default:
			var name = val.a;
			return '<<closure>>';
	}
};
var author$project$Language$Parser$deadEndToString = function (_n0) {
	var row = _n0.aW;
	var col = _n0.aF;
	var problem = _n0.aT;
	var addRowCol = function (str) {
		return str + (' (' + (elm$core$String$fromInt(row) + (':' + (elm$core$String$fromInt(col) + ').'))));
	};
	switch (problem.$) {
		case 0:
			var str = problem.a;
			return addRowCol('I expected the following string: `' + (str + '`'));
		case 1:
			return addRowCol('I expected an integer');
		case 2:
			return addRowCol('I expected an hexadecimal string');
		case 3:
			return addRowCol('I expected an octal string');
		case 4:
			return addRowCol('I expected a binary string');
		case 5:
			return addRowCol('I expected a float');
		case 6:
			return addRowCol('I expected a number');
		case 7:
			return addRowCol('I expected a variable name');
		case 8:
			var str = problem.a;
			return addRowCol('I expected the following symbol: `' + (str + '`'));
		case 9:
			var str = problem.a;
			return addRowCol('I expected the following keyword: `' + (str + '`'));
		case 10:
			return addRowCol('I reached an unexpected end of input');
		case 11:
			return addRowCol('I reached an unexpected character');
		case 12:
			var str = problem.a;
			return addRowCol('I encountered the following problem: ' + str);
		default:
			return addRowCol('This is a bad repeat');
	}
};
var author$project$Language$Parser$deadEndsToString = function (deadends) {
	var strings = A2(elm$core$List$map, author$project$Language$Parser$deadEndToString, deadends);
	return A2(elm$core$String$join, '\n', strings);
};
var elm$parser$Parser$ExpectingEnd = {$: 10};
var elm$core$String$length = _String_length;
var elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var elm$parser$Parser$Advanced$Parser = elm$core$Basics$identity;
var elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$parser$Parser$Advanced$Empty = {$: 0};
var elm$parser$Parser$Advanced$Problem = F4(
	function (row, col, problem, contextStack) {
		return {aF: col, aG: contextStack, aT: problem, aW: row};
	});
var elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$Problem, s.aW, s.aF, x, s.c));
	});
var elm$parser$Parser$Advanced$end = function (x) {
	return function (s) {
		return _Utils_eq(
			elm$core$String$length(s.a),
			s.b) ? A3(elm$parser$Parser$Advanced$Good, false, 0, s) : A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var elm$parser$Parser$end = elm$parser$Parser$Advanced$end(elm$parser$Parser$ExpectingEnd);
var elm$parser$Parser$Advanced$map2 = F3(
	function (func, _n0, _n1) {
		var parseA = _n0;
		var parseB = _n1;
		return function (s0) {
			var _n2 = parseA(s0);
			if (_n2.$ === 1) {
				var p = _n2.a;
				var x = _n2.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _n2.a;
				var a = _n2.b;
				var s1 = _n2.c;
				var _n3 = parseB(s1);
				if (_n3.$ === 1) {
					var p2 = _n3.a;
					var x = _n3.b;
					return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _n3.a;
					var b = _n3.b;
					var s2 = _n3.c;
					return A3(
						elm$parser$Parser$Advanced$Good,
						p1 || p2,
						A2(func, a, b),
						s2);
				}
			}
		};
	});
var elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$always, keepParser, ignoreParser);
	});
var elm$parser$Parser$ignorer = elm$parser$Parser$Advanced$ignorer;
var author$project$Language$Parser$contents = function (p) {
	return A2(elm$parser$Parser$ignorer, p, elm$parser$Parser$end);
};
var author$project$Language$Syntax$LBool = function (a) {
	return {$: 1, a: a};
};
var author$project$Language$Syntax$Lit = function (a) {
	return {$: 1, a: a};
};
var elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$apL, parseFunc, parseArg);
	});
var elm$parser$Parser$keeper = elm$parser$Parser$Advanced$keeper;
var elm$parser$Parser$ExpectingKeyword = function (a) {
	return {$: 9, a: a};
};
var elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$core$Basics$not = _Basics_not;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var elm$parser$Parser$Advanced$keyword = function (_n0) {
	var kwd = _n0.a;
	var expecting = _n0.b;
	var progress = !elm$core$String$isEmpty(kwd);
	return function (s) {
		var _n1 = A5(elm$parser$Parser$Advanced$isSubString, kwd, s.b, s.aW, s.aF, s.a);
		var newOffset = _n1.a;
		var newRow = _n1.b;
		var newCol = _n1.c;
		return (_Utils_eq(newOffset, -1) || (0 <= A3(
			elm$parser$Parser$Advanced$isSubChar,
			function (c) {
				return elm$core$Char$isAlphaNum(c) || (c === '_');
			},
			newOffset,
			s.a))) ? A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{aF: newCol, c: s.c, d: s.d, b: newOffset, aW: newRow, a: s.a});
	};
};
var elm$parser$Parser$keyword = function (kwd) {
	return elm$parser$Parser$Advanced$keyword(
		A2(
			elm$parser$Parser$Advanced$Token,
			kwd,
			elm$parser$Parser$ExpectingKeyword(kwd)));
};
var elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2(elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _n1 = parse(s0);
				if (!_n1.$) {
					var step = _n1;
					return step;
				} else {
					var step = _n1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2(elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return function (s) {
		return A3(elm$parser$Parser$Advanced$oneOfHelp, s, elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var elm$parser$Parser$oneOf = elm$parser$Parser$Advanced$oneOf;
var elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.a);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.b, offset) < 0,
					0,
					{aF: col, c: s0.c, d: s0.d, b: offset, aW: row, a: s0.a});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return function (s) {
		return A5(elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.b, s.aW, s.aF, s);
	};
};
var elm$parser$Parser$Advanced$spaces = elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return (c === ' ') || ((c === '\n') || (c === '\r'));
	});
var elm$parser$Parser$spaces = elm$parser$Parser$Advanced$spaces;
var elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3(elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var elm$parser$Parser$succeed = elm$parser$Parser$Advanced$succeed;
var author$project$Language$Parser$bool = function () {
	var _true = A2(
		elm$parser$Parser$keeper,
		elm$parser$Parser$succeed(
			elm$core$Basics$always(
				author$project$Language$Syntax$Lit(
					author$project$Language$Syntax$LBool(true)))),
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$keyword('True'),
			elm$parser$Parser$spaces));
	var _false = A2(
		elm$parser$Parser$keeper,
		elm$parser$Parser$succeed(
			elm$core$Basics$always(
				author$project$Language$Syntax$Lit(
					author$project$Language$Syntax$LBool(false)))),
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$keyword('False'),
			elm$parser$Parser$spaces));
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[_true, _false]));
}();
var elm$core$Set$Set_elm_builtin = elm$core$Basics$identity;
var elm$core$Set$empty = elm$core$Dict$empty;
var elm$core$Set$insert = F2(
	function (key, _n0) {
		var dict = _n0;
		return A3(elm$core$Dict$insert, key, 0, dict);
	});
var elm$core$Set$fromList = function (list) {
	return A3(elm$core$List$foldl, elm$core$Set$insert, elm$core$Set$empty, list);
};
var elm$parser$Parser$ExpectingVariable = {$: 7};
var elm$core$Dict$member = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$get, key, dict);
		if (!_n0.$) {
			return true;
		} else {
			return false;
		}
	});
var elm$core$Set$member = F2(
	function (key, _n0) {
		var dict = _n0;
		return A2(elm$core$Dict$member, key, dict);
	});
var elm$core$String$slice = _String_slice;
var elm$parser$Parser$Advanced$varHelp = F7(
	function (isGood, offset, row, col, src, indent, context) {
		varHelp:
		while (true) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, src);
			if (_Utils_eq(newOffset, -1)) {
				return {aF: col, c: context, d: indent, b: offset, aW: row, a: src};
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				}
			}
		}
	});
var elm$parser$Parser$Advanced$variable = function (i) {
	return function (s) {
		var firstOffset = A3(elm$parser$Parser$Advanced$isSubChar, i.aX, s.b, s.a);
		if (_Utils_eq(firstOffset, -1)) {
			return A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, i.aa));
		} else {
			var s1 = _Utils_eq(firstOffset, -2) ? A7(elm$parser$Parser$Advanced$varHelp, i.aN, s.b + 1, s.aW + 1, 1, s.a, s.d, s.c) : A7(elm$parser$Parser$Advanced$varHelp, i.aN, firstOffset, s.aW, s.aF + 1, s.a, s.d, s.c);
			var name = A3(elm$core$String$slice, s.b, s1.b, s.a);
			return A2(elm$core$Set$member, name, i.aU) ? A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, i.aa)) : A3(elm$parser$Parser$Advanced$Good, true, name, s1);
		}
	};
};
var elm$parser$Parser$variable = function (i) {
	return elm$parser$Parser$Advanced$variable(
		{aa: elm$parser$Parser$ExpectingVariable, aN: i.aN, aU: i.aU, aX: i.aX});
};
var author$project$Language$Parser$identifier = elm$parser$Parser$variable(
	{
		aN: function (c) {
			return elm$core$Char$isAlphaNum(c) || ((c === '_') || (c === '\''));
		},
		aU: elm$core$Set$fromList(
			_List_fromArray(
				['True', 'False', 'if', 'then', 'else', 'fi'])),
		aX: elm$core$Char$isLower
	});
var author$project$Language$Syntax$LInt = function (a) {
	return {$: 0, a: a};
};
var elm$parser$Parser$Advanced$backtrackable = function (_n0) {
	var parse = _n0;
	return function (s0) {
		var _n1 = parse(s0);
		if (_n1.$ === 1) {
			var x = _n1.b;
			return A2(elm$parser$Parser$Advanced$Bad, false, x);
		} else {
			var a = _n1.b;
			var s1 = _n1.c;
			return A3(elm$parser$Parser$Advanced$Good, false, a, s1);
		}
	};
};
var elm$parser$Parser$backtrackable = elm$parser$Parser$Advanced$backtrackable;
var elm$parser$Parser$ExpectingInt = {$: 1};
var elm$parser$Parser$Advanced$consumeBase = _Parser_consumeBase;
var elm$parser$Parser$Advanced$consumeBase16 = _Parser_consumeBase16;
var elm$core$String$toFloat = _String_toFloat;
var elm$parser$Parser$Advanced$bumpOffset = F2(
	function (newOffset, s) {
		return {aF: s.aF + (newOffset - s.b), c: s.c, d: s.d, b: newOffset, aW: s.aW, a: s.a};
	});
var elm$parser$Parser$Advanced$chompBase10 = _Parser_chompBase10;
var elm$parser$Parser$Advanced$isAsciiCode = _Parser_isAsciiCode;
var elm$parser$Parser$Advanced$consumeExp = F2(
	function (offset, src) {
		if (A3(elm$parser$Parser$Advanced$isAsciiCode, 101, offset, src) || A3(elm$parser$Parser$Advanced$isAsciiCode, 69, offset, src)) {
			var eOffset = offset + 1;
			var expOffset = (A3(elm$parser$Parser$Advanced$isAsciiCode, 43, eOffset, src) || A3(elm$parser$Parser$Advanced$isAsciiCode, 45, eOffset, src)) ? (eOffset + 1) : eOffset;
			var newOffset = A2(elm$parser$Parser$Advanced$chompBase10, expOffset, src);
			return _Utils_eq(expOffset, newOffset) ? (-newOffset) : newOffset;
		} else {
			return offset;
		}
	});
var elm$parser$Parser$Advanced$consumeDotAndExp = F2(
	function (offset, src) {
		return A3(elm$parser$Parser$Advanced$isAsciiCode, 46, offset, src) ? A2(
			elm$parser$Parser$Advanced$consumeExp,
			A2(elm$parser$Parser$Advanced$chompBase10, offset + 1, src),
			src) : A2(elm$parser$Parser$Advanced$consumeExp, offset, src);
	});
var elm$parser$Parser$Advanced$finalizeInt = F5(
	function (invalid, handler, startOffset, _n0, s) {
		var endOffset = _n0.a;
		var n = _n0.b;
		if (handler.$ === 1) {
			var x = handler.a;
			return A2(
				elm$parser$Parser$Advanced$Bad,
				true,
				A2(elm$parser$Parser$Advanced$fromState, s, x));
		} else {
			var toValue = handler.a;
			return _Utils_eq(startOffset, endOffset) ? A2(
				elm$parser$Parser$Advanced$Bad,
				_Utils_cmp(s.b, startOffset) < 0,
				A2(elm$parser$Parser$Advanced$fromState, s, invalid)) : A3(
				elm$parser$Parser$Advanced$Good,
				true,
				toValue(n),
				A2(elm$parser$Parser$Advanced$bumpOffset, endOffset, s));
		}
	});
var elm$parser$Parser$Advanced$fromInfo = F4(
	function (row, col, x, context) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$Problem, row, col, x, context));
	});
var elm$parser$Parser$Advanced$finalizeFloat = F6(
	function (invalid, expecting, intSettings, floatSettings, intPair, s) {
		var intOffset = intPair.a;
		var floatOffset = A2(elm$parser$Parser$Advanced$consumeDotAndExp, intOffset, s.a);
		if (floatOffset < 0) {
			return A2(
				elm$parser$Parser$Advanced$Bad,
				true,
				A4(elm$parser$Parser$Advanced$fromInfo, s.aW, s.aF - (floatOffset + s.b), invalid, s.c));
		} else {
			if (_Utils_eq(s.b, floatOffset)) {
				return A2(
					elm$parser$Parser$Advanced$Bad,
					false,
					A2(elm$parser$Parser$Advanced$fromState, s, expecting));
			} else {
				if (_Utils_eq(intOffset, floatOffset)) {
					return A5(elm$parser$Parser$Advanced$finalizeInt, invalid, intSettings, s.b, intPair, s);
				} else {
					if (floatSettings.$ === 1) {
						var x = floatSettings.a;
						return A2(
							elm$parser$Parser$Advanced$Bad,
							true,
							A2(elm$parser$Parser$Advanced$fromState, s, invalid));
					} else {
						var toValue = floatSettings.a;
						var _n1 = elm$core$String$toFloat(
							A3(elm$core$String$slice, s.b, floatOffset, s.a));
						if (_n1.$ === 1) {
							return A2(
								elm$parser$Parser$Advanced$Bad,
								true,
								A2(elm$parser$Parser$Advanced$fromState, s, invalid));
						} else {
							var n = _n1.a;
							return A3(
								elm$parser$Parser$Advanced$Good,
								true,
								toValue(n),
								A2(elm$parser$Parser$Advanced$bumpOffset, floatOffset, s));
						}
					}
				}
			}
		}
	});
var elm$parser$Parser$Advanced$number = function (c) {
	return function (s) {
		if (A3(elm$parser$Parser$Advanced$isAsciiCode, 48, s.b, s.a)) {
			var zeroOffset = s.b + 1;
			var baseOffset = zeroOffset + 1;
			return A3(elm$parser$Parser$Advanced$isAsciiCode, 120, zeroOffset, s.a) ? A5(
				elm$parser$Parser$Advanced$finalizeInt,
				c.aO,
				c.ad,
				baseOffset,
				A2(elm$parser$Parser$Advanced$consumeBase16, baseOffset, s.a),
				s) : (A3(elm$parser$Parser$Advanced$isAsciiCode, 111, zeroOffset, s.a) ? A5(
				elm$parser$Parser$Advanced$finalizeInt,
				c.aO,
				c.aj,
				baseOffset,
				A3(elm$parser$Parser$Advanced$consumeBase, 8, baseOffset, s.a),
				s) : (A3(elm$parser$Parser$Advanced$isAsciiCode, 98, zeroOffset, s.a) ? A5(
				elm$parser$Parser$Advanced$finalizeInt,
				c.aO,
				c.W,
				baseOffset,
				A3(elm$parser$Parser$Advanced$consumeBase, 2, baseOffset, s.a),
				s) : A6(
				elm$parser$Parser$Advanced$finalizeFloat,
				c.aO,
				c.aa,
				c.af,
				c.ab,
				_Utils_Tuple2(zeroOffset, 0),
				s)));
		} else {
			return A6(
				elm$parser$Parser$Advanced$finalizeFloat,
				c.aO,
				c.aa,
				c.af,
				c.ab,
				A3(elm$parser$Parser$Advanced$consumeBase, 10, s.b, s.a),
				s);
		}
	};
};
var elm$parser$Parser$Advanced$int = F2(
	function (expecting, invalid) {
		return elm$parser$Parser$Advanced$number(
			{
				W: elm$core$Result$Err(invalid),
				aa: expecting,
				ab: elm$core$Result$Err(invalid),
				ad: elm$core$Result$Err(invalid),
				af: elm$core$Result$Ok(elm$core$Basics$identity),
				aO: invalid,
				aj: elm$core$Result$Err(invalid)
			});
	});
var elm$parser$Parser$int = A2(elm$parser$Parser$Advanced$int, elm$parser$Parser$ExpectingInt, elm$parser$Parser$ExpectingInt);
var author$project$Language$Parser$num = A2(
	elm$parser$Parser$keeper,
	elm$parser$Parser$succeed(
		A2(elm$core$Basics$composeL, author$project$Language$Syntax$Lit, author$project$Language$Syntax$LInt)),
	A2(
		elm$parser$Parser$ignorer,
		elm$parser$Parser$backtrackable(elm$parser$Parser$int),
		elm$parser$Parser$spaces));
var author$project$Language$Syntax$Prim = F3(
	function (a, b, c) {
		return {$: 2, a: a, b: b, c: c};
	});
var elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 8, a: a};
};
var elm$parser$Parser$Advanced$token = function (_n0) {
	var str = _n0.a;
	var expecting = _n0.b;
	var progress = !elm$core$String$isEmpty(str);
	return function (s) {
		var _n1 = A5(elm$parser$Parser$Advanced$isSubString, str, s.b, s.aW, s.aF, s.a);
		var newOffset = _n1.a;
		var newRow = _n1.b;
		var newCol = _n1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{aF: newCol, c: s.c, d: s.d, b: newOffset, aW: newRow, a: s.a});
	};
};
var elm$parser$Parser$Advanced$symbol = elm$parser$Parser$Advanced$token;
var elm$parser$Parser$symbol = function (str) {
	return elm$parser$Parser$Advanced$symbol(
		A2(
			elm$parser$Parser$Advanced$Token,
			str,
			elm$parser$Parser$ExpectingSymbol(str)));
};
var author$project$Language$Parser$opParser = F2(
	function (s, op) {
		return A2(
			elm$parser$Parser$ignorer,
			A2(
				elm$parser$Parser$ignorer,
				elm$parser$Parser$succeed(
					author$project$Language$Syntax$Prim(op)),
				elm$parser$Parser$symbol(s)),
			elm$parser$Parser$spaces);
	});
var author$project$Language$Syntax$Add = 0;
var author$project$Language$Syntax$And = 2;
var author$project$Language$Syntax$Eq = 6;
var author$project$Language$Syntax$Greater = 4;
var author$project$Language$Syntax$Lower = 5;
var author$project$Language$Syntax$Mul = 1;
var author$project$Language$Syntax$Or = 3;
var author$project$Parser$Extras$AssocLeft = 1;
var author$project$Parser$Extras$AssocNone = 0;
var author$project$Parser$Extras$Infix = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var author$project$Language$Parser$operators = _List_fromArray(
	[
		_List_fromArray(
		[
			A2(
			author$project$Parser$Extras$Infix,
			A2(author$project$Language$Parser$opParser, '*', 1),
			1)
		]),
		_List_fromArray(
		[
			A2(
			author$project$Parser$Extras$Infix,
			A2(author$project$Language$Parser$opParser, '+', 0),
			1)
		]),
		_List_fromArray(
		[
			A2(
			author$project$Parser$Extras$Infix,
			A2(author$project$Language$Parser$opParser, '<', 5),
			0),
			A2(
			author$project$Parser$Extras$Infix,
			A2(author$project$Language$Parser$opParser, '>', 4),
			0)
		]),
		_List_fromArray(
		[
			A2(
			author$project$Parser$Extras$Infix,
			A2(author$project$Language$Parser$opParser, '==', 6),
			0)
		]),
		_List_fromArray(
		[
			A2(
			author$project$Parser$Extras$Infix,
			A2(author$project$Language$Parser$opParser, '&&', 2),
			1)
		]),
		_List_fromArray(
		[
			A2(
			author$project$Parser$Extras$Infix,
			A2(author$project$Language$Parser$opParser, '||', 3),
			1)
		])
	]);
var author$project$Language$Parser$tylit = function () {
	var intType = A2(
		elm$parser$Parser$keeper,
		elm$parser$Parser$succeed(
			elm$core$Basics$always(author$project$Language$Syntax$TInt)),
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$keyword('Int'),
			elm$parser$Parser$spaces));
	var boolType = A2(
		elm$parser$Parser$keeper,
		elm$parser$Parser$succeed(
			elm$core$Basics$always(author$project$Language$Syntax$TBool)),
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$keyword('Bool'),
			elm$parser$Parser$spaces));
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[intType, boolType]));
}();
var author$project$Parser$Extras$AssocRight = 2;
var author$project$Parser$Extras$initOps = {z: _List_Nil, A: _List_Nil, B: _List_Nil, C: _List_Nil, D: _List_Nil};
var author$project$Parser$Extras$splitOp = F2(
	function (operator, ops) {
		var rassoc = ops.D;
		var lassoc = ops.z;
		var nassoc = ops.A;
		var prefix = ops.C;
		var postfix = ops.B;
		switch (operator.$) {
			case 0:
				var op = operator.a;
				var assoc = operator.b;
				switch (assoc) {
					case 0:
						return _Utils_update(
							ops,
							{
								A: A2(elm$core$List$cons, op, ops.A)
							});
					case 1:
						return _Utils_update(
							ops,
							{
								z: A2(elm$core$List$cons, op, ops.z)
							});
					default:
						return _Utils_update(
							ops,
							{
								D: A2(elm$core$List$cons, op, ops.D)
							});
				}
			case 1:
				var op = operator.a;
				return _Utils_update(
					ops,
					{
						C: A2(elm$core$List$cons, op, ops.C)
					});
			default:
				var op = operator.a;
				return _Utils_update(
					ops,
					{
						B: A2(elm$core$List$cons, op, ops.B)
					});
		}
	});
var elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _n0) {
		var parseA = _n0;
		return function (s0) {
			var _n1 = parseA(s0);
			if (_n1.$ === 1) {
				var p = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _n1.a;
				var a = _n1.b;
				var s1 = _n1.c;
				var _n2 = callback(a);
				var parseB = _n2;
				var _n3 = parseB(s1);
				if (_n3.$ === 1) {
					var p2 = _n3.a;
					var x = _n3.b;
					return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _n3.a;
					var b = _n3.b;
					var s2 = _n3.c;
					return A3(elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
				}
			}
		};
	});
var elm$parser$Parser$andThen = elm$parser$Parser$Advanced$andThen;
var elm$parser$Parser$Problem = function (a) {
	return {$: 12, a: a};
};
var elm$parser$Parser$Advanced$problem = function (x) {
	return function (s) {
		return A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var elm$parser$Parser$problem = function (msg) {
	return elm$parser$Parser$Advanced$problem(
		elm$parser$Parser$Problem(msg));
};
var author$project$Parser$Extras$makeParser = F2(
	function (ops, term) {
		var ambiguous = F2(
			function (assoc, op) {
				return elm$parser$Parser$backtrackable(
					A2(
						elm$parser$Parser$andThen,
						function (_n3) {
							return elm$parser$Parser$problem('ambiguous use of a ' + (assoc + ' associative operator'));
						},
						op));
			});
		var _n0 = A3(elm$core$List$foldr, author$project$Parser$Extras$splitOp, author$project$Parser$Extras$initOps, ops);
		var rassoc = _n0.D;
		var lassoc = _n0.z;
		var nassoc = _n0.A;
		var prefix = _n0.C;
		var postfix = _n0.B;
		var lassocOp = elm$parser$Parser$oneOf(lassoc);
		var ambiguousLeft = A2(ambiguous, 'left', lassocOp);
		var nassocOp = elm$parser$Parser$oneOf(nassoc);
		var ambiguousNon = A2(ambiguous, 'non', nassocOp);
		var postfixOp = elm$parser$Parser$oneOf(postfix);
		var postfixP = elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					postfixOp,
					elm$parser$Parser$succeed(elm$core$Basics$identity)
				]));
		var prefixOp = elm$parser$Parser$oneOf(prefix);
		var prefixP = elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					prefixOp,
					elm$parser$Parser$succeed(elm$core$Basics$identity)
				]));
		var termP = A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$keeper,
					elm$parser$Parser$succeed(
						F3(
							function (pre, x, post) {
								return post(
									pre(x));
							})),
					prefixP),
				term),
			postfixP);
		var rassocOp = elm$parser$Parser$oneOf(rassoc);
		var ambiguousRight = A2(ambiguous, 'right', rassocOp);
		var lassocP = function (x) {
			return elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						elm$parser$Parser$andThen,
						function (_n2) {
							var f = _n2.a;
							var y = _n2.b;
							return lassocP1(
								A2(f, x, y));
						},
						A2(
							elm$parser$Parser$keeper,
							A2(
								elm$parser$Parser$keeper,
								elm$parser$Parser$succeed(elm$core$Tuple$pair),
								lassocOp),
							termP)),
						ambiguousRight,
						ambiguousNon
					]));
		};
		var lassocP1 = function (x) {
			return elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						lassocP(x),
						elm$parser$Parser$succeed(x)
					]));
		};
		var nassocP = function (x) {
			return A2(
				elm$parser$Parser$andThen,
				function (_n1) {
					var f = _n1.a;
					var y = _n1.b;
					return elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								ambiguousRight,
								ambiguousLeft,
								ambiguousNon,
								elm$parser$Parser$succeed(
								A2(f, x, y))
							]));
				},
				A2(
					elm$parser$Parser$keeper,
					A2(
						elm$parser$Parser$keeper,
						elm$parser$Parser$succeed(elm$core$Tuple$pair),
						nassocOp),
					termP));
		};
		var rassocP = function (x) {
			return elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						elm$parser$Parser$keeper,
						A2(
							elm$parser$Parser$keeper,
							elm$parser$Parser$succeed(
								F2(
									function (f, y) {
										return A2(f, x, y);
									})),
							rassocOp),
						A2(elm$parser$Parser$andThen, rassocP1, termP)),
						ambiguousLeft,
						ambiguousNon
					]));
		};
		var rassocP1 = function (x) {
			return elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						rassocP(x),
						elm$parser$Parser$succeed(x)
					]));
		};
		return A2(
			elm$parser$Parser$andThen,
			function (x) {
				return elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							rassocP(x),
							lassocP(x),
							nassocP(x),
							elm$parser$Parser$succeed(x)
						]));
			},
			termP);
	});
var author$project$Parser$Extras$buildExpressionParser = F2(
	function (operators, simpleExpr) {
		return A3(elm$core$List$foldl, author$project$Parser$Extras$makeParser, simpleExpr, operators);
	});
var author$project$Parser$Extras$between = F3(
	function (opening, closing, p) {
		return A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$ignorer,
				A2(
					elm$parser$Parser$ignorer,
					elm$parser$Parser$succeed(elm$core$Basics$identity),
					elm$parser$Parser$symbol(opening)),
				elm$parser$Parser$spaces),
			A2(
				elm$parser$Parser$ignorer,
				A2(elm$parser$Parser$ignorer, p, elm$parser$Parser$spaces),
				elm$parser$Parser$symbol(closing)));
	});
var author$project$Parser$Extras$parens = A2(author$project$Parser$Extras$between, '(', ')');
var elm$parser$Parser$Advanced$lazy = function (thunk) {
	return function (s) {
		var _n0 = thunk(0);
		var parse = _n0;
		return parse(s);
	};
};
var elm$parser$Parser$lazy = elm$parser$Parser$Advanced$lazy;
function author$project$Language$Parser$cyclic$type_() {
	var arrow = A2(
		elm$parser$Parser$ignorer,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(author$project$Language$Syntax$TArr),
			elm$parser$Parser$symbol('->')),
		elm$parser$Parser$spaces);
	var tyops = _List_fromArray(
		[
			_List_fromArray(
			[
				A2(author$project$Parser$Extras$Infix, arrow, 2)
			])
		]);
	return A2(
		author$project$Parser$Extras$buildExpressionParser,
		tyops,
		author$project$Language$Parser$cyclic$tyatom());
}
function author$project$Language$Parser$cyclic$tyatom() {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				author$project$Parser$Extras$parens(
				elm$parser$Parser$lazy(
					function (_n0) {
						return author$project$Language$Parser$cyclic$type_();
					})),
				author$project$Language$Parser$tylit
			]));
}
var author$project$Language$Parser$type_ = author$project$Language$Parser$cyclic$type_();
author$project$Language$Parser$cyclic$type_ = function () {
	return author$project$Language$Parser$type_;
};
var author$project$Language$Parser$tyatom = author$project$Language$Parser$cyclic$tyatom();
author$project$Language$Parser$cyclic$tyatom = function () {
	return author$project$Language$Parser$tyatom;
};
var author$project$Language$Syntax$Var = function (a) {
	return {$: 0, a: a};
};
var author$project$Language$Parser$var = A2(
	elm$parser$Parser$keeper,
	elm$parser$Parser$succeed(author$project$Language$Syntax$Var),
	A2(elm$parser$Parser$ignorer, author$project$Language$Parser$identifier, elm$parser$Parser$spaces));
var author$project$Language$Syntax$App = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var author$project$Language$Syntax$If = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
	});
var author$project$Language$Syntax$Lam = F3(
	function (a, b, c) {
		return {$: 5, a: a, b: b, c: c};
	});
var elm$parser$Parser$Done = function (a) {
	return {$: 1, a: a};
};
var elm$parser$Parser$Loop = function (a) {
	return {$: 0, a: a};
};
var elm$parser$Parser$Advanced$map = F2(
	function (func, _n0) {
		var parse = _n0;
		return function (s0) {
			var _n1 = parse(s0);
			if (!_n1.$) {
				var p = _n1.a;
				var a = _n1.b;
				var s1 = _n1.c;
				return A3(
					elm$parser$Parser$Advanced$Good,
					p,
					func(a),
					s1);
			} else {
				var p = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			}
		};
	});
var elm$parser$Parser$map = elm$parser$Parser$Advanced$map;
var author$project$Parser$Extras$manyHelp = F2(
	function (p, vs) {
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$keeper,
					elm$parser$Parser$succeed(
						function (v) {
							return elm$parser$Parser$Loop(
								A2(elm$core$List$cons, v, vs));
						}),
					A2(elm$parser$Parser$ignorer, p, elm$parser$Parser$spaces)),
					A2(
					elm$parser$Parser$map,
					function (_n0) {
						return elm$parser$Parser$Done(
							elm$core$List$reverse(vs));
					},
					elm$parser$Parser$succeed(0))
				]));
	});
var elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 1, a: a};
};
var elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 0, a: a};
};
var elm$parser$Parser$toAdvancedStep = function (step) {
	if (!step.$) {
		var s = step.a;
		return elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return elm$parser$Parser$Advanced$Done(a);
	}
};
var elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _n0 = callback(state);
			var parse = _n0;
			var _n1 = parse(s0);
			if (!_n1.$) {
				var p1 = _n1.a;
				var step = _n1.b;
				var s1 = _n1.c;
				if (!step.$) {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3(elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return function (s) {
			return A4(elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
		};
	});
var elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					elm$parser$Parser$map,
					elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var author$project$Parser$Extras$many = function (p) {
	return A2(
		elm$parser$Parser$loop,
		_List_Nil,
		author$project$Parser$Extras$manyHelp(p));
};
var author$project$Parser$Extras$some = function (p) {
	return A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			elm$parser$Parser$succeed(elm$core$Tuple$pair),
			A2(elm$parser$Parser$ignorer, p, elm$parser$Parser$spaces)),
		author$project$Parser$Extras$many(p));
};
function author$project$Language$Parser$cyclic$aexp() {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				author$project$Parser$Extras$parens(
				elm$parser$Parser$lazy(
					function (_n7) {
						return author$project$Language$Parser$cyclic$expr();
					})),
				author$project$Language$Parser$bool,
				author$project$Language$Parser$num,
				author$project$Language$Parser$var,
				author$project$Language$Parser$cyclic$ifthenelse(),
				elm$parser$Parser$lazy(
				function (_n8) {
					return author$project$Language$Parser$cyclic$lambda();
				})
			]));
}
function author$project$Language$Parser$cyclic$expr() {
	return A2(
		author$project$Parser$Extras$buildExpressionParser,
		author$project$Language$Parser$operators,
		elm$parser$Parser$lazy(
			function (_n6) {
				return author$project$Language$Parser$cyclic$term();
			}));
}
function author$project$Language$Parser$cyclic$ifthenelse() {
	return A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$ignorer,
					A2(
						elm$parser$Parser$ignorer,
						elm$parser$Parser$succeed(author$project$Language$Syntax$If),
						elm$parser$Parser$keyword('if')),
					elm$parser$Parser$spaces),
				A2(
					elm$parser$Parser$ignorer,
					A2(
						elm$parser$Parser$ignorer,
						elm$parser$Parser$lazy(
							function (_n3) {
								return author$project$Language$Parser$cyclic$expr();
							}),
						elm$parser$Parser$keyword('then')),
					elm$parser$Parser$spaces)),
			A2(
				elm$parser$Parser$ignorer,
				A2(
					elm$parser$Parser$ignorer,
					elm$parser$Parser$lazy(
						function (_n4) {
							return author$project$Language$Parser$cyclic$expr();
						}),
					elm$parser$Parser$keyword('else')),
				elm$parser$Parser$spaces)),
		elm$parser$Parser$lazy(
			function (_n5) {
				return author$project$Language$Parser$cyclic$expr();
			}));
}
function author$project$Language$Parser$cyclic$lambda() {
	return A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$ignorer,
					A2(
						elm$parser$Parser$ignorer,
						elm$parser$Parser$succeed(author$project$Language$Syntax$Lam),
						elm$parser$Parser$symbol('\\')),
					elm$parser$Parser$spaces),
				A2(
					elm$parser$Parser$ignorer,
					A2(
						elm$parser$Parser$ignorer,
						A2(elm$parser$Parser$ignorer, author$project$Language$Parser$identifier, elm$parser$Parser$spaces),
						elm$parser$Parser$symbol(':')),
					elm$parser$Parser$spaces)),
			A2(
				elm$parser$Parser$ignorer,
				A2(
					elm$parser$Parser$ignorer,
					A2(elm$parser$Parser$ignorer, author$project$Language$Parser$type_, elm$parser$Parser$spaces),
					elm$parser$Parser$symbol('.')),
				elm$parser$Parser$spaces)),
		elm$parser$Parser$lazy(
			function (_n2) {
				return author$project$Language$Parser$cyclic$expr();
			}));
}
function author$project$Language$Parser$cyclic$term() {
	var foldl1 = F2(
		function (f, _n1) {
			var x = _n1.a;
			var xs = _n1.b;
			return A3(elm$core$List$foldl, f, x, xs);
		});
	return A2(
		elm$parser$Parser$keeper,
		elm$parser$Parser$succeed(
			foldl1(author$project$Language$Syntax$App)),
		author$project$Parser$Extras$some(
			elm$parser$Parser$lazy(
				function (_n0) {
					return author$project$Language$Parser$cyclic$aexp();
				})));
}
var author$project$Language$Parser$aexp = author$project$Language$Parser$cyclic$aexp();
author$project$Language$Parser$cyclic$aexp = function () {
	return author$project$Language$Parser$aexp;
};
var author$project$Language$Parser$expr = author$project$Language$Parser$cyclic$expr();
author$project$Language$Parser$cyclic$expr = function () {
	return author$project$Language$Parser$expr;
};
var author$project$Language$Parser$ifthenelse = author$project$Language$Parser$cyclic$ifthenelse();
author$project$Language$Parser$cyclic$ifthenelse = function () {
	return author$project$Language$Parser$ifthenelse;
};
var author$project$Language$Parser$lambda = author$project$Language$Parser$cyclic$lambda();
author$project$Language$Parser$cyclic$lambda = function () {
	return author$project$Language$Parser$lambda;
};
var author$project$Language$Parser$term = author$project$Language$Parser$cyclic$term();
author$project$Language$Parser$cyclic$term = function () {
	return author$project$Language$Parser$term;
};
var elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {aF: col, aT: problem, aW: row};
	});
var elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3(elm$parser$Parser$DeadEnd, p.aW, p.aF, p.aT);
};
var elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var elm$parser$Parser$Advanced$run = F2(
	function (_n0, src) {
		var parse = _n0;
		var _n1 = parse(
			{aF: 1, c: _List_Nil, d: 1, b: 0, aW: 1, a: src});
		if (!_n1.$) {
			var value = _n1.b;
			return elm$core$Result$Ok(value);
		} else {
			var bag = _n1.b;
			return elm$core$Result$Err(
				A2(elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var elm$parser$Parser$run = F2(
	function (parser, source) {
		var _n0 = A2(elm$parser$Parser$Advanced$run, parser, source);
		if (!_n0.$) {
			var a = _n0.a;
			return elm$core$Result$Ok(a);
		} else {
			var problems = _n0.a;
			return elm$core$Result$Err(
				A2(elm$core$List$map, elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var author$project$Language$Parser$parseExpr = elm$parser$Parser$run(
	author$project$Language$Parser$contents(author$project$Language$Parser$expr));
var author$project$Run$run = function (expr) {
	var _n0 = author$project$Language$Parser$parseExpr(expr);
	if (_n0.$ === 1) {
		var err = _n0.a;
		return author$project$Language$Parser$deadEndsToString(err);
	} else {
		var ex = _n0.a;
		var _n1 = A2(author$project$Language$Checker$checkTop, _List_Nil, ex);
		if (_n1.$ === 1) {
			var tyerr = _n1.a;
			return author$project$Language$Checker$toString(tyerr);
		} else {
			var ty = _n1.a;
			var _n2 = author$project$Language$Eval$runEval(ex);
			if (_n2.$ === 1) {
				var err = _n2.a;
				return err;
			} else {
				var result = _n2.a;
				return author$project$Language$Eval$toString(result) + (' : ' + author$project$Language$Pretty$prettyType(ty));
			}
		}
	}
};
var author$project$Main$update = F2(
	function (msg, model) {
		var str = msg;
		var result = author$project$Run$run(str);
		return _Utils_Tuple2(
			result,
			author$project$Ports$sendOutput(result));
	});
var elm$core$Platform$worker = _Platform_worker;
var elm$json$Json$Decode$succeed = _Json_succeed;
var author$project$Main$main = elm$core$Platform$worker(
	{aM: author$project$Main$init, aY: author$project$Main$subscriptions, a_: author$project$Main$update});
_Platform_export({'Main':{'init':author$project$Main$main(
	elm$json$Json$Decode$succeed(0))(0)}});}(this));