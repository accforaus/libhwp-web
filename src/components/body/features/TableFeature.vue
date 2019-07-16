<template>
    <v-container pa-0>
      <v-layout column>
        <v-flex>
          <v-card>
            <v-card-text primary-title>
              <div class="text-xs-center">
                <div class="headline">추출된 테이블</div>
                <span class="grey--text">Extracted Table List</span>
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <v-toolbar color="white" flat>
                <v-toolbar-title>{{ pageNames }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-pagination
                    circle
                    v-model="page"
                    :length="tableLength"
                    :total-visible="7"
                    color="cyan">
                  </v-pagination>
                </v-toolbar-items>
              </v-toolbar>
              <v-data-table
                hide-actions
                v-for="tableItem in getTableData" :key="tableItem.index"
                v-show="tableItem.index === page - 1"
                hide-headers :items="tableItem.data">
                <template v-slot:items="props">
                  <td v-for="(col, index) in tableItem.data"> {{ props.item[`col${index}`] }}</td>
                </template>
              </v-data-table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="cyan" flat large @click="onClickExtract">추출하기</v-btn>
              <v-btn flat large color="red">지우기</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  import {EXTRACT_TABLE, SET_EXTRACT_TABLE_DATA} from "../../../store/mutation_types";
  import FeatureCard from "../unit/FeatureCard";

    export default {
        name: "TableFeature",
      components: {FeatureCard},
      data: () => ({
        page: 1,
        tableName: 'There is no table yet',
        pagination: {},
        fileIndex: -1,
        tableData: [],
        currentTableIndex: 0
      }),

      methods: {
        onClickExtract: function () {
          const index = this.$store.getters.GET_SELECTED_FILES[0].index
          this.$store.dispatch(EXTRACT_TABLE, { payload: index })
            .then().catch()
        },

        getTableRowAndColumn: function(index) {
          const tableRowColumn = {row: 0, column: 0}
          this.getTableData.forEach(item => {
            if (item.index === index) {
              let row = item.data.length
              tableRowColumn.row = row
              if (row > 0) {
                tableRowColumn.column = Object.keys(item.data[0]).length
              }
            }
          })
          return tableRowColumn
        }
      },

      computed: {
        pages() {
          if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0
          return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        },

        tableLength: function() {
          return this.getTableData.length
        },

        pageNames: function() {
          const tableRowColumn = this.getTableRowAndColumn(this.page - 1)
          return `Table ${this.page} (${tableRowColumn.row}, ${tableRowColumn.column})`
        },

        getTableData: function() {
          const data = this.$store.getters.GET_EXTRACT_TABLE_DATA
          return data !== null ? data : []
        }
      },

      activated() {
        this.tableData = []
        this.$store.commit(SET_EXTRACT_TABLE_DATA, { payload: null })
      }
    }
</script>

<style scoped>

</style>
