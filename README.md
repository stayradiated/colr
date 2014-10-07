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
var colr = Colr.fromHex('000').lighter(20);
colr.toHex(); // "#333333"

var colr = Colr.fromHex('FFF').darker(20);
colr.toHex(); // "#CCCCCC"
```

### Misc

```javascript
var a = Colr.fromHex('#000');
var b = a.clone();

a.lighter(20);

a.toHex(); // '#333333'
b.toHex(); // '#000000'
```

## Benchmarks

```
$ node benchmark.js

# FromHsv -> ToRgb
colr      x 4,552,216 ops/sec ±0.75% (102 runs sampled)
color     x 334,029 ops/sec ±0.40% (98 runs sampled)
tinycolor x 1,018,397 ops/sec ±0.45% (102 runs sampled)
chroma    x 346,686 ops/sec ±0.36% (97 runs sampled)
Fastest is colr

# FromHex -> Lighten -> ToHex
colr      x 1,400,992 ops/sec ±0.27% (102 runs sampled)
color     x 61,486 ops/sec ±0.39% (102 runs sampled)
tinycolor x 80,712 ops/sec ±0.96% (97 runs sampled)
chroma    x 100,885 ops/sec ±0.73% (100 runs sampled)
Fastest is colr

# FromHex -> Lighten -> Darken -> ToHex
colr      x 1,334,580 ops/sec ±0.72% (98 runs sampled)
color     x 47,224 ops/sec ±0.86% (101 runs sampled)
tinycolor x 54,639 ops/sec ±1.07% (101 runs sampled)
chroma    x 65,039 ops/sec ±0.93% (101 runs sampled)
Fastest is colr

# FromHex -> ToHex
colr      x 2,192,730 ops/sec ±0.77% (98 runs sampled)
color     x 92,882 ops/sec ±0.87% (101 runs sampled)
tinycolor x 201,324 ops/sec ±0.98% (98 runs sampled)
chroma    x 266,279 ops/sec ±0.89% (98 runs sampled)
Fastest is colr

# FromHsv -> ToRgb -> ToHex
colr      x 1,680,538 ops/sec ±0.68% (97 runs sampled)
color     x 155,721 ops/sec ±0.48% (101 runs sampled)
tinycolor x 530,777 ops/sec ±0.81% (99 runs sampled)
chroma    x 235,950 ops/sec ±1.00% (95 runs sampled)
Fastest is colr

# FromHsv -> ToHsl
colr      x 4,387,198 ops/sec ±0.45% (99 runs sampled)
color     x 201,875 ops/sec ±0.73% (101 runs sampled)
tinycolor x 434,277 ops/sec ±0.65% (102 runs sampled)
chroma    x 306,594 ops/sec ±1.21% (92 runs sampled)
Fastest is colr

# FromHsl -> ToHsv
colr      x 4,296,682 ops/sec ±0.69% (95 runs sampled)
color     x 187,083 ops/sec ±0.72% (102 runs sampled)
tinycolor x 471,617 ops/sec ±0.59% (102 runs sampled)
chroma    x 229,835 ops/sec ±0.52% (100 runs sampled)
Fastest is colr
```
