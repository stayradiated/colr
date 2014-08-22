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

colr.toHslArray(); // [74.4360902255639, 64.25120772946859, 59.411764705882355]
colr.toHslObject(); // {h:74.4360902255639, s:64.25120772946859, l:59.411764705882355}

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
var colr = Colr.fromHex('#c0ffee');
var copy = colr.clone();
```
