<template>
    <v-container fluid pa-0 grid-list-xs>
      <v-layout row wrap fill-height align-start>
        <v-flex pr-2>
          <v-card>
            <v-toolbar flat color="transparent">
              <v-toolbar-title>
                대표 파일
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-pagination
                  circle
                  color="red"
                  v-model="mainPagination.page"
                  :length="mainPages"></v-pagination>
              </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
              <v-data-table
                v-model="selectedMainFiles"
                :pagination.sync="mainPagination"
                :headers="headers"
                :items="main"
                item-key="name"
                select-all
                hide-actions>
                <template v-slot:items="props">
                  <td>
                    <v-checkbox
                      v-model="props.selected"
                      primary
                      hide-details></v-checkbox>
                  </td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.size }}</td>
                  <td>{{ props.item.version }}</td>
                  <td>{{ props.item.paragraph }}</td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex pl-2>
          <v-card>
            <v-toolbar flat color="transparent">
              <v-toolbar-title>
                하위 파일
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-pagination
                  circle
                  v-model="subPagination.page"
                  :length="subPages"></v-pagination>
              </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
              <v-data-table
                v-model="subFiles"
                :pagination.sync="subPagination"
                :headers="headers"
                :items="subItems"
                item-key="name"
                select-all
                hide-actions>
                <template v-slot:items="props">
                  <td>
                    <v-checkbox
                      v-model="props.selected"
                      primary
                      hide-details></v-checkbox>
                  </td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.size }}</td>
                  <td>{{ props.item.version }}</td>
                  <td>{{ props.item.paragraph }}</td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-flex pt-5>
        <v-btn
          outline
          v-if="getDownloadLink === ''"
          block color="cyan"
          large @click="onClickAttach">
          파일 이어 붙히기
        </v-btn>
        <v-btn v-else
          outline color="red" large :href="getDownloadLink" block>다운로드</v-btn>
      </v-flex>
    </v-container>
</template>

<script>
  import {ATTACH_FILES, SET_ATTACH_FILE_LINK} from "../../../store/mutation_types";

    export default {
        name: "FileAttachFeature",
      data: () => ({
        loader: null,
        downloadLink: '',
        loading: false,
        subPagination: {},
        mainPagination: {},
        subFiles: [],
        mainFile: [],
        selectedMainFiles: [],
        main: [],
        headers: [
          {
            text: 'Document',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Size (MB)', value: 'size' },
          { text: 'Version', value: 'version' },
          { text: 'Paragraph', value: 'paragraph' },
        ],
        fileItems: [],
        mainItems: [],
        subItems: []
      }),

      methods: {
        onClickAttach: function() {
          this.loader = 'loading'
          const sendData = {}
          sendData['main'] = this.selectedMainFiles[0].index
          this.subFiles.forEach((item, index) => {
            sendData[`sub${index}`] = item.index
          })
          const formData = new FormData()
          console.dir(sendData)
          formData.append('data', JSON.stringify(sendData))
          this.$store.dispatch(ATTACH_FILES, { payload: formData })
            .then().catch()
        }
      },

      computed: {
        subPages() {
          if (this.subPagination.rowsPerPage == null || this.subPagination.totalItems == null) return 0
          return Math.ceil(this.subPagination.totalItems / this.subPagination.rowsPerPage)
        },
        mainPages() {
          if (this.mainPagination.rowsPerPage == null || this.mainPagination.totalItems == null) return 0
          return Math.ceil(this.mainPagination.totalItems / this.mainPagination.rowsPerPage)
        },
        getDownloadLink: function() {
          return this.$store.getters.GET_ATTACH_FILE_LINK
        }
      },

      watch: {
          loader: function() {
            const l = this.loader
            this[l] = !this[l]
          },

        'selectedMainFiles.length': function (newValue, oldValue) {
            if (newValue === 1) {
              this.subItems = this.main.filter(item => {
                return item.name !== this.selectedMainFiles[0].name
              })
              this.main = this.main.filter(item => {
                return item.name === this.selectedMainFiles[0].name
              })
            } else if (newValue === 0) {
              this.subItems.forEach(item => {
                this.main.push(item)
              })
              this.subItems = []
            }
        }
      },

      activated() {
          this.main = this.$store.getters.GET_FILES
          this.$store.commit(SET_ATTACH_FILE_LINK, { payload: '' })
          this.subItems = []
      }
    }
</script>

<style scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
