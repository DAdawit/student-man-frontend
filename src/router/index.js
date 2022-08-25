import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import dashboard from '../views/dashboard.vue'
import appUser from '../views/UserManage.vue'
// import manage from '../views/manageAccounts.vue'
import userDetail from '../components/admin/userDetail.vue'
import users from '../components/admin/UsersManage.vue'
import course from '../views/courseView.vue'
import manageStudent from '../views/manageStudent.vue'
import manageSection from '../views/sectionView.vue'
import addStudent from '../components/Student/addStudent.vue'
import updateStudent from '../components/Student/updateStudent.vue'
import myStudents from '../components/teacher/myStudents.vue'
import profile from '../components/profile/userProfile.vue'

Vue.use(VueRouter)

const routes = [{

    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/app',
    name: 'app',
    component: appUser,
    beforeEnter: (to, from, next) => {
      let user = localStorage.getItem("token");
      if (user !== null) {
        next();
      } else {
        next("/");
      }
    },
    children: [{
        path: 'dashboard',
        name: 'dashboard',
        component: dashboard,
      },
      {
        path: 'users',
        name: 'users',
        component: users,
      },
      {
        path: 'addStudent',
        name: 'addStudent',
        component: addStudent,
      },
      {
        path: 'manageStudent',
        name: 'manageStudent',
        component: manageStudent,
      },{
        path: 'myStudents',
        name: 'myStudents',
        component: myStudents,
      },
      {
        path: 'manageSection',
        name: 'manageSection',
        component: manageSection,
      },
      {
        path: ':id/user',
        name: 'userDetail',
        component: userDetail
      },
      {
        path: ':id/updateStudent',
        name: 'updateStudent',
        component: updateStudent
      },
      {
        path: 'course',
        name: 'course',
        component: course
      },
       {
        path: 'profile',
        name: 'profile',
        component: profile
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router