<template>
  <v-row class="mx-auto">
    <v-col lg="6" md="12" sm="12" xs="12">
      <v-container class="mt-4">
        <div>
          The
          <a class="text" href="https://www.w3.org/TR/appmanifest/"
            >Web App Manifest</a
          >
          is a JSON document that provides application metadata for
          <a class="text" href="https://web.dev/progressive-web-apps/"
            >Progressive Web Apps</a
          >. Use the form below to generate the JSON file and optionally upload
          an app icon.
        </div>
        <v-form ref="form" class="mt-2">
          <v-row>
            <v-col cols="12" lg="6" md="12">
              <v-text-field
              class="pb-0 mb-0"
                v-model="message.appName"
                label="App Name"
                placeholder="Write the full name here"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="12">
              <v-text-field
                v-model="message.shortName"
                placeholder="Write the short name here"
                label="Short Name"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="6" md="12">
              <v-text-field
                class="pb-6"
                v-model="message.themeColor"
                hide-details
                :color="message.themeColor"
                label="Theme Color"
              >
                <template v-slot:append>
                  <v-menu
                    v-model="themeMenu"
                    top
                    :close-on-content-click="false"
                  >
                    <template v-slot:activator="{ on }">
                      <div :style="swatchStyleTheme" v-on="on" class="mb-1" />
                    </template>
                    <v-card>
                      <v-card-text class="pa-1">
                        <v-color-picker v-model="message.themeColor" flat />
                      </v-card-text>
                    </v-card>
                  </v-menu>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" lg="6" md="12">
              <v-text-field
                class="pb-6"
                v-model="message.backgroundColor"
                hide-details
                :color="message.backgroundColor"
                label="Background Color"
              >
                <template v-slot:append>
                  <v-menu
                    v-model="backgroundMenu"
                    top
                    :close-on-content-click="false"
                  >
                    <template v-slot:activator="{ on }">
                      <div
                        :style="swatchStyleBackground"
                        v-on="on"
                        class="mb-1"
                      />
                    </template>
                    <v-card>
                      <v-card-text class="pa-1">
                        <v-color-picker v-model="message.backgroundColor" flat />
                      </v-card-text>
                    </v-card>
                  </v-menu>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="6" md="12">
              <v-select
                v-model="message.displaySelect"
                :items="display"
                label="Display Mode"
              ></v-select>
            </v-col>
            <v-col cols="12" lg="6" md="12">
              <v-select
                v-model="message.orientationSelect"
                :items="orientation"
                label="Orientation"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="6" md="12">
              <v-text-field
                v-model="message.application"
                label="Application Scope"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="12">
              <v-text-field
                v-model="message.url"
                label="Start Url"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-col>
    <v-col lg="6" md="12" sm="12" xs="12">
      <jsonManifest 
        :message="message"
      />
    </v-col>
  </v-row>
</template>
<script>
import JsonManifest from "@/components/JsonManifest.vue";

export default {
  components: {
    JsonManifest,
  },
  data: () => ({
    message:{
      appName: "",
      shortName: "",
      application: "/",
      url: "/",
      displaySelect: "browser",
      orientationSelect: "any",
      themeColor: "#1976D2FF",
      backgroundColor: "#1976D2FF",
    },
    themeMenu: false,
    backgroundMenu: false,
    display: ["browser", "standalone", "minimal-iu", "fullscreen"],
    orientation: ["any", "portrait", "landscape"],
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
  },
  
  computed: {
    swatchStyleTheme() {
      // const { themeColor, themeMenu } = this;
      this.$emit("themecolor", this.message.themeColor);
      return {
        backgroundColor: this.message.themeColor,
        cursor: "pointer",
        height: "30px",
        width: "30px",
        borderRadius: this.themeMenu ? "50%" : "4px",
        transition: "border-radius 200ms ease-in-out",
      };
    },
    swatchStyleBackground() {
      // const { backgroundColor, backgroundMenu } = this;
      // this.$emit("backgroundcolor", this.backgroundColor);
      return {
        backgroundColor: this.message.backgroundColor,
        cursor: "pointer",
        height: "30px",
        width: "30px",
        borderRadius: this.backgroundMenu ? "50%" : "4px",
        transition: "border-radius 200ms ease-in-out",
      };
    },
  },
};
</script>
<style scoped>
.text {
  text-decoration: none;
}
</style>