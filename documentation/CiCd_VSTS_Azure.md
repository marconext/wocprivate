# CI / CD Mit VSTS und AZURE
## Angular Project
### Get Git Data
### Build
### Test
Speziell für die Unit Tests die normalerweise mit ng test ausgeführt werden, muss das standard Angular Projekt angepasst werden.
Zentral gehte es darum, das anstelle des normalen browsers, welcher über karma-chrome-launcher eingebunden ist, ein Headless browser verwendet werden muss.
Glücklicherweise unterstützt VSTS den neuen Stand von Chrome, der auch als Headless eingesetzt werden kann.
Dazu muss die Datei karma.conf.js angepasst werden:
```
customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--disable-gpu',
          // Without a remote debugging port, Google Chrome exits immediately.
          '--remote-debugging-port=9222',
        ],
      }
    },
```