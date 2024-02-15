<template>
    <div class="login">
        <Card class="center">
            <h1>Login</h1>
            <Input v-model="account" size="large" placeholder="請輸入帳號"  />
            <Input v-model="au4a83" size="large" placeholder="請輸入密碼"  />
            <Button @click="login">登入</Button>
            <p>帳號：charmy111@gmail.com</p>
            <p>密碼：charmy111</p>
            <Button @click="lineLoginEvent">Line Login</Button>

        </Card>
        <Button @click="register">前往註冊</Button>
    </div>
</template>

<script>
import { mapActions } from 'pinia'
import userStore from '@/stores/user'

import MainHeader from '@/components/MainHeader.vue'
import MainAside from '@/components/MainAside.vue'
import { RouterView } from 'vue-router'

// import apiInstance from '@/plugins/auth'

// 引入axios模組
import axios from 'axios'
// 引入qs模組
import qs from 'qs'

export default {
  components: {
    MainHeader,
    MainAside,
    RouterView
  },
  data(){
    return {
        // account: 'charmy101@gmail.com',
        // au4a83: 'charmy101'
        account: 'mor_2314',
        au4a83: '83r5^_',
        line_channel_id: '2003380973',    // Line Channel ID
        line_channel_secret: 'c7dc7f634acff46b6593888b59191504',// Line Channel Secret
        line_redirect_uri: 'http://localhost:5173/login',  // Line developer Callback URL
    }
  },
  async mounted(){
        // 使用 window.location.search 和 urlParams 獲取當前網頁 URL 中的查詢參數
        const queryString = window.location.search;

        if(queryString){
            const urlParams = new URLSearchParams(queryString);
            // 使用 get 方法從 urlParams 實例中獲取名為 code 的參數的值。(授權碼，通常由用戶在身份驗證流程中獲得)
            // 如果查詢字串中存在名為 code 的參數，code 變數將被賦值為該參數的值；否則，code 變數將為 null。
            const code = urlParams.get('code');
            await this.lineLoginRedirect(code)
        }else{
            // 判斷有沒有登入過，如果沒有token等同於沒有登入
            const user = this.checkLogin()
            console.log(user);
            if(user){
                //有登入資訊轉到首頁
                this.$router.push('/')
            }
        }
  },
  methods:{
    ...mapActions(userStore, ['updateToken', 'updateName', 'checkLogin', 'updateUserData']),

    // login(){
    //     const bodyFormData = new FormData();
    //     bodyFormData.append('mem_account', this.account);
    //     bodyFormData.append('mem_psw', this.au4a83);

    //     // 請記得將php埋入跨域
    //     apiInstance({
    //         method: 'post',
    //         url: '/getConfirmMember.php',
    //         headers: { "Content-Type": "multipart/form-data" },
    //         data: bodyFormData
    //     }).then(res=>{
    //         // console.log(res);
    //         if(res && res.data){
    //             if(res.data.code == 1){
    //                 this.updateToken(res.data.session_id)
    //                 this.updateUserData(res.data.memInfo)
    //                 this.$router.push('/')

    //             }else{
    //                 alert('註冊失敗')
    //             }
    //         }
    //     }).catch(error=>{
    //         console.log(error);
    //     })
    // },
    login(){
        // 目前PHP程式被玩壞無法使用
        axios({
            method: 'post',
            url: 'https://fakestoreapi.com/auth/login',
            data: {
                username: this.account,
                password: this.au4a83
            }
        }).then(res=>{
            if(res && res.data){
                this.updateToken(res.data.token)
                // 沒有API先使用寫死資料
                this.updateUserData({
                    mem_name: 'ingird',
                    mem_validation: 1,
                    mem_state: 1
                })
                this.$router.push('/')
            }
        }).catch(error=>{
            console.log(error);
        })
    },
    register(){
        this.$router.push({ 
            name: 'register'
        }) 
    },
    lineLoginEvent(){
        // 根據指定的 client_id、redirect_uri、scope 等參數組合出一個 LINE 登入的連結
        const link = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${this.line_channel_id}&redirect_uri=${this.line_redirect_uri}&state=login&scope=openid%20profile`;
        // 將頁面重新導向到該連結
        window.location.href = link;

    },
    async lineLoginRedirect(code){
        try {
            /*
                使用 Axios 發送 HTTP POST 請求到指定的 URL
                並指定 'Content-Type': 'application/x-www-form-urlencoded' 標頭以指示伺服器使用 URL 編碼形式解析參數
                grant_type：指定授權類型為 "authorization_code"
                code：授權碼，這個值是從 code 變數中取得的
                redirect_url：指定用戶授權完成後的重定向 URL
                client_id：用於識別應用程式的客戶端 ID
                client_secret：應用程式的客戶端密鑰
                這些參數使用 qs.stringify 函式轉換為 URL 編碼的形式，以符合 "application/x-www-form-urlencoded" 的請求格式
                Content-Type': 'application/x-www-form-urlencoded'：指定請求的內容類型為 URL 編碼形式
            */
            const tokenResponse = await axios.post('https://api.line.me/oauth2/v2.1/token', qs.stringify({
                grant_type: 'authorization_code',
                code: code,
                // yourURI 請設置為實際Line developer 設定的重新導向網址
                redirect_uri: this.line_redirect_uri,
                client_id: this.line_channel_id,
                client_secret: this.line_channel_secret
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            /*
                從 tokenResponse 的回應資料中取得 access_token 和 id_token。
                這些欄位是從 LINE 登入 API 取得的授權資訊。
                access_token 是用來作為驗證的令牌
                id_token 是使用者的身份令牌。
            */
            const accessToken = tokenResponse.data.access_token;
            const idToken = tokenResponse.data.id_token;

            /*
                使用 Axios 發送 HTTP POST 到 https://api.line.me/oauth2/v2.1/verify，驗證 id_token 以獲取包含使用者資訊的回應
                id_token：用於識別使用者的身份令牌
                client_id：用於識別應用程式的客戶端 ID
                使用 qs.stringify 函式轉換為 URL 編碼的形式，以符合 "application/x-www-form-urlencoded" 的請求格式
                Content-Type': 'application/x-www-form-urlencoded'：指定請求的內容類型為 URL 編碼形式。
                'Authorization': 'Bearer ' + accessToken：使用存取令牌進行身份驗證，將存取令牌放在 'Bearer ' 字符串之後。
            */
            const userInfoResponse = await axios.post('https://api.line.me/oauth2/v2.1/verify', qs.stringify({
                id_token: idToken,
                client_id: this.line_channel_id
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer ' + accessToken
                }
            });

            /*
                根據需求，可以在登入後的處理中進行相應的操作，例如驗證用戶資訊、儲存登入狀態等。
            */
           console.log(userInfoResponse.data);
            const lineUserId = userInfoResponse.data.sub;
            const lineNickname = userInfoResponse.data.name;
            const lineUSerImgURL = userInfoResponse.data.picture;
            const lineAccountTypeID = 1;

            // 可以在這邊寫回資料庫
            // const response = await axios.post(`${API_URL}lineLogin.php`, {
            //     userId: lineUserId,
            //     nickname: lineNickname,
            //     accountTypeID: lineAccountTypeID
            // });
            this.updateToken(lineUserId)

            // 沒有API先使用寫死資料
            this.updateUserData({
                mem_name: lineNickname,
                mem_validation: 1,
                mem_state: 1
            })
            this.$router.push('/')
        } catch (error) {
            console.error(error);
        }
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
}
</style>