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
          @click="generateFile"
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
// import firebase from "firebase";
// import JSZip from "jszip";
// import saveAs from 'file-saver';
export default {
  props: ["message"],
  data: () => ({
    teste: "",
    snackbar: false,
    snackbarMessage: "",
    inputFile: null,
    url: null,
  }),
  methods: {
    //       zip(){
    //         // console.log(this.inputFile);
    //         // var metadata = {
    //         //   contentType: 'application/zip'
    //         // }
    //         console.log("input",this.inputFile);
    //         firebase.functions().useEmulator("localhost", 5001);
    //         const zip = firebase.functions().httpsCallable('zip');
    //         zip({}).then(async(e)=>{
    //           console.log(e, e.data[0]);
    //           var image = new Blob([e[0]], {type : 'image/png'}); 
    //           console.log(image);
    //           var azip = new JSZip();
    //         azip.file('teste.png', image, 'base64');

    //         azip.generateAsync({type:"blob"}) .then(function(content) {
    //     // see FileSaver.js
    //     saveAs(content, "example.zip");
    // });
        // .generateNodeStream({type:'blob',streamFiles:true})
        // .pipe(fs.createWriteStream('assets.zip'))
        // .then(function(content) {
        //   // see FileSaver.js
        //   saveAs(content, "example.zip");
        // });
          // let storageRef = await firebase.storage().ref('assets.zip');
        // storageRef.put(e, metadata)

        //  console.log("return",e);
      //   })
      // },

    //  upload(){
    //   const file = this.inputFile
    //   console.log("here is the file",file);
    //   firebase.functions().useEmulator("localhost", 5001);
    //   const uploadImage = firebase.functions().httpsCallable('uploadImage');
    //   uploadImage({file})
    // },

    // async generateFile(){
    //   const file = this.inputFile
    //   // const storageRef = firebase.storage().ref();
    //   const fileName = file.name

      //upload file
      // var storageRef = (await firebase.storage()).ref(fileName);
      // storageRef.put(file)
      // .then(async()=>{
      //   let url = await firebase.storage().ref(file.name).getDownloadURL()
      //   console.log("log file",file)

      //   // let url = URL.createObjectURL(this.inputFile);
      //   console.log("url", url)
      //   // console.log(file)
      //   firebase.functions().useEmulator("localhost", 5001);
      //   const addMessage = await firebase.functions().httpsCallable('addMessage');
      //   addMessage({url}).then(async()=>{
        // for(let i=0; i<2; i++){
        //   let place = './manifest/apple-splash-640-1136.jpg';
        //   let imageRef = storageRef.child('teste1.jpg');
        //   imageRef.put(place, metadata)
        //   console.log("here is manifest", place)
        // // }
      // })

      // console.log()
      // create assets



      // var manifestStorageRef = (await firebase.storage()).ref('manifest/'+ file.name);
      // manifestStorageRef.put('../../functions/manifest/apple-splash-640-1136.jpg')
      // })


      // let teste = '../../functions/manifest'
      // var assetStorageRef = (await firebase.storage()).ref('manifest');
      // var uploadAssets = assetStorageRef.child('manifest/').put(teste)
      // console.log("chegou", uploadAssets)
      // firebase.functions().useEmulator("localhost", 5001);
      // const zip = await firebase.functions().httpsCallable('zip');
      // zip()

    // },
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
    jsonClipboard() {
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
      return (this.teste = JSON.stringify(
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
    },
    // myFunction() {
    //   /* Get the text field */
    //   var copyText = document.getElementById("text");
    //   console.log(copyText);
    //   /* Select the text field */
    //   copyText.select();
    //   copyText.setSelectionRange(0, 99999); /* For mobile devices */

    //   /* Copy the text inside the text field */
    //   document.execCommand("copy");

    //   /* Alert the copied text */
    //   alert("Copied the text: " + copyText.value);
    // }
    //   copy(){
    //     this.$clipboard(
    //         this.value
    //     )
    //   }
  // },
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