import * as types from './mutation_types'

export default {
  [types.GET_FILES](state) {
    return state.fileItems
  },

  [types.GET_SELECTED_FILES](state) {
    return state.selectedFile
  },

  [types.GET_CURRENT_FEATURE](state) {
    return state.selectedFeature
  },

  [types.GET_EXTRACT_TEXT_DATA](state) {
    return state.textExtract.data
  },

  [types.GET_EXTRACT_TABLE_DATA](state) {
    return state.tableExtract.data
  },

  [types.GET_DOWNLOAD_LINK](state) {
    return state.modifyName.downloadLink
  },

  [types.GET_ATTACH_FILE_LINK](state) {
    return state.attachFile.downloadLink
  },

  [types.GET_EXTRACT_IMAGE_LIST](state) {
    return state.imageExtract.imageList
  }
}
