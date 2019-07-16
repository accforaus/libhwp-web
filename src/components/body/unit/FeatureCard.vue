<template>
    <v-card class="elevation-4" color="cyan" dark>
      <v-layout row fill-height justify-center align-center>
        <v-flex>
          <v-layout column align-center>
            <v-flex>
              <p class="display-3 font-weight-light">테이블 추출</p>
            </v-flex>
            <v-flex>
              <p class="headline font-weight-light">"선택된 한글 문서 안에서 테이블의 텍스트를 추출합니다."</p>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
</template>

<script>
    export default {
        name: "FeatureCard",
      data: () => ({
        src: '../../../../static/images/table.jpg'
      })
    }
</script>

<style scoped>

</style>
