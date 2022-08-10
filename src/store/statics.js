import axios from "axios";

const state ={
NumUsers:null,
NumStudents:null,
NumCourses:null
}

const getters={
    numUsers:state => state.NumUsers,
    numStudents:state =>state.NumStudents,
    numCourses:state => state.NumCourses
}

const actions={
    async getNumberOfUsers({commit}){
        await axios.get('/numberOfUser').then((res)=>{
            commit('SET_NUM_USERS',res.data)
        })
    },  
      async getNumberOfStudents({commit}){
        await axios.get('/numberOfStudents').then((res)=>{
            commit('SET_NUM_STUDENTS',res.data)
        })
    },
        async getNumberOfCourses({commit}){
        await axios.get('/numberOfCourse').then((res)=>{
            commit('SET_NUM_COURSES',res.data)
        })
    }


}

const mutations={
    SET_NUM_USERS(state,data){
        state.NumUsers=data
    },
    SET_NUM_STUDENTS(state,data){
        state.NumStudents=data
    },
    SET_NUM_COURSES(state,data){
        state.NumCourses=data
    }

}


export default {
    state,getters,actions,mutations,namespaced:true
}