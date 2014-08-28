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

colr.toHslArray(); // [74, 64, 59]
colr.toHslObject(); // {h:74, s:64, l:59}
colr.toRawHslArray(); // [74.4360902255639, 64.25120772946859, 59.411764705882355]

colr.toHsvArray(); // [74, 61, 85]
colr.toHsvObject(); //{h: 74, s: 61, l: 85}
colr.toRawHsvArray(); // [74.4360902255639, 61.00917431192661, 85.49019607843137]

colr.toGrayscale(); // 193.27
```

### Modifiers

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
# FromHex -> Lighten -> ToHex
colr x 469,395 ops/sec ±1.47% (95 runs sampled)
color x 82,521 ops/sec ±0.51% (103 runs sampled)
tinycolor x 79,471 ops/sec ±0.12% (101 runs sampled)
Fastest is colr

# FromHex -> Lighten -> Darken -> ToHex
colr x 411,389 ops/sec ±0.65% (95 runs sampled)
color x 64,354 ops/sec ±0.32% (103 runs sampled)
tinycolor x 55,725 ops/sec ±0.11% (99 runs sampled)
Fastest is colr

# FromHex -> ToHex
colr x 1,573,937 ops/sec ±0.38% (98 runs sampled)
color x 116,859 ops/sec ±0.48% (101 runs sampled)
tinycolor x 201,785 ops/sec ±0.41% (103 runs sampled)
Fastest is colr

# FromHsv -> ToRgb -> ToHex
colr x 340,751 ops/sec ±1.37% (90 runs sampled)
color x 164,671 ops/sec ±0.61% (99 runs sampled)
tinycolor x 531,621 ops/sec ±0.30% (100 runs sampled)
Fastest is tinycolor

# FromHsv -> ToHsl
colr x 592,527 ops/sec ±1.05% (88 runs sampled)
color x 210,901 ops/sec ±0.43% (102 runs sampled)
tinycolor x 439,982 ops/sec ±0.36% (101 runs sampled)
Fastest is colr

# FromHsl -> ToHsv
colr x 588,970 ops/sec ±1.01% (90 runs sampled)
color x 201,790 ops/sec ±0.45% (96 runs sampled)
tinycolor x 409,633 ops/sec ±0.54% (100 runs sampled)
Fastest is colr
```
