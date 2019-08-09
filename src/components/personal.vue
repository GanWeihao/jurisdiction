<template>
    <div id="personal" v-if="url==title">
        <el-image class="img" :src="'http://106.13.207.98:8080/jurisdiction/img/'+userMsg.userHeadimg"></el-image>
        <div class="mess1">
            <p class="name"><b>{{userMsg.userName}}</b></p>
        </div>
        <div class="mess1">
            <p class="user_role" v-for="role in roles"><b>{{role.rulesname}}</b></p>
        </div>
        <div class="mess1">
            <p class="phone"><b>{{userMsg.userTelphone}}</b></p>
        </div>
        <div class="mess1">
            <p class="email"><b>{{userMsg.userEmail}}</b></p>
        </div>
    </div>
</template>

<script>
    var url = "http://106.13.207.98:8080/jurisdiction"
    export default {
        name: "personal",
        data() {
            return {
                title:"/personal",
                userId: '',
                roles: '',
                userMsg: {},
            }
        },
        props: {
            url: String,
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.userId = this.$store.state.loginUserId;
                this.$axios.get(url + "/user/findById", {
                    params: {
                        userId: this.userId
                    }
                }).then(res => {
                    if (res.data.status == 200){
                        this.userMsg = res.data.data;
                    } else {
                        this.$message('查询个人信息失败');
                    }
                }).catch(res => {
                    this.$message('查询个人信息异常');
                })

                this.$axios.get(url + "/user/role", {
                    params: {
                        userId: this.userId
                    }
                }).then(res => {
                    if (res.data.status == 200) {
                        this.roles = res.data.data;
                    } else {
                        this.$message('查询角色失败');
                    }
                }).catch(res => {
                    this.$message('查询角色异常');
                })
            }
        }
    }
</script>

<style>
    #personal {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .img {
        margin-top: 80px;
        width: 250px;
        height: 250px;
        border-radius: 50%;
    }

    .mess1 {

        margin-top: 30px;
        display: flex;
        flex-direction: row
    }

    .name {
        font-size: 30px;
        color: rgba(61, 73, 93, 0.53);
    }

    .phone {
        font-size: 25px;
        color: blue;
    }

    .email {
        font-size: 25px;
        color: blue;
    }

    .user_role {
        font-size: 25px;
        margin: 15px;
        color: darkturquoise;
    }
</style>