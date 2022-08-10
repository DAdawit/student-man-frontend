<template>
    <div>
        <admin-ddashboard v-if="user.role === 'admin'"></admin-ddashboard>
        <teacher-dashboard v-if="user.role === 'user'"></teacher-dashboard>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import adminDdashboard from '@/components/admin/adminDdashboard.vue'
import teacherDashboard from '@/components/teacher/teacherDashboard.vue'
export default {
    name:'users-dashboare',
    components:{
adminDdashboard,
teacherDashboard
    },

    computed:{
        ...mapGetters({
            auth: 'auth/token',
            user: 'auth/user'
        })
    }
}
</script>