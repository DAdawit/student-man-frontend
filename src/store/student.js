import axios from "axios"

const state={
    Students:{}
}

const getters={
    students:state=>state.Students
}

const actions={
    async getStudents({commit}){
        await axios.get('/students').then((res)=>{
            commit('SET_STUDENTS',res.data)
        })
    }

}

const mutations={
    SET_STUDENTS(state,data){
        state.Students=data
    }
}

export default{
    state,getters,actions,mutations,namespaced:true
}