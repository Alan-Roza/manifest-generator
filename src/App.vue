<template>
  <v-app>
    <v-app-bar app :color="themeColor" dark>
      <v-row justify="center">
        <a style="text-decoration: none;" href="#"
          ><div class="title-custom">
            Web App Manifest Generator
          </div></a
        >
      </v-row>
    </v-app-bar>

    <v-main>
          <formManifest
            @themecolor="changedColorTheme"
            ref="formManifest"
          />
    </v-main>
    <!-- <v-main>
    </v-main> -->
  </v-app>
</template>
   
<script>
import FormManifest from "@/views/FormManifest.vue";

export default {
  name: "App",

  components: {
    FormManifest,
  },

  data: () => ({
    themeColor: '',
    bgColor: '',
  }),
  methods: {
    validate() {
      this.$refs.formManifest.validate();
    },  
    changedColorTheme(value){
      this.themeColor = value
    },
    changedColorBG(value){
      this.bgColor = value
    },
  },
};
</script>
<style scoped>
.title-custom {
  color: white;
  font-size: 165%;
}
</style>