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
    }
}
export const actios={
    login({commit},data){
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
        }).then(res=>{
            commit('setUserInfo',res.data)
            Promise.resolve()
        })

    }
}