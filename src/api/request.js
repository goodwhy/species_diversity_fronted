import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const myAxios = axios.create({
    baseURL: 'http://localhost:8000/api/',
    timeout: 10000,
    withCredentials: true,
})
// 添加请求拦截器
myAxios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        if (token) {
            config.headers.Authorization = `Token ${token}`; // 将token添加到请求头中
        }


        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    },
)

// 添加响应拦截器
myAxios.interceptors.request.use(
    function (res) {
        return res
    },
    function (error) {
        if (response.data.status == 401) {
            const router = useRouter()
            router.push('/login')
            return res
        }
        ElMessage.error('登录过期，请重新登录')
        const userStore = useUserStore()
        userStore.deleteToken()
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error)
    },
)
export default myAxios
