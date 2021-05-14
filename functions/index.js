const functions = require("firebase-functions");
const fs = require('fs');
const pwaAssetGenerator = require('pwa-asset-generator');
// const cors = require('cors')({origin: true});

exports.generateManifestRun = functions.https.onCall((data, context) => {
  // cors(req, res, () => {
  //   res.set('Access-Control-Allow-Origin', '*');
    return new Promise(function (resolve, reject) {
      (async () => {
        const { savedImages, htmlMeta, manifestJsonContent } = await pwaAssetGenerator.generateImages(
          data.url,
          './assets',
          {
            mstile: true,
            type: "png",
            portraitOnly: true,
            iconOnly: true,
            favicon: true,
            log: false,
          });

        })()
        .then(async function () {
          let folder = fs.readdirSync("./assets")
          let uri = [];
          let file = [];
          let imageBase64 = [];
          for (let i = 0; i < folder.length; i++) {
            uri[i] = ("./assets/" + folder[i])
            file[i] = fs.readFileSync(uri[i])
            imageBase64[i] = file[i].toString('base64');
          }
          resolve({ imageBase64, folder });
        })
    })
  // });
});
