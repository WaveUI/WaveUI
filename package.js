Package.describe({
  name: 'wave:waveui', // http://atmospherejs.com/wave/waveui
  version: '0.0.1',
  summary: 'WaveUI kit for MeteorJS',
  git: 'https://github.com/WaveUI/meteor-wave.git',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.2.0');
  api.use('jquery', 'client');
  api.addFiles([
    'dist/css/wave.css',
    'dist/js/wave.js'
  ], 'client');
});