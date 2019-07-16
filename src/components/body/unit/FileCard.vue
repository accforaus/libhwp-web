<template>
  <v-card-text class="brown white--text pb-5">
    <v-layout column justify-center>
      <v-flex>
        <span class="body-1 font-weight-bold pr-0">root</span>
        <div id="pointer" class="d-inline-flex font-weight-bold">#</div>
        <span class="body-1 font-weight-bold yellow--text pl-2 ml-1">stat</span>
        <span class="body-1 font-italic">{{ file['name'] }}</span>
      </v-flex>
      <v-flex v-for="info in infoTexts" :key="info.type">
        <v-layout row justify-center>
          <v-flex xs4 class="text-xs-left font-weight-bold">
            <span>[</span> {{ info.type }} <span>]</span>
          </v-flex>
          <v-flex xs7 class="text-xs-left font-weight-bold">
            <span>=  </span>{{ info.value }}
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card-text>
</template>

<script>
	export default {
		name: "FileCard",
    props: ['file'],
    data: () => ({
      infoTexts: [
        {type: 'PERMISSION', value: '-rw-rw-rw-'},
        {type: 'FILE NAME', value: 'Some-file.hwp'},
        {type: 'FILE TYPE', value: '한글과 컴퓨터'},
        {type: 'FILE SIZE', value: '0bytes'},
        {type: 'FILE VERSION', value: '2.0.3.3'},
        {type: 'PARAGRAPH', value: '2443'},
        {type: 'TABLE, IMAGE, TEXT BOX', value: '300'},
      ]
    }),

    created() {
      this.infoTexts = []
      this.infoTexts.push({type: 'PERMISSION', value: '-rw-rw-rw-'})
      this.infoTexts.push({type: 'FILE NAME', value: this.file['name']})
      this.infoTexts.push({type: 'FILE TYPE', value: '한컴오피스 한글 문서'})
      this.infoTexts.push({type: 'FILE SIZE', value: this.file['size']})
      this.infoTexts.push({type: 'FILE VERSION', value: this.file['version']})
      this.infoTexts.push({type: 'PARAGRAPH', value: this.file['paragraph']})
      this.infoTexts.push({type: 'TABLE, IMAGE, TEXT BOX', value: this.file['control']})
    }
  }
</script>

<style scoped>
  #pointer {
    width: 30px;
    height: 16px;
    position: relative;
    background: red;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 8px;
  }
  #pointer:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-left: 8px solid #795548;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }
  #pointer:before {
    content: '';
    position: absolute;
    right: -8px;
    bottom: 0;
    width: 0;
    height: 0;
    border-left: 8px solid red;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }
  .center-text {
    align-items: center;
    justify-content: center;
  }
</style>
