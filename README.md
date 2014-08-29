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
colr x 1,104,367 ops/sec ±0.72% (87 runs sampled)
tinycolor x 983,214 ops/sec ±0.93% (92 runs sampled)
color x 323,127 ops/sec ±0.50% (94 runs sampled)
Fastest is colr

# FromHex -> Lighten -> ToHex
colr x 714,649 ops/sec ±0.28% (103 runs sampled)
color x 57,484 ops/sec ±0.58% (95 runs sampled)
tinycolor x 77,086 ops/sec ±0.57% (99 runs sampled)
Fastest is colr

# FromHex -> Lighten -> Darken -> ToHex
colr x 611,208 ops/sec ±0.09% (102 runs sampled)
color x 48,538 ops/sec ±0.58% (99 runs sampled)
tinycolor x 53,393 ops/sec ±0.29% (101 runs sampled)
Fastest is colr

# FromHex -> ToHex
colr x 1,652,871 ops/sec ±0.75% (98 runs sampled)
color x 98,386 ops/sec ±0.52% (97 runs sampled)
tinycolor x 196,438 ops/sec ±0.23% (102 runs sampled)
Fastest is colr

# FromHsv -> ToRgb -> ToHex
colr x 570,267 ops/sec ±1.50% (89 runs sampled)
color x 162,556 ops/sec ±0.60% (102 runs sampled)
tinycolor x 543,592 ops/sec ±0.53% (100 runs sampled)
Fastest is colr

# FromHsv -> ToHsl
colr x 1,228,715 ops/sec ±1.27% (78 runs sampled)
color x 196,967 ops/sec ±0.24% (103 runs sampled)
tinycolor x 464,202 ops/sec ±0.86% (101 runs sampled)
Fastest is colr

# FromHsl -> ToHsv
colr x 1,142,490 ops/sec ±1.16% (83 runs sampled)
color x 199,220 ops/sec ±0.31% (103 runs sampled)
tinycolor x 478,085 ops/sec ±0.45% (101 runs sampled)
Fastest is colr
```
