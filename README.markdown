# aoi (青い)

Aoi _(Japanese: Blue, Green)_ is a design language for Emeraldion UX.

![Aoi banner](aoi_banner.png)

## Development

Aoi uses [Hologram](http://trulia.github.io/hologram), [Sass](http://sass-lang.com/) and [Gulp](http://gulpjs.com/). It manages dependencies with [Bundler](http://bundler.io/) and [NPM](https://www.npmjs.com). Node `>=6.9.3` and Ruby `>=2.4.0` are recommended.

### Clone the repo

```sh
git clone git@github.com:emeraldion/aoi.git
cd aoi
```

### Install dependencies

If you don't have `bundler` installed yet, install its gem:

```sh
gem install bundler
```

Install Ruby dependencies:

```sh
bundle
```

Then install Node dependencies:

```sh
npm install
```

### Build

Once you've installed everything, you can launch the Gulp build to generate CSS and the style guide:

```sh
npm start
```

Gulp will watch source files and generate the CSS and style guide using Hologram every time you save the sources.

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2017 Claudio Procida
