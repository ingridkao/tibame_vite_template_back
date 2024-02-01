<template>
    <div class="box">
        <div class="register">
            <h1>Register</h1>
            <Input v-model="name" size="large" placeholder="姓名" />
            <Input v-model="email" size="large" placeholder="信箱" />
            <Input v-model="au4a83" size="large" placeholder="密碼(至少8個字)" />
            <Input v-model="au4a83again" size="large" placeholder="再次輸入密碼" />
            <Button @click="register">確認註冊</Button>
        </div>
        <Button @click="login">登入</Button>
    </div>
</template>

<script>
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
    register(){
        if(this.au4a83 !== this.au4a83again){
            alert('請確認密碼')

        }else if(this.au4a83.length < 8 && this.au4a83.length < 8){
            alert('密碼至少8個字')

        }else{
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
.box{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.register{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 2px solid #ddd;
    margin: 1rem;
    padding: 1rem;
    h1{
        margin-bottom: 1rem;
    }
    .ivu-input-wrapper{
        width: 20rem;
        margin: 0 auto 1rem auto;
    }
}
</style>