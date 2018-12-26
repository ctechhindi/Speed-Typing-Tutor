module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        appId: "com.electron.speedtypingtutor",
        asar: true,
        productName: "Speed Typing Tutor",
        copyright: "Copyright © 2018 KingWeb, Inc.",
        artifactName: "${productName}-${version}-${os}${arch}.${ext}",
        mac: {
          "category": "public.app-category.education",
          "artifactName": "${productName}-${version}-${arch}.${ext}",
        },
        linux: {
          "category": "Typing;TypingTest;HindiTyping;EnglishTyping",
          "packageCategory": "Typing;TypingTest;HindiTyping;EnglishTyping",
          "description": "Speed Typing Tutor for Linux",
          "target": [
            "deb",
            "zip",
            "AppImage",
            "snap"
          ],
          "maintainer": "Jeevan Lal <jeevan15498@gmail.com>",
          "artifactName": "${productName}-${version}-${arch}.${ext}",
        },
        deb: {
          "synopsis": "Speed Typing Tutor",
        },
        snap: {
          "synopsis": "Speed Typing Tutor"
        },
        dmg: {
          "background": "public/img/icons/appdmg.png",
          "icon": "public/icon.icns",
          "iconSize": 100,
          "contents": [
            {
              "x": 380,
              "y": 280,
              "type": "link",
              "path": "/Applications"
            },
            {
              "x": 110,
              "y": 280,
              "type": "file"
            }
          ],
          "window": {
            "width": 500,
            "height": 500
          }
        },
        win: {
          "target": [
            // nsis, portable, nsis-web
            {
              "target": "nsis", 
              "arch": [
                "x64",
                "ia32"
              ]
            }
          ],
          "icon": "public/icon.ico",
          "publisherName": "KingWeb, Inc."
        },
        nsis :{
          "oneClick": false,
          // "perMachine": true,
          // "allowToChangeInstallationDirectory": true
        },
      }
    }
  }
}