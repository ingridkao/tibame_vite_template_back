<template>
  <Menu :active-name="menuTarget" :width="'200px'">
    <MenuItem name="1">
      <Icon type="md-document" />
      <RouterLink to="/">儀表板</RouterLink>
    </MenuItem>
    <MenuItem name="2">
      <Icon type="md-document" />
      <RouterLink to="/products">商品管理</RouterLink>
    </MenuItem>  
    <MenuItem name="3">
      <Icon type="md-document" />
      <RouterLink to="/user">會員管理</RouterLink>
    </MenuItem>  
  </Menu>
</template>

<script>
import { RouterLink } from 'vue-router'
import { Menu, MenuItem, Submenu} from 'view-ui-plus'

export default {
  components: {
      RouterLink,
      Menu,
      MenuItem,
      Submenu
  },
  data() {
      return {
          menuTarget: 0,
      }
  }
}
</script>

<style scoped>

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
