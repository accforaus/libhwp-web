<template>
    <v-container pa-0 grid-list-xs fluid>
      <v-card class="elevation-4">
        <v-layout row fill-height align-baseline justify-center>
          <v-flex xs3>
            <v-card color="transparent" flat>
              <v-card-text class="text-xs-center pb-0">
                <div>
                  <v-layout column>
                    <v-flex xs4 pt-2>
                      <v-card color="transparent" flat>
                        <v-card-text primary-title class="py-0">
                          <div class="title">텍스트 추출 옵션</div>
                        </v-card-text>
                        <v-card-text>
                          <v-radio-group v-model="searchOptionModel" class="flex-center" column disabled>
                            <v-radio label="All" value="all"></v-radio>
                            <v-radio label="Paragraph" value="paragraph"></v-radio>
                            <v-radio label="Control" value="control"></v-radio>
                          </v-radio-group>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex>
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex xs4 pt-2 py-0>
                      <v-card color="transparent" flat>
                        <v-card-text primary-title class="pb-0">
                          <div class="title">텍스트 옵션</div>
                        </v-card-text>
                        <v-card-text>
                          <v-radio-group v-model="textOptionModel" row class="flex-center">
                            <v-radio label="전체" value="all"></v-radio>
                            <v-radio label="한글" value="kor"></v-radio>
                            <v-radio label="영어" value="eng"></v-radio>
                          </v-radio-group>
                          <v-radio-group v-model="textOptionModel" row class="flex-center">
                            <v-radio label="숫자" value="num"></v-radio>
                            <v-radio label="기호" value="sym"></v-radio>
                          </v-radio-group>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex>
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex xs4 pt-2 pb-3>
                      <v-card color="transparent" flat>
                        <v-card-text class="pb-3">
                          <div class="title">추출 정보</div>
                        </v-card-text>
                        <v-layout row>
                          <v-flex xs-3></v-flex>
                          <v-flex xs-3 class="text-xs-right" pr-4>
                            <div class="subheading font-weight-light pb-2">총 글자수: </div>
                            <div class="subheading font-weight-light pb-2">한글: </div>
                            <div class="subheading font-weight-light pb-2">영어: </div>
                            <div class="subheading font-weight-light pb-2">숫자: </div>
                            <div class="subheading font-weight-light pb-2">기호: </div>
                          </v-flex>
                          <v-flex xs-3 class="text-xs-right">
                            <div class="subheading font-weight-light pb-2"><span class="font-weight-bold">{{ getTextLength('total')}}</span>자</div>
                            <div class="subheading font-weight-light pb-2"><span class="font-weight-bold">{{ getTextLength('kor')}}</span>자</div>
                            <div class="subheading font-weight-light pb-2"><span class="font-weight-bold">{{ getTextLength('eng')}}</span>자</div>
                            <div class="subheading font-weight-light pb-2"><span class="font-weight-bold">{{ getTextLength('num')}}</span>자</div>
                            <div class="subheading font-weight-light pb-2"><span class="font-weight-bold">{{ getTextLength('sym')}}</span>자</div>
                          </v-flex>
                          <v-flex xs-3></v-flex>
                          <v-flex xs-3></v-flex>
                        </v-layout>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn large block flat color="cyan" @click="onExtractText">추출하기</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex xs9>
            <v-card color="transparent" flat>
              <v-card-text primary-title class="text-xs-center pb-0">
                <div>
                  <div class="headline">추출 결과</div>
                  <span class="grey--text">Results</span>
                </div>
              </v-card-text>
              <input type="hidden" id="copy-text" :value="htmlTextToNormal"/>
              <input type="hidden" id="copy-text-tag" :value="getTextResult"/>
              <v-card-text class="px-0">
                <quill-editor
                  class="quill-editor mb-5"
                  v-model="textOptionModel === 'all' ? getTextResult : getFilteredResult"
                  :options="editorOption"
                  ref="resultEditor">
                </quill-editor>
              </v-card-text>
              <v-card-actions class="mt-1">
                <v-spacer></v-spacer>
                <v-btn large color="red" flat @click="onClearText">지우기</v-btn>
                <v-btn color="cyan" large flat @click="onClickCopyWithTag">복사하기 (with 태그)</v-btn>
                <v-btn color="cyan" large flat @click="onClickCopyOnlyNormal">복사하기 (normal)</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
</template>

<script>
  import {EXTRACT_TEXT, SET_EXTRACT_TEXT_DATA} from "../../../store/mutation_types";

    export default {
        name: "TextFeature",
        data: () => ({
          copyWithTag: false,
          testText: {},
          searchOptionModel: 'all',
          textOptionModel: 'all',
          showOptions: false,
          textLength: 0,
          textResult: '',
          rawText: '',
          fileIndex: -1,
          extractInfo: {
            'total': 999990,
            'kor': 120,
            'eng': 660,
            'num': 430,
            'sym': 4320
        },
          editorOption: {
            module: {
              toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{'header': 1}, {'header': 2}],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'script': 'sub'}, {'script': 'super'}],
                [{'indent': '-1'}, {'indent': '+1'}],
                [{'direction': 'rtl'}],
                [{'size': ['small', false, 'large', 'huge']}],
                [{'header': [1, 2, 3, 4, 5, 6, false]}],
                [{'font': []}],
                [{'color': []}, {'background': []}],
                [{'align': []}],
              ],
            }
          }
      }),

      methods: {
          onClearText: function() {
            this.$store.commit(SET_EXTRACT_TEXT_DATA, { payload: null })
          },

          onExtractText: function() {
            const index = this.$store.getters.GET_SELECTED_FILES[0].index
            this.$store.dispatch(EXTRACT_TEXT, { payload: index }).then().catch()
          },

          onClickCopyWithTag: function () {
            this.copyWithTag = true
            this.onCopyClipBoard()
          },

          onClickCopyOnlyNormal: function () {
            this.copyWithTag = false
            this.onCopyClipBoard()
          },

          onCopyClipBoard: function() {
            let copyText = this.copyWithTag ? document.querySelector('#copy-text-tag') : document.querySelector('#copy-text')
            copyText.setAttribute('type', 'text')
            copyText.select()

            try {
              let successful = document.execCommand('copy')
              let msg = successful ? '성공적으로 복사되었습니다.' : '복사되지 않았습니다.'
              msg += this.copyWithTag ? ' (HTML 태그)' : ' (텍스트)'
              alert(msg)
            } catch (e) {
              alert(e.message)
            }

            copyText.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()
          },

          getRegexByType: function() {
            switch (this.textOptionModel) {
              case 'all':
                return /(?:\r\n|\r|\n)/g
              case 'kor':
                return /[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F\n]/gmi
              case 'eng':
                return /[^a-zA-Z]/g
              case 'sym':
                return /[^\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\n]/gi
              case 'num':
                return /[^0-9\n]/gmi
            }
          }
      },

      activated() {
        this.onClearText()
      },

      computed: {
        getTextLength: function () {
          return type => {
            let regex = ''
            const text = this.getRawData.replace(/(?:\r\n|\r|\n)/gi, '')
            switch (type) {
              case 'total':
                regex = /^\s/gmi
                break
              case 'kor':
                regex = /[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/gmi
                break
              case 'eng':
                regex = /[^a-zA-Z]/g
                break
              case 'num':
                regex = /[^0-9]/gmi
                break
              case 'sym':
                regex = /[^\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gmi
                break
            }
            return text.replace(regex, '').length
          }
        },

        htmlTextToNormal: function() {
          let result = this.getTextResult
          result = result.replace(/<br>/gmi, "\n")
          result = result.replace(/[<p\/>]/gmi, "")
          return result
        },

        getRawData: {
          get: function() {
            const data = this.$store.getters.GET_EXTRACT_TEXT_DATA
            return data !== null ? data['texts'] : ''
          },

          set: function(value) {
            value = ''
          }
        },

        getTextResult: {
          get: function () {
            return this.getRawData.replace(/(?:\r\n|\r|\n)/g, '<br>')
          },

          set: function(value) {
            value = ''
          }
        },

        getFilteredResult: {
          get: function() {
            return this.getRawData.replace(this.getRegexByType(), ' ')
          },

          set: function(value) {
            value = ''
          }
        }
      }
    }
</script>

<style scoped>
  .flex-center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .quill-editor {
    height: 36.5rem;
  }
</style>
