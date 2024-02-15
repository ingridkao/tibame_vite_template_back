<template>
  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router'
export default {
    components: {
        RouterView
    }
}
</script>

<style lang="scss">
.ivu-card{
  &.center{
    text-align: center;
  }
  h1{
    margin-bottom: 1rem;
  }
}
.ivu-input{
  width: 20rem;
  margin: 1rem auto;
}
.ivu-btn{
  margin: 1rem auto;
}
</style>
