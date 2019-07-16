<template>
    <v-container pa-0>
      <v-dialog v-model="dialog" persistent max-width="600" max-height="700">
        <v-card>
          <v-card-text class="text-xs-center" primary-title>
            <div>
              <div class="headline">{{ imageChooseItem.name }}</div>
              <p class="grey--text">{{ imageChooseItem.size }} bytes</p>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-img :src="imageChooseItem.path"></v-img>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="onClickDialogOk">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-layout column fill-height>
        <v-flex pt-3>
          <v-card>
            <v-card-text class="text-xs-center" primary-title>
              <div>
                <div class="headline">추출된 이미지</div>
                <span class="grey--text">Extracted images</span>
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text class="py-0">
              <v-layout row justify-space-between>
                <v-flex xs3 pb-0 pt-1>
                  <v-slider class="mt-4"
                    v-model="tickValue"
                    :max="6"
                    steps="2"
                    ticks="always"
                    append-icon="zoom_in"
                    prepend_icon="zoom_out"
                    tick-size="1">
                  </v-slider>
                </v-flex>
                <v-flex xs3 pb-0 pt-1>
                  <v-select
                    flat class="mt-3"
                    :items="imageType"
                    v-model="imageSelect"
                    label="Image Type..."
                    solo></v-select>
                </v-flex>
                <v-flex xs3 pb-0 pt-1>
                  <v-combobox
                    flat class="mt-3"
                    v-model="select"
                    :items="names"
                    multiple solo
                    label="Search Name of Images..."/>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <v-container pa-0 id="scroll-target" style="max-height: 600px" class="scroll-y">
                <v-card>
                  <v-container grid-list-sm fluid>
                    <v-layout row wrap>
                      <v-flex
                        :class="`xs${tickValue}`" d-flex
                        v-for="item in getImages" :key="item.name">
                        <v-card @click.stop="onClickImage(item)" hover flat tile class="d-flex pa-1">
                          <v-img :src="item.path" aspect-ratio="1" class="grey lighten-2"/>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn block flat large color="cyan" @click="onClickExtract">추출하기</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  import {EXTRACT_IMAGE, SET_EXTRACT_IMAGE_LIST, GET_EXTRACT_IMAGE_LIST, GET_SELECTED_FILES} from "../../../store/mutation_types";

    export default {
        name: "ImageFeature",
      data: () => ({
        tickValue: 2,
        name: '',
        select: [],
        imageType: ['all', 'png', 'jpg', 'jpeg', 'bmp'],
        imageChooseItem: {},
        imageSelect: '',
        imageList: [],
        index: 0,
        pagination: {},
        dialog: false
      }),

      activated() {
        this.$store.commit(SET_EXTRACT_IMAGE_LIST, { payload: null })
      },

      methods: {
          onClickExtract: function() {
            const index = this.$store.getters.GET_SELECTED_FILES[0].index
            this.$store.dispatch(EXTRACT_IMAGE, { payload: index })
              .then().catch()
          },

          onClickImage: function(item) {
            this.imageChooseItem = item
            this.dialog = true
          },

          onClickDialogOk: function() {
            this.imageChooseItem = {}
            this.dialog = false
          }
      },

      computed: {
        pages: function() {
          if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0
          return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        },
        names: function() {
          return this.getImageList.map(item => {
            return item.name
          })
        },
        getImageList: function() {
          const data = this.$store.getters.GET_EXTRACT_IMAGE_LIST
          return data !== null ? data : []
        },
        getImages: function() {
          let data = []
          if (this.select.length > 0) {
            this.getImageList.forEach(imageInfo => {
              this.select.forEach(selected => {
                if (imageInfo.name === selected) {
                  data.push(imageInfo)
                }
              })
            })
          } else
            data = this.getImageList
          if (this.imageSelect !== '' && this.imageSelect !== 'all') {
            data = data.filter(item => {
              return item.name.split('.')[1] === this.imageSelect
            })
          }
          return data
        }
      }
    }
</script>

<style scoped>

</style>
