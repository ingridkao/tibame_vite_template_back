<template>
    <header class="header">
        <RouterLink to="/" class="logo">
            <img alt="Vue logo" src="@/assets/logo.svg" width="125" height="125" />
        </RouterLink>
        <div>
            <span v-if="this.userData">{{ this.userData.name }}</span>
            <Button v-if="token" @click="logout">登出</Button>
            <RouterLink v-else to="/login">login</RouterLink>
        </div>
    </header>
</template>

<script>
import { RouterLink } from 'vue-router'
import { mapState, mapActions } from 'pinia'
import userStore from '@/stores/user'
export default {
    components: {
        RouterLink
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