<template>
    <div class="login">
        <h1>Login</h1>
        <Input v-model="account" size="large" placeholder="請輸入帳號"  />
        <Input v-model="au4a83" size="large" placeholder="請輸入密碼"  />
        <Button @click="login">登入</Button>
        <hr>
        <Button @click="register">註冊</Button>

        <p>帳號：charmy111@gmail.com</p>
        <p>密碼：charmy111</p>
    </div>
</template>

<script>
import { mapActions } from 'pinia'
import userStore from '@/stores/user'

import MainHeader from '@/components/MainHeader.vue'
import MainAside from '@/components/MainAside.vue'
import { RouterView } from 'vue-router'

import apiInstance from '@/plugins/auth'

export default {
  components: {
    MainHeader,
    MainAside,
    RouterView
  },
  data(){
    return {
        account: 'charmy101@gmail.com',
        au4a83: 'charmy101'
    }
  },
  created(){
    // 判斷有沒有登入過，如果沒有token等同於沒有登入
    const user = this.checkLogin()
    if(user){
      //有登入資訊轉到首頁
      this.$router.push('/')
    }
  },
  methods:{
    ...mapActions(userStore, ['updateToken', 'updateName', 'checkLogin', 'updateUserData']),

    login(){
        const bodyFormData = new FormData();
        bodyFormData.append('mem_account', this.account);
        bodyFormData.append('mem_psw', this.au4a83);

        // 請記得將php埋入跨域
        apiInstance({
            method: 'post',
            url: '/getConfirmMember.php',
            headers: { "Content-Type": "multipart/form-data" },
            data: bodyFormData
        }).then(res=>{
            // console.log(res);
            if(res && res.data){
                if(res.data.code == 1){
                    this.updateToken(res.data.session_id)
                    this.updateUserData(res.data.memInfo)
                    this.$router.push('/')

                }else{
                    alert('註冊失敗')
                }
            }
        }).catch(error=>{
            console.log(error);
        })
    },
    register(){
        this.$router.push({ 
            name: 'register'
        }) 
    }
  }
}
</script>

<style lang="scss">
.login{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    h1{
        margin-bottom: 1rem;
    }
    .ivu-input-wrapper{
        width: 20rem;
        margin: 0 auto 1rem auto;
    }
}
</style>