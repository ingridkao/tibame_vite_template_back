// https://pinia.vuejs.org/core-concepts/state.html
import { defineStore } from 'pinia'

export default defineStore('userStore', {
    // 對應 data
    state: () => ({
        token: '',   // 後端僅返回token(通行證/令牌)
        userData: {} // 可以在login API中返回user資訊
    }),

    // 對應 computed (物件形式)
    getters: {
    },

    // 對應 methods (物件形式)
    actions: {
        updateToken (payload) {
            if(payload){
              this.token = payload
              localStorage.setItem('userToken', payload)
            }else{
              this.token = ''
              localStorage.removeItem('userToken')
            }
        },
        updateUserData(val) {
            this.userData = val
        },
        checkLogin(){
            const storageToken = localStorage.getItem('userToken')
            if(this.token){
                return this.token
            }else if(storageToken){
                this.token = storageToken
                return storageToken
            }else{
                return ''
            }
        },
    }
})