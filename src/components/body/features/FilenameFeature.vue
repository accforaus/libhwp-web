<template>
  <v-container fluid grid-list-xs>
    <v-layout row wrap fill-height align-start>
      <v-flex xs5 d-flex>
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="headline">한글(hwp) 파일명 관리</div>
              <span class="grey--text">Filename Management</span>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div>
              <v-text-field v-model="nameOptions.charSequence"
                            solo label="Char Sequence"></v-text-field>
              <v-text-field v-model="nameOptions.prefix"
                            solo label="Prefix"></v-text-field>
              <v-text-field v-model="nameOptions.suffix"
                            class="mb-0" solo label="Suffix"></v-text-field>
            </div>
            <div class="d-flex">
              <v-checkbox v-model="nameOptions.order.isOrder" class="pt-0" label="Number Order"></v-checkbox>
              <v-spacer></v-spacer>
              <v-text-field v-if="nameOptions.order.isOrder" class="pt-1"
                            v-model="nameOptions.order.startNumber"
                            style="width: 20px; height: 5px;"
                            label="order"
                            solo type="number"></v-text-field>
              <v-spacer></v-spacer>
            </div>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-flex>
      <v-flex xs1 align-self-center>
        <div class="d-block text-xs-center">
          <v-btn class="d-block pl-2" flat disabled>
            <v-icon large>
              fas fa-arrow-right
            </v-icon>
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs6>
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="headline">수정된 파일명</div>
              <span class="grey--text">Modified</span>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="text-xs-left">
            <v-container grid-list-xs pa-0 id="scroll-target" style="max-height: 200px" class="scroll-y">
              <v-layout
                column>
                <v-list dense>
                  <v-list-tile avatar v-for="item in getModifiedList" :key="item.title">
                    <v-list-tile-avatar>
                      <v-icon class="grey lighten-1 white--text">insert_drive_file</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-title>
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-if="getDownloadLink !== ''" color="red" flat large :href="getDownloadLink">저장하기</v-btn>
            <v-btn v-else color="cyan" flat large @click="onSaveFile">변환하기</v-btn>
            <v-btn flat large color="blue" @click="onClickInit">초기화</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import {MODIFY_NAME} from "../../../store/mutation_types";

    export default {
        name: "FilenameFeature",
      data: () => ({
        doneState: false,
        downloadLink: '',
        nameOptions: {
          charSequence: '',
          prefix: '',
          suffix: '',
          order: {
            isOrder: false,
            startNumber: 1
          }
        },
        sampleData: [],
        cachedData: []
      }),

      activated() {
          this.sampleData = []
          this.$store.getters.GET_FILES.forEach(item => {
            this.sampleData.push({'title': item.name, 'index': item.index})
          })
          this.cachedData = this.sampleData
      },

      methods: {
          onSaveFile: function() {
            const sendData = {}
            this.sampleData.forEach(item => {
              sendData[`${item.index}`] = item.title
            })
            const formData = new FormData()
            formData.append("data", JSON.stringify(sendData))

            this.$store.dispatch(MODIFY_NAME, { payload: formData })
              .then().catch()
          },

          onClickInit: function() {
            this.sampleData = this.cachedData
            this.downloadLink = ''
            this.nameOptions =  {
              charSequence: '',
              prefix: '',
              suffix: '',
              order: {
                isOrder: false,
                startNumber: 1
              }
            }
          }
      },

      computed: {
          getModifiedList: function() {
            let dataList = []
            this.sampleData.forEach((item, index) => {
              let order = Number(this.nameOptions.order.startNumber) + index
              let title = ''
              if (/\.hwp+/.test(item.title)) item.title.replace(/\.hwp/, '')
              if (this.nameOptions.charSequence !== '') title = this.nameOptions.prefix + this.nameOptions.charSequence + this.nameOptions.suffix + order + ".hwp"
              else title = this.nameOptions.prefix + item.title + this.nameOptions.suffix + order + ".hwp"
              dataList.push({title: title, index: item.index})
            })

            this.sampleData = dataList
            return dataList
          },

          getDownloadLink: function() {
            return this.$store.getters.GET_DOWNLOAD_LINK
          }
      }
    }
</script>

<style scoped>

</style>
