# JIRA Opener

Small tool I wrote during a Friday night because I hate to open multiple JIRA issues from e-mails or annoying Slack messages. Basically it helps you out with the funny task to open JIRA issues one by one.

## Dev stuff

To install the project dependencies run the following npm command.

```shell
$ npm install
```

To run the application first build the application.

```shell
$ gulp build
```

And then use the serve command.

```shell
$ serve dist
```

This application includes the following gulp tasks in order to automate

- **js**: Concats and minifies JS files to `app/dist/app.js`.
- **css**: Uses SCSS to process `app/src/style/app.scss` to `app/dist/style/app.css`.
- **clean_images**: Cleans `app/dist/images` folder.
- **images**: Copies images from `app/src/images/*/**` to `app/dist/images`.
- **jade**: Uses Jade to process `app/src/*.jade` to `app/dist`.
- **deploy**: Uses `gulp-gh-pages` npm library to deploy `dist` content to Github pages (it builds first!)
- **watch**: Runs corresponding task for supported action.
