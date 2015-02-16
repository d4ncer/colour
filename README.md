![Colour.js](http://i.imgur.com/UImGik3.png)

A lightweight JavaScript library for creating and manipulating colours.

---

## Installation

Colour depends on Underscore.js for right now, but there are plans to remove it in a future release.

Install via npm

```
$ npm install colourjs
```

Require & use in your project

```javascript
var Colour = require('colour');

var colourHex = new Colour('#e27a3f', { alpha: 0.7 });
var colourRGB = new Colour({ type: 'RGB', value: [226, 122, 63] }, { alpha: 0.7 });
var colourHSL = new Colour({ type: 'HSL', value: [75, 21.9, 65] }, { alpha: 0.7 });

// Conversions
colourRGB.toHex(); // '#e27a3f'
colourHex.toRGBa(); // [226, 122, 63, 0.7]
colourHSL.toHSV(); // [74, 21.1, 72.5]
colourHSL.desaturate(5).toHexa(); // ['#aeb596', 0.7]

// Manipulations
colourHex.lighten(15).saturate(10).toHSLa(); // [22, 71.7, 83.8, 0.7]
colourHSL.darken().toHSL(); // [75, 21.9, 75]
colourRGB.grayscale().toHSL(); // [22, 0, 88.6]

// Validators
colourHex.isGrayscale(); // false
colourRGB.grayscale().isColour(); // false
```

## Tests

Tests depend on Mocha & Chai.

```
$ npm test
```

## Contributing

Fork and submit a PR. Issues and next steps are available [here](https://github.com/d4ncer/colour/issues)

## Release History

* 0.1.0 Initial release

## License

The MIT License (MIT)

Copyright (c) 2015 Raghuvir Kasturi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

Built during [HackReactor](http://www.hackreactor.com/)
