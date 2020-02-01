# game-jam-2020 

install node.js (comes with npm)
```
npm install -g parcel-bundler
```

To run app with local dev server:
```
npm run start
```
which executes `parcel index.html assets/**/*` under the hood. Every file in the assets directory is defined for parcel as an entry so that the files are served statically. This is necessary for phaser.js for security reasons (local file access is not allowed).

```
http://localhost:1234/index.html
```