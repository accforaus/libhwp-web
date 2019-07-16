import * as types from './mutation_types'

export default {
  [types.ADD_FILE](state, payload) {
    state.fileItems.push(payload.file)
  },

  [types.ADD_SELECTED_FILE](state, payload) {
    state.selectedFile.push(payload.file)
  },

  [types.SET_SELECTED_FILES](state, { payload }) {
    state.selectedFile = payload
  },

  [types.SET_CURRENT_FEATURE](state, { payload }) {
    state.selectedFeature.en = payload
    switch (payload) {
      case 'TextFeature':
        state.selectedFeature.kr = '한글 문서 문자 추출'
        state.selectedFeature.sub = 'HWP File Text Extraction'
        break
      case 'FilenameFeature':
        state.selectedFeature.kr = '한글 문서 이름 관리'
        state.selectedFeature.sub = 'HWP Files Name Utils'
        break
      case 'ImageFeature':
        state.selectedFeature.kr = '한글 문서 이미지 추출'
        state.selectedFeature.sub = 'HWP File Images Extraction'
        break
      case 'TableFeature':
        state.selectedFeature.kr = '한글 문서 테이블/표 추출'
        state.selectedFeature.sub = 'HWP File Table Extraction'
        break
      case 'FileAttachFeature':
        state.selectedFeature.kr = '한글 문서 이어 붙히기'
        state.selectedFeature.sub = 'HWP File Append'
        break
      default:
        state.selectedFeature.kr = ''
        state.selectedFeature.sub = ''
        break
    }
  },

  [types.SET_EXTRACT_TEXT_DATA](state, { payload }) {
    state.textExtract.data = payload
  },

  [types.SET_EXTRACT_TABLE_DATA](state, { payload }) {
    state.tableExtract.data = payload
  },

  [types.SET_DOWNLOAD_LINK](state, { payload }) {
    state.modifyName.downloadLink = payload
  },

  [types.SET_ATTACH_FILE_LINK](state, { payload }) {
    state.attachFile.downloadLink = payload
  },

  [types.SET_EXTRACT_IMAGE_LIST](state, { payload }) {
    state.imageExtract.imageList = payload
  }
}
