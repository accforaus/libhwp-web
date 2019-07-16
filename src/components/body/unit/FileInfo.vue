<template>
    <v-card class="elevation-3">
      <v-layout row fill-height align-space-around>
        <v-flex xs3>
          <v-card flat>
            <v-img :src="require('../../../../static/logo/hangul.png')"></v-img>
          </v-card>
        </v-flex>
        <v-flex>
          <v-divider vertical></v-divider>
        </v-flex>
        <v-flex xs9 glow>
          <v-card flat>
            <v-tabs show-arrows>
              <v-tab v-for="selectedFile in getSelectedFile"
                     :key="selectedFile['name']" :href="`#tab-${selectedFile['index']}`">
                {{ selectedFile['name'] }}
              </v-tab>
              <v-tabs-items>
                <v-tab-item :transition="false" :reverse-transition="false"
                  v-for="selectedFile in getSelectedFile" :key="selectedFile['name']"
                            :value="`tab-${selectedFile['index']}`">
                  <file-card :file="selectedFile"></file-card>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
</template>

<script>
    import FileCard from "./FileCard";
    export default {
        name: "FileInfo",
      components: {FileCard},
      data: () => ({
        tabModel: 'tab-1'
      }),

      computed: {
          getSelectedFile: function() {
            return this.$store.getters.GET_SELECTED_FILES
          }
      }
    }
</script>

<style scoped>

</style>
