<template>
  <v-container>
    <div class="display-1 py-2">Manifest.json</div>
    <v-card class="mx-auto" color="grey lighten-5" flat>
      <v-card-text class="list" ref="card">
        <v-row justify="end">
          <v-hover v-slot="{ hover }">
            <v-btn
              @click="jsonClipboard"
              v-clipboard:copy="jsonClipboard"
              v-clipboard:success="clipboardSuccessHandler"
              v-clipboard:error="clipboardErrorHandler"
              class="mt-0"
              large
              :elevation="hover ? 10 : 6"
              tile
              color="grey"
              style="color: white"
            >
              Copy
            </v-btn>
          </v-hover>
          <v-snackbar
            v-model="snackbar"
            bottom
            timeout="1000"
            :color="message.themeColor"
            flat
            tile
          >
            <div class="text-center" style="color: white">
              {{ snackbarMessage }}
            </div>
          </v-snackbar>
        </v-row>
        {
        <br />
        <div class="ml-4">
          <div v-if="message.appName != ''">
            <span class="text-purple">"name"</span>:
            <span class="text-red">"{{ message.appName }}"</span>,
            <br />
          </div>
          <div v-if="message.shortName != ''">
            <span class="text-purple">"short_name"</span>:
            <span class="text-red">"{{ message.shortName }}"</span>,
            <br />
          </div>
          <span class="text-purple">"theme_color"</span>:
          <span class="text-red">"{{ message.themeColor }}"</span>,
          <br />
          <span class="text-purple">"background_color"</span>:
          <span class="text-red">"{{ message.backgroundColor }}"</span>,
          <br />
          <span class="text-purple">"display"</span>:
          <span class="text-red">"{{ message.displaySelect }}"</span>,
          <br />
          <div v-if="message.orientationSelect != 'any'">
            <span class="text-purple">"orientation"</span>:
            <span class="text-red">"{{ message.orientationSelect }}"</span>,
            <br />
          </div>
          <span class="text-purple">"scope"</span>:
          <span class="text-red">"{{ message.application }}"</span>,
          <br />
          <span class="text-purple">"start_url"</span>:
          <span class="text-red">"{{ message.url }}"</span>,
          <br />
        </div>
        }
      </v-card-text>

      <!-- <v-card-actions>
            <v-list-item class="grow"> </v-list-item>
          </v-card-actions> -->
    </v-card>
    <div class="display-1 mt-4">Generate Icons</div>
    <div class="pt-1">
      The Web App Manifest allows for specifying icons of varying sizes. Upload
      a 512x512 image for the icon and we'll generate the remaining sizes.
    </div>
    <!-- <v-btn @click="copy" v-clipboard:copy="message" >Copy to clipboard</v-btn> -->
    <v-row class="mt-4 mx-0">
      <v-hover v-slot="{ hover }">
        <v-btn
          @click="click"
          class="mt-0"
          large
          :elevation="hover ? 10 : 6"
          tile
          color="primary"
          style="color: white"
        >
          <v-icon>mdi-upload</v-icon>
          ICON
        </v-btn>
      </v-hover>
      <v-file-input v-model="inputFile" ref="file" class="mt-0 mx-0" flat prepend-icon="mdi-none">
      </v-file-input>
    </v-row>
    <v-row justify="center" class="mt-4">
      <v-hover v-slot="{ hover }">
        <v-btn
          @click="generateManifest"
          width="40vh"
          class="mt-0"
          large
          :elevation="hover ? 10 : 6"
          tile
          color="green"
          style="color: white"
        >
          <v-icon>mdi-download</v-icon>
          Generate .ZIP
        </v-btn>
      </v-hover>
    </v-row>
  </v-container>
</template>
<script>
import { functions} from "@/firebase"
import JSZip from "jszip";
import saveAs from "file-saver";

export default {
  props: ["message"],
  data: () => ({
    icons: 
      [
        {
          "src": "./assets/manifest-icon-192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "./assets/manifest-icon-512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "./assets/apple-icon-180.png",
          "sizes": "180x180",
          "type": "image/png",
        },
        {
          "src": "./assets/favicon-196.png",
          "sizes": "196x196",
          "type": "image/png",
        },
        {
          "src": "./assets/apple-icon-180.png",
          "sizes": "180x180",
          "type": "image/png",
        },
        {
          "src": "./assets/mstile-icon-128.png",
          "sizes": "128x128",
          "type": "image/png"
        },
        {
          "src": "./assets/mstile-icon-270.png",
          "sizes": "270x270",
          "type": "image/png"
        },
        {
          "src": "./assets/mstile-icon-558.png",
          "sizes": "558x558",
          "type": "image/png"
        },
      ],
    json: "",
    snackbar: false,
    snackbarMessage: "",
    inputFile: null,
    url: null,
  }),

  methods: {
    async generateManifest(){
      //Generate json manifest with icons
      this.jsonClipboard("generate")

      const file = this.inputFile
      //Upload Image to storage from input on front end 
      this.$store.dispatch('uploadImage', file).then(()=>{

        //Get image url 
        this.$store.dispatch('getImage', file).then(async (url)=>{
          //Generate assets
          functions.useEmulator("localhost", 5001);
          const generateManifestRun = functions.httpsCallable('generateManifestRun');
          generateManifestRun({url}).then(async(data)=>{
            //Generate zip file with images and json
            let zip = new JSZip();
            let assets = zip.folder("assets")
            for(let i = 0; i < data.data.folder.length; i++){
              assets.file(data.data.folder[i], data.data.imageBase64[i], {base64: true});
            }
            zip.file("manifest.json", this.json);
            zip.generateAsync({type:"blob"})
            .then(function(content) {
                saveAs(content, "manifest.zip");
            });            
          }).then(async()=>{
              //Remove image on storage
              await this.$store.dispatch('deleteImage', file)
            })          
        })
      })      
    },

    click() {
      this.$refs.file.$refs.input.click();
    },
    clipboardSuccessHandler({ value }) {
      console.log("success", value);
      this.snackbar = true;
      this.snackbarMessage = "Copied to Clipboard";
    },

    clipboardErrorHandler({ value }) {
      console.log("error", value);
      this.snackbar = true;
      this.snackbarMessage = "Error on Copy to Clipboard";
    },
    jsonClipboard(f) {
      let orientation = this.message.orientationSelect;
      let name = this.message.appName;
      let short = this.message.shortName;
      if (this.message.orientationSelect == "any") {
        orientation = undefined;
      }
      if (this.message.appName == "") {
        name = undefined;
      }
      if (this.message.shortName == "") {
        short = undefined;
      }
      if(f !== "generate"){
        return (this.json = JSON.stringify(
          {
            name: name,
            short_name: short,
            theme_color: this.message.themeColor,
            background_color: this.message.backgroundColor,
            display: this.message.displaySelect,
            orientation: orientation,
            scope: this.message.application,
            start_url: this.message.url,
          },
          null,
          "\t"
        ));
      }else if (f === "generate"){
          return (this.json = JSON.stringify(
            {
              name: name,
              short_name: short,
              theme_color: this.message.themeColor,
              icons: this.icons,
              background_color: this.message.backgroundColor,
              display: this.message.displaySelect,
              orientation: orientation,
              scope: this.message.application,
              start_url: this.message.url,
            },
            null,
            "\t"
          ));
        }
    },
  }
}
</script>
<style scoped>
.text-purple {
  color: #7f26a6;
}
.text-red {
  color: #c41a16;
}
.list {
  font-family: "Roboto", sans-serif;
  font-size: 17px;
}
</style>