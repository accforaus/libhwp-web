<template>
    <v-layout row justify-space-between py-4>
      <v-flex v-for="card in btnList" :key="card.name">
        <card-button :name="card.name" :variable="card.variable" :icon="card.icon" :active="active"/>
      </v-flex>
    </v-layout>
</template>

<script>
	import CardButton from "./CardButton";
  export default {
		name: "FileControlPanel",
    components: {CardButton},
    props: ['active'],
    data: () => ({
      btnList: [
        {
          name: '텍스트 추출',
          icon: 'fa fa-paragraph',
          variable: 'text'
        },
        {
          name: '테이블 추출',
          icon: 'fa fa-table',
          variable: 'table'
        },
        {
          name: '파일 이름 처리',
          icon: 'fa fa-sort-numeric-up',
          variable: 'name'
        },
        {
          name: '파일 이어 붙히기',
          icon: 'fa fa-copy',
          variable: 'attach'
        },
        {
          name: '그림 추출',
          icon: 'fa fa-file-image',
          variable: 'image'
        }
      ]
    }),
	}
</script>

<style scoped>

</style>
