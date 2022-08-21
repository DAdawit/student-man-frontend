import axios from "axios"

const state={
TeacherStudents:{}
}
const getters={
    teacherStudents:state=>state.TeacherStudents
}

const actions={
    async getMyStudents({commit},id){
        await axios.get(`/teacherStudents/${id}`).then((res)=>{
            commit('SET_TEACHER_STUDENTS',res.data)
        })
    }

}

const mutations={
    SET_TEACHER_STUDENTS(state,data){
        state.TeacherStudents=data
    }
}


export default {
    state,getters,actions,mutations,namespaced:true
}