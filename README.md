colr
====

Simple color conversion library based on simplicity and stability

## API

### Constructors

Create a new instance of the Colr class

```javascript
// create a  empty instance
var colr = new Colr();

// create from hex
var colr = Colr.fromHex('#abc123');

// create from rgb
var colr = Colr.fromRgb(20, 30, 40);
var colr = Colr.fromRgbArray([20, 30, 40]);
var colr = Colr.fromRgbObject({r:20, g:30, b:40});

// create from hsl
var colr = Colr.fromHsl(320, 20, 90);
var colr = Colr.fromHslArray([320, 20, 90]);
var colr = Colr.fromHslObject({h:320, s:20, l:90});

// create from grayscale
var colr = Colr.fromGrayscale(128);
```

### Importers

Change the color of an existing Colr instance.

All methods return the `colr` instance and can be chained.

```javascript
var colr = new Colr();

// import from hex
colr.fromHex('#abc123');

// import from rgb
colr.fromRgb(20, 30, 40);
colr.fromRgbArray([20, 30, 40]);
colr.fromRgbObject({r:20, g:30, b:40});

// import from hsl
colr.fromHsl(320, 20, 90);
colr.fromHslArray([320, 20, 90]);
colr.fromHslObject({h:320, s:20, l:90});

// import from hsv/hsb
colr.fromHsv(30, 80, 20);
colr.fromHsvArray([30, 80, 20]);
colr.fromHsvObject({h:30, s:80, v:20});

// create from grayscale
colr.fromGrayscale(128);
```

### Exporters

Convert the color to another format

```javascript
var colr = Colr().fromHex('bada55');

colr.toHex(); // "#BADA55"

colr.toRgbArray(); // [186, 218, 85]
colr.toRgbObject(); // {r:186, g:218, b:85}
colr.toRawRgbArray(); // [186, 218, 85]
colr.toRawRgbObject(); // {r:186, g:218, b:85}

colr.toHslArray(); // [74, 64, 59]
colr.toHslObject(); // {h:74, s:64, l:59}
colr.toRawHslArray(); // {74.4360902255639, 64.25120772946859, 59.411764705882355]
colr.toRawHslObject(); // {r:74.4360902255639, g:64.25120772946859, b:59.411764705882355}

colr.toHsvArray(); // [74, 61, 85]
colr.toHsvObject(); //{h: 74, s: 61, l: 85}
colr.toRawHsvArray(); // [74.4360902255639, 61.00917431192661, 85.49019607843137]
colr.toRawHsvObject(); // {r:74.4360902255639, g:61.00917431192661, b:85.49019607843137}

colr.toGrayscale(); // 193.27
```

### Modifiers

All methods return the `colr` instance and can be chained.

```javascript
var colr = Colr.fromHex('000').lighten(20);
colr.toHex(); // "#333333"

var colr = Colr.fromHex('FFF').darken(20);
colr.toHex(); // "#CCCCCC"
```

### Misc

```javascript
var a = Colr.fromHex('#000');
var b = a.clone();

a.lighten(20);

a.toHex(); // '#333333'
b.toHex(); // '#000000'
```

## Benchmarks

```
# FromHsv -> ToRgb
colr x 4,602,679 ops/sec ±0.43% (99 runs sampled)
color x 320,733 ops/sec ±0.49% (93 runs sampled)
tinycolor x 1,033,573 ops/sec ±0.28% (102 runs sampled)
Fastest is colr

# FromHex -> Lighten -> ToHex
colr x 1,360,752 ops/sec ±0.22% (103 runs sampled)
color x 60,933 ops/sec ±0.37% (101 runs sampled)
tinycolor x 79,699 ops/sec ±0.11% (102 runs sampled)
Fastest is colr

# FromHex -> Lighten -> Darken -> ToHex
colr x 1,342,473 ops/sec ±0.36% (101 runs sampled)
color x 48,162 ops/sec ±0.24% (101 runs sampled)
tinycolor x 55,313 ops/sec ±0.11% (102 runs sampled)
Fastest is colr

# FromHex -> ToHex
colr x 2,208,379 ops/sec ±0.20% (103 runs sampled)
color x 98,068 ops/sec ±0.59% (98 runs sampled)
tinycolor x 200,300 ops/sec ±0.08% (101 runs sampled)
Fastest is colr

# FromHsv -> ToRgb -> ToHex
colr x 1,718,402 ops/sec ±0.47% (97 runs sampled)
color x 159,986 ops/sec ±0.42% (100 runs sampled)
tinycolor x 571,714 ops/sec ±0.45% (101 runs sampled)
Fastest is colr

# FromHsv -> ToHsl
colr x 4,421,173 ops/sec ±0.03% (100 runs sampled)
color x 206,278 ops/sec ±0.43% (100 runs sampled)
tinycolor x 407,639 ops/sec ±0.88% (96 runs sampled)
Fastest is colr

# FromHsl -> ToHsv
colr x 4,294,678 ops/sec ±0.65% (101 runs sampled)
color x 188,744 ops/sec ±0.08% (102 runs sampled)
tinycolor x 447,867 ops/sec ±0.52% (100 runs sampled)
Fastest is colr
```
