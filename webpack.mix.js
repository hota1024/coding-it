const mix = require('laravel-mix')

mix.copy('./index.html', './build')
mix.copyDirectory('./assets', './build/assets')

mix.js('./src/index.js', './build/dist')
mix.js('./src/woof.js', './build/dist')

mix.disableNotifications()