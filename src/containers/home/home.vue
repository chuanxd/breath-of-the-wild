<template>
  <div class="home-wrapper">
    <gmap/>
  </div>
</template>

<script>
import gmap from './gmap'

export default {
  name: 'home',

  components: {
    gmap
  }
}

</script>

<style lang="scss" scoped>
// .home-wrapper {
//   background: red;
// }
</style>
