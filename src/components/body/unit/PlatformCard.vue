<template>
    <v-card flat hover>
      <v-card flat>
        <v-img height="200" width="400" contain :src="src"></v-img>
        <v-card-text>
          <p class="text-xs-left subheading font-weight-light">{{ type }}</p>
          <p class="title font-weight-regular">{{ title }}</p>
          <p class="body-2 font-weight-regular">{{ content }}</p>
        </v-card-text>
      </v-card>
    </v-card>
</template>

<script>
    export default {
        name: "PlatformCard",
      props: ['src', 'type', 'title', 'content']
    }
</script>

<style scoped>

</style>
