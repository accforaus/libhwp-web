import axios from 'axios'
import * as types from './mutation_types'
import {SET_EXTRACT_TEXT_DATA} from "./mutation_types";
import {SET_EXTRACT_TABLE_DATA} from "./mutation_types";
import {SET_DOWNLOAD_LINK} from "./mutation_types";
import {SET_ATTACH_FILE_LINK} from "./mutation_types";
import {SET_EXTRACT_IMAGE_LIST} from "./mutation_types";
import {ADD_FILE} from "./mutation_types";

const server_address = 'http://localhost:3030/api'

export default {
  [types.UPLOAD_FILE]({ commit }, {
    payload
  }) {
    axios.post(`${server_address}/upload`, payload)
      .then(result => {
        commit(types.ADD_FILE, { file: result.data })
      }).catch(error => console.error(error))
  },
  [types.UPLOAD_FILES]({ commit }, {
    payload
  }) {
    axios.post(`${server_address}/upload/multiple`, payload)
      .then(result => {
        result.data.forEach(item => {
          commit(ADD_FILE, { file: item })
        })
      }).catch(error => console.error(error))
  },
  [types.EXTRACT_TEXT]({ commit }, {
    payload
  }) {
    axios.get(`${server_address}/text/${payload}`)
      .then(result => {
        commit(SET_EXTRACT_TEXT_DATA, { payload: result.data })
      }).catch(error => console.error(error))
  },
  [types.EXTRACT_TABLE]({ commit }, {
    payload
  }) {
    axios.get(`${server_address}/table/${payload}`)
      .then(result => {
        const tableData = []
        result.data.forEach((item, index) => {
          const tableInfo = { index: index }
          let count = 0
          let data = []
          for (let row in item['rowMap']) {
            const columnData = {}
            for (let column in item['rowMap'][row]) {
              let columnCount = 0
              for (let text in item['rowMap'][row][column]) {
                columnData[`col${columnCount}`] = item['rowMap'][row][column][text]['text']
                columnCount++
              }
            }
            data.push(columnData)
            tableInfo['data'] = data
            count++
          }
          tableData.push(tableInfo)
        })
        commit(SET_EXTRACT_TABLE_DATA, { payload: tableData })
      }).catch(error => console.error(error))
  },
  [types.MODIFY_NAME]({ commit }, {
    payload
  }) {
    axios.post(`${server_address}/filename`, payload)
      .then(result => {
        commit(SET_DOWNLOAD_LINK, { payload: result.data})
      }).catch(error => console.error(error))
  },
  [types.ATTACH_FILES]({ commit }, {
    payload
  }) {
    axios.post(`${server_address}/attach`, payload)
      .then(result => commit(SET_ATTACH_FILE_LINK, { payload: result.data}))
      .catch(error => console.error(error))
  },

  [types.EXTRACT_IMAGE]({ commit }, {
    payload
  }) {
    axios.get(`${server_address}/image/${payload}`)
      .then(result => commit(SET_EXTRACT_IMAGE_LIST, { payload: result.data }))
      .catch(error => console.error(error))
  }
}
