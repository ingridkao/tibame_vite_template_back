<template>
    <header class="menu">
        <div class="menu_desktop">
            <RouterLink class="logo" to="/"></RouterLink>
            <div class="menu_desktop_wrapper">
                <Menu mode="horizontal" :active-name="menuTarget">
                    <MenuItem name="1">
                        <RouterLink to="/">Dashboard</RouterLink>
                    </MenuItem>
                    <MenuItem name="2">
                        <RouterLink to="/locomotive">Locomotive</RouterLink>
                    </MenuItem>
                    <MenuItem name="3">
                        <RouterLink to="/products">商品管理</RouterLink>
                    </MenuItem>  
                    <MenuItem name="4">
                        <RouterLink to="/user">會員管理</RouterLink>
                    </MenuItem>  
                    <MenuItem name="5">
                        <Button v-if="token" @click="logout">登出</Button>
                        <RouterLink v-else to="/login">login</RouterLink>
                    </MenuItem>
                </Menu>
            </div>
            <Button class="menu_mobile_btn" @click="drawerOpen = true" type="primary">Open</Button>
        </div>

        <div class="menu_mobile_wrapper">
            <Drawer :closable="false" v-model="drawerOpen">
                <Button @click="drawerOpen = false" type="primary">Close</Button>
                <Menu mode="vertical" :active-name="menuTarget">
                    <MenuItem name="1">
                        <RouterLink to="/">Dashboard</RouterLink>
                    </MenuItem>
                    <MenuItem name="2">
                        <RouterLink to="/locomotive">Locomotive</RouterLink>
                    </MenuItem>
                    <MenuItem name="3">
                        <RouterLink to="/products">商品管理</RouterLink>
                    </MenuItem>  
                    <MenuItem name="4">
                        <RouterLink to="/user">會員管理</RouterLink>
                    </MenuItem> 
                    <MenuItem name="5">
                        <Button v-if="token" @click="logout">登出</Button>
                        <RouterLink v-else to="/login">login</RouterLink>
                    </MenuItem>
                </Menu>
            </Drawer>
        </div>
    </header>
</template>

<script>
import { Menu, MenuItem, Submenu} from 'view-ui-plus'

import { RouterLink } from 'vue-router'
import { mapState, mapActions } from 'pinia'
import userStore from '@/stores/user'
export default {
    components: {
        RouterLink,
        Menu,
        MenuItem,
        Submenu
    },
    data(){
        return {
            menuTarget: 0,
            drawerOpen: false
        }
    },
    created(){
        // 判斷有沒有登入過
        const isLogin = this.checkLogin()
        if(isLogin){
            this.checkUserData()
        }
    },
    computed: {
        //使用 mapState 輔助函數將/src/stores/user裡的state/data 映射在這裡
        // !!!要寫在computed
        ...mapState(userStore, ['token', 'userData'])
    },
    methods:{
        //使用 mapActions 輔助函數將/src/stores/user裡的actions/methods 映射在這裡
        ...mapActions(userStore, ['checkUserData', 'checkLogin', 'updateToken']),
        logout(){
            // 調用pinia的updateToken
            this.updateToken('')
            // 轉到首頁
            this.$router.push('/')
        }
    }
};
</script>

<style lang="scss">
.ivu-menu-light{
    background-color: transparent;
}
.ivu-menu-horizontal.ivu-menu-light:after{
    background: transparent;
}
.menu{
    position: fixed;
    width: 100%;
    z-index: 1000;
    &_desktop{
        height: 4rem;
        padding: 0 1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        &_wrapper{
            display: block;
            @media screen and (max-width: 768px) {
                display: none;
            }
        }
    }
    &_mobile{
        &_btn{
            display: none;
            @media screen and (max-width: 768px) {
                display: block;
            }
        }
    }
}

.header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    padding: 0 1rem;
    .logo {
        height: 3rem;
        display: block;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
</style>