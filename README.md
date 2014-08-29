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
colr x 1,133,903 ops/sec ±0.77% (94 runs sampled)
tinycolor x 1,030,410 ops/sec ±0.97% (97 runs sampled)
color x 341,426 ops/sec ±0.47% (101 runs sampled)
Fastest is colr

# FromHex -> Lighten -> ToHex
colr x 725,091 ops/sec ±0.26% (100 runs sampled)
color x 58,260 ops/sec ±0.51% (95 runs sampled)
tinycolor x 77,492 ops/sec ±0.91% (95 runs sampled)
Fastest is colr

# FromHex -> Lighten -> Darken -> ToHex
colr x 617,597 ops/sec ±0.72% (99 runs sampled)
color x 48,016 ops/sec ±0.62% (100 runs sampled)
tinycolor x 55,212 ops/sec ±0.44% (100 runs sampled)
Fastest is colr

# FromHex -> ToHex
colr x 1,397,011 ops/sec ±0.36% (95 runs sampled)
color x 96,361 ops/sec ±0.62% (97 runs sampled)
tinycolor x 199,433 ops/sec ±0.65% (101 runs sampled)
Fastest is colr

# FromHsv -> ToRgb -> ToHex
colr x 536,940 ops/sec ±1.47% (89 runs sampled)
color x 156,743 ops/sec ±0.64% (102 runs sampled)
tinycolor x 527,608 ops/sec ±0.39% (102 runs sampled)
Fastest is colr,tinycolor

# FromHsv -> ToHsl
colr x 1,201,631 ops/sec ±1.13% (85 runs sampled)
color x 204,082 ops/sec ±0.25% (103 runs sampled)
tinycolor x 436,927 ops/sec ±0.85% (101 runs sampled)
Fastest is colr

# FromHsl -> ToHsv
colr x 1,154,472 ops/sec ±1.06% (86 runs sampled)
color x 200,952 ops/sec ±0.44% (102 runs sampled)
tinycolor x 467,939 ops/sec ±0.58% (98 runs sampled)
Fastest is colr
```
