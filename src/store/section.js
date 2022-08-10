import axios from "axios"

const state={
    Sections:{}
}

const getters={
    sections:state=>state.Sections
}

const actions={
    async getSections({commit}){
        await axios.get('/sections').then((res)=>{
            commit('SET_SECTIONS',res.data)
        })
    },

    async addSection({dispatch},data){
       return await axios.post('/sections',data).then(()=>{
            dispatch('getSections')
        })
    },
    async updateSection({dispatch},data){
        return axios.put(`/sections/${data.id}`,data).then(()=>{
            dispatch('getSections')
        })
    },
    async deleteSection({dispatch},id){
        return await axios.delete(`/sections/${id}`).then(()=>{
            dispatch('getSections')
        })
    }
}

const mutations={
    SET_SECTIONS(state,data){
        state.Sections=data
    }
}

export default {
    state,getters,actions,mutations,namespaced:true
}