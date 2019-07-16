<template>
    <v-card>
      <v-toolbar color="white" flat light>
        <v-toolbar-title>사용가능한 파일(hwp)</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="pickFile">
          <v-icon>add</v-icon>
        </v-btn>
        <form enctype="multipart/form-data">
          <input type="file" accept=".hwp, .HWP" style="display: none;" ref="file" multiple @change="onFilePicked">
        </form>
      </v-toolbar>
      <v-card-text>
        <v-data-table
          v-model="selectedFile"
          :headers="headers"
          :items="fileItemList"
          item-key="name"
          select-all>
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
            <td>{{ props.item.table }}</td>
            <td>{{ props.item.picture }}</td>
            <td>{{ props.item.control }}</td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
</template>

<script>
    import {SET_SELECTED_FILES, UPLOAD_FILES} from "../../../store/mutation_types";

    export default {
        name: "FileTable",
      data: () => ({
        pagination: {},
        selectedFile: [],
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
          { text: 'Table', value: 'table' },
          { text: 'Picture', value: 'picture' },
          { text: 'Control', value: 'control' }
        ],
        fileItems: []
      }),

      watch: {
          'selectedFile.length': function (newValue, oldValue) {
            this.$store.commit(SET_SELECTED_FILES, { payload: this.selectedFile })
          }
      },

      methods: {
        pickFile: function () {
          this.$refs.file.click()
        },

        onFilePicked: function (elements) {
          const files = elements.target.files
          if (files !== undefined) {
            const fd = new FormData()
            if (files.length === 1) {
              fd.append('file', files[0], files[0].name)
              this.$store.dispatch('UPLOAD_FILE', { payload: fd })
                .then(result => result).catch(error => console.error(error))
            } else {
              for (let index = 0; index < files.length; index++) fd.append('files', files[index])
              this.$store.dispatch(UPLOAD_FILES, { payload: fd }).then().catch()
            }
          }
        }
      },

      computed: {
          pages() {
            if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0
            return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
          },
          fileItemList: function() {
            return this.$store.getters.GET_FILES
          }
      }
    }
</script>

<style scoped>

</style>
