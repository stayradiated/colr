colr
====

Simple color conversion library based on simplicity and stability

## API

### Constructors

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
```

### Conversions

```javascript
var colr = new Colr();

colr.toHex(); // "#000000"

colr.toRgbArray(); // [0, 0, 0]
colr.toRgbObject(); // {r:0, g:0, b:0}

colr.toHslArray(); // [0, 0, 0]
colr.toHslObject(); // {h:0, s:0, l:0}
```

### Analysis

```javascript
var colr = new Colr();

colr.toGrayscale(); // 0 - 255

// n = 0 - 100
colr.lighten(n);
colr.darken(n);
```

### Misc

```javascript
var colr = Colr.fromHex('#c0ffee');
var copy = colr.clone();
```
