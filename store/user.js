export const state=()=>({
    userInfo:{
        token:'',
        user:{
        }
    }
})
export const mutations={
    //保存用户信息到state
    setUserInfo(state,data){
        state.userInfo=data
        localStorage.setItem("userInfo",JSON.stringify(data))
    },
    clearUSerInfo(state){
        localStorage.removeItem('userInfo')
        state.userInfo={}
    }
}
export const actions={
    login({commit},data){
     return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
        }).then(res=>{
            console.log(res)
            this.$router.push('/')
            commit('setUserInfo',res.data)
            Promise.resolve()
        })

    }
}