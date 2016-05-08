<img src="https://cloud.githubusercontent.com/assets/1270156/15095384/2ff04768-1489-11e6-8971-4258ac35da97.png" width="200" />

# JIRA Opener

Small tool I wrote during a Friday night because I hate to open multiple JIRA issues from e-mails or annoying Slack messages. Basically it helps you out with the funny task of opening JIRA issues one by one.

## Install

To install the project dependencies run the following npm command.

```shell
$ npm install
```

## Start the app

First your need to build the application. The application is going to be compiled in a folder called `dist`.

```shell
$ gulp build
```

Then you can run the application using the follwing command. This will `serve` the `dist` folder in your `localhost:3000`.

```shell
$ gulp run
```

If you want faster development you can use the `watch` task to watch assets for change.

```shell
$ gulp watch
```

You can run all these at the same time by running `gulp` alone.

### Gulp Tasks

This application includes the following gulp tasks.

- **js**: Concats and minifies JS files to `app/dist/app.js`.
- **css**: Uses SCSS to process `app/src/style/app.scss` to `app/dist/style/app.css`.
- **clean_images**: Cleans `app/dist/images` folder.
- **images**: Copies images from `app/src/images/*/**` to `app/dist/images`.
- **jade**: Uses Jade to process `app/src/*.jade` to `app/dist`.
- **deploy**: Uses `gulp-gh-pages` npm library to deploy `dist` content to Github pages (it builds first!)
- **watch**: Runs corresponding task for supported action.
