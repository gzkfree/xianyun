import {Message} from 'element-ui';
export default function ({$axios,redirect}){
    $axios.onError(err=>{
        const {statusCode,message}=err.response.data
        if(statusCode===400){
            Message.warning({message})
        }
        //未登录就跳转到登录页
        if(statusCode===401||statusCode===403){
            redirect('/user/login?return=/air/order')
        }
    })
}