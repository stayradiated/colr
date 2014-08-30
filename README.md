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
colr x 4,692,968 ops/sec ±1.03% (101 runs sampled)
tinycolor x 924,802 ops/sec ±1.52% (93 runs sampled)
color x 308,460 ops/sec ±1.53% (94 runs sampled)
Fastest is colr

# FromHex -> Lighten -> ToHex
colr x 1,249,627 ops/sec ±1.28% (98 runs sampled)
color x 57,318 ops/sec ±1.33% (96 runs sampled)
tinycolor x 76,323 ops/sec ±1.36% (95 runs sampled)
Fastest is colr

# FromHex -> Lighten -> Darken -> ToHex
colr x 1,231,571 ops/sec ±1.65% (92 runs sampled)
color x 42,823 ops/sec ±1.46% (95 runs sampled)
tinycolor x 54,119 ops/sec ±1.47% (93 runs sampled)
Fastest is colr

# FromHex -> ToHex
colr x 2,486,170 ops/sec ±1.42% (98 runs sampled)
color x 96,604 ops/sec ±1.04% (96 runs sampled)
tinycolor x 198,750 ops/sec ±1.22% (96 runs sampled)
Fastest is colr

# FromHsv -> ToRgb -> ToHex
colr x 1,868,850 ops/sec ±1.54% (93 runs sampled)
color x 149,191 ops/sec ±1.63% (93 runs sampled)
tinycolor x 487,203 ops/sec ±1.88% (91 runs sampled)
Fastest is colr

# FromHsv -> ToHsl
colr x 4,242,921 ops/sec ±1.41% (96 runs sampled)
color x 191,675 ops/sec ±1.52% (97 runs sampled)
tinycolor x 397,635 ops/sec ±1.86% (91 runs sampled)
Fastest is colr

# FromHsl -> ToHsv
colr x 4,192,546 ops/sec ±1.26% (94 runs sampled)
color x 180,318 ops/sec ±1.60% (93 runs sampled)
tinycolor x 422,543 ops/sec ±1.52% (92 runs sampled)
Fastest is colr
