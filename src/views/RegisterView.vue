<template>
    <div class="register">
        <Card class="center">
            <h1>Register</h1>
            <Input v-model="name" size="large" placeholder="姓名" />
            <Input v-model="email" size="large" placeholder="信箱" />
            <Input v-model="au4a83" size="large" placeholder="密碼(至少8個字)" />
            <Input v-model="au4a83again" size="large" placeholder="再次輸入密碼" />
            <Button @click="register">確認註冊</Button>
        </Card>
        <Button @click="login">前往登入</Button>
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
        name: '',
        email: '',
        au4a83: '',
        au4a83again: '',
    }
  },
  methods:{
    ...mapActions(userStore, ['updateToken', 'updateUserData']),

    register(){
        if(this.au4a83 !== this.au4a83again){
            alert('請確認密碼')

        }else if(this.au4a83.length < 8 && this.au4a83.length < 8){
            alert('密碼至少8個字')

        }else{
            //依照後端所需
            const bodyFormData = new FormData();
            bodyFormData.append('mem_account', this.name);
            bodyFormData.append('mem_psw', this.au4a83);
            // bodyFormData.append('mem_name', this.name);
            // bodyFormData.append('email', this.email);
            // bodyFormData.append('mem_pw', this.au4a83);
            // bodyFormData.append('address', 'address');
            // bodyFormData.append('mem_passport', 'mem_passport');
            // bodyFormData.append('mem_phone', 'mem_phone');

            apiInstance({
                method: 'post',
                url: '/getConfirmMember.php',
                headers: { "Content-Type": "multipart/form-data" },
                data: bodyFormData
            }).then(res=>{
                console.log(res);
                if(res && res.data && res.data.msg === '註冊成功'){
                    // 後端可以在註冊成功時一起把token和資料傳給前端
                    // this.updateToken(res.data.session_id)
                    // this.updateUserData(res.data.memInfo)
                    this.$router.push('/')
                }else{
                    alert('註冊失敗')
                }
            }).catch(error=>{
                console.log(error);
            })
        }
    },
    login(){
        this.$router.push({ 
            name: 'login'
        })
    }
  }
}
</script>

<style lang="scss">
.register{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>