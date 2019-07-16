<template>
  <v-card flat color="transparent" :hover="activate" width="200" :ripple="activate" @click="onClickCard">
    <v-card-text>
      <div class="text-xs-center">
        <v-btn icon :hover="false" :disabled="!activate">
          <v-icon large color="cyan">{{ icon }}</v-icon>
        </v-btn>
        <p class="title font-weight-light">{{ name }}</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
	import {SET_CURRENT_FEATURE} from "../../../store/mutation_types";

  export default {
		name: "CardButton",
    props: ['name', 'icon', 'active', 'variable'],
    data: () => ({
      selectedIndex: []
    }),

    methods: {
		  onClickCard: function () {
		    if (this.activate) {
		      this.$store.commit(SET_CURRENT_FEATURE, { payload: this.variableToKeep() })
        }
      },

      variableToKeep: function () {
		    switch (this.variable) {
          case 'text':
            return "TextFeature"
          case 'name':
            return "FilenameFeature"
          case 'image':
            return "ImageFeature"
          case 'table':
            return "TableFeature"
          case 'attach':
            return "FileAttachFeature"
        }
      }
    },

    computed: {
      activate: function() {
		    const selected_files_index = this.$store.getters.GET_SELECTED_FILES.length
		    switch (this.variable) {
          case 'text':
          case 'table':
          case 'image':
            return selected_files_index === 1
          case 'name':
          case 'attach':
            return selected_files_index > 1
          default:
            return false
        }
      }
    }
  }
</script>

<style scoped>

</style>
