import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const Token = ref('')
    const getToken = (newToken) => {
        Token.value = newToken
    }
    const deleteToken = () => {
        Token.value = ''
        localStorage.removeItem('token')
    }
    return {
        Token,
        getToken,
        deleteToken,
    }
}, {
    persist: true
})
