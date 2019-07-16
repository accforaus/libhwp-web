<template>
    <v-container grid-list-xs pa-0>
      <v-layout column>
        <v-flex align-self-center>
          <v-fade-transition>
            <v-img v-show="getCurrentFeature['en'] === ''" width="500" src="static/logo/logo.png"></v-img>
          </v-fade-transition>
        </v-flex>
        <v-flex>
          <v-fade-transition>
            <div class="text-xs-center" v-show="getCurrentFeature['en'] === ''">
              <div class="display-3 font-weight-light text-xs-center">HWP(5.0) Format Library</div>
              <p class="headline cyan--text font-weight-light">"본 라이브러리는 한글과 컴퓨터의 HWP 문서 파일 (.hwp) 공개 문서를 참고하여 개발하였습니다."</p>
            </div>
          </v-fade-transition>
          <div class="text-xs-center py-5" v-if="getCurrentFeature['en'] !== ''">
            <div class="display-3 cyan--text">
              {{ getCurrentFeature['kr'] }}
            </div>
            <div class="headline grey--text">
              {{ getCurrentFeature['sub'] }}
            </div>
          </div>
        </v-flex>
        <v-flex pt-4 v-if="getCurrentFeature['en'] === ''">
          <v-layout row align-space-around wrap justify-center>
            <v-flex xs4 v-for="platform in platforms" :key="platform.type">
              <platform-card
                :src="platform.src"
                :type="platform.type"
                :title="platform.title" :content="platform.content"></platform-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 v-if="getCurrentFeature['en'] === ''">
          <file-control-panel></file-control-panel>
        </v-flex>
        <v-flex xs12 py-3 v-if="getCurrentFeature['en'] === ''">
          <file-table></file-table>
        </v-flex>
        <v-flex pb-3>
          <v-slide-y-transition>
            <file-info v-show="getSelectedFile.length > 0"></file-info>
          </v-slide-y-transition>
        </v-flex>
        <v-flex>
          <keep-alive>
            <component v-bind:is="getCurrentFeature['en']"></component>
          </keep-alive>
        </v-flex>
        <v-flex class="pt-5">
          <v-divider></v-divider>
        </v-flex>
        <v-flex>
          <v-card flat class="py-2">
            <v-layout row align-baseline>
              <v-flex xs1>
              </v-flex>
              <v-flex xs1>
                <v-card flat class="px-2">
                  <v-spacer></v-spacer>
                  <v-img contain src="/static/logo/logo.png"></v-img>
                </v-card>
              </v-flex>
              <v-flex xs4>
                <v-card-text>
                  <blockquote class="blockquote font-weight-light">
                    HWP(5.0) Format Library는 개발하면서 접하는 한글 문서(HWP)를 처리하기 위한 엔진으로
                    다양한 개발환경 (웹, 데스크탑 어플리케이션, 모바일 어플리케이션, 사물 인터넷)에서 사용가능한 엔진입니다.
                    최근의 개발 추세인 크로스 플렛폼 지향적이며, 본 프로그램/웹페이지는 라이브러리를 사용할 수 있는 환경을
                    보여주는 예시 이며 이 외에도 여러 개발 환경에서 사용할 수 있습니다.
                  </blockquote>
                </v-card-text>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs1 class="mr-5">

              </v-flex>
              <v-flex xs5>
                <v-card-text>
                  <div class="d-inline" v-for="button in buttons" :key="button.name">
                    <v-btn flat>
                      <v-icon left>{{ button.icon }}</v-icon>
                      {{ button.name }}
                    </v-btn>
                    <p v-if="button.name !== 'twitter'" class="d-inline">/</p>
                  </div>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-divider></v-divider>
      </v-layout>
    </v-container>
</template>

<script>
    import FileCard from "./unit/FileCard";
    import FileControlPanel from "./unit/FileControlPanel";
    import FileAttachFeature from "./features/FileAttachFeature";
    import FilenameFeature from "./features/FilenameFeature";
    import ImageFeature from "./features/ImageFeature";
    import TableFeature from "./features/TableFeature";
    import TextFeature from "./features/TextFeature";
    import FileTable from "./unit/FileTable";
    import {SET_CURRENT_FEATURE} from "../../store/mutation_types";
    import FileInfo from "./unit/FileInfo";
    import FeatureCard from "./unit/FeatureCard";
    import PlatformCard from "./unit/PlatformCard";


    export default {
        name: "Body",
      components: {
        PlatformCard,
        FeatureCard,
        FileInfo,
        FileTable,
        TextFeature,
        TableFeature, ImageFeature, FilenameFeature, FileAttachFeature, FileControlPanel, FileCard},
      data: () => ({
        selectFile: '선택된 파일',
        featureComponent: '',
        hideFileTable: true,
        platforms: [
          {
            src: '/static/os/mobile2.jpg',
            type: 'Mobile',
            title: 'Build a HWP Library on IOS/Android',
            content: '모바일 운영체제 (IOS, Android)에서 개발 가능한 라이브러리 입니다.'
          },
          {
            src: '/static/os/desktop.png',
            type: 'Desktop',
            title: 'Develop on Any Operating System',
            content: '여러 운영체제 (MAC, Window, Linux, Embedded OS)에서 개발 가능한 라이브러리 입니다.'
          },
          {
            src: '/static/os/browser.jpg',
            type: 'Web',
            title: 'Build a HWP Library on Web',
            content: '다양한 웹 개발 환경 (Chrome, Safari, IE, Edge)에서 사용할 수 있습니다.'
          }
        ],
        buttons: [
          {icon: 'fab fa-github', name: 'github'},
          {icon: 'fab fa-google-plus-g', name: 'gmail'},
          {icon: 'fab fa-twitter', name: 'twitter'}
        ]
      }),
      created() {
        this.$EventBus.$on('onBodyClear', _ => {
          this.featureComponent = ''
          this.hideFileTable = true
        })
      },

      computed: {
          getCurrentFeature: function() {
            return this.$store.getters.GET_CURRENT_FEATURE
          },

          getSelectedFile: function() {
            return this.$store.getters.GET_SELECTED_FILES
          }
      },
    }
</script>

<style scoped>

</style>
