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
```

### Conversions

```javascript
var colr = new Colr();

colr.toHex(); // "#000000"

colr.toRgbArray(); // [0, 0, 0]
colr.toRgbObject(); // {r:0, g:0, b:0}
```

### Analysis

```javascript
var colr = new Colr();

colr.getBrightness();
```

### Misc

```javascript
var colr = Colr.fromHex('#c0ffee');
var copy = colr.clone();
```
