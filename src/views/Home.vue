<template>
    <div id="home">
        <div id="login">
            <el-form class="login_form" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                <el-form-item label>
                    <p style="font-size: 20px;margin-bottom: 20px;">手机号/邮箱</p>
                    <el-input style="width: 300px;font-size: 14px;" v-model="formLabelAlign.userName"></el-input>
                </el-form-item>
                <el-form-item label>
                    <p style="font-size: 20px;margin-bottom: 20px;">密码</p>
                    <el-input style="width: 300px;font-size: 14px;" v-model="formLabelAlign.userPassword" show-password></el-input>
                </el-form-item>
            </el-form>
            <el-button class="login_btn" type="success" @click="submitForm()" round>登录</el-button>
        </div>
    </div>
</template>

<script>
    var url = "http://106.13.207.98:8080/jurisdiction";
    export default {
        name: 'Home',
        data() {
            return {
                labelPosition: 'top',
                formLabelAlign: {
                    userName: '',
                    userPassword: ''
                }
            };
        },
        methods: {
            submitForm() {
                if (this.formLabelAlign.username == '') {
                    this.$alert('手机号/邮箱不能空着哦！', '注意！', {
                        confirmButtonText: '确定',
                    });
                } else if (this.formLabelAlign.password == '') {
                    this.$alert('密码不能空着哦！', '注意！', {
                        confirmButtonText: '确定',
                    });
                } else {
                    let params = this.$qs.stringify({
                        userTelphone: this.formLabelAlign.userName,
                        userEmail: this.formLabelAlign.userName,
                        userPassword: this.formLabelAlign.userPassword
                    });
                    this.$axios
                        .post(url + "/user/login", params)
                        .then(res => {
                            //console.log(res)
                            let result = res.data;
                            if (result.status == 200) {
                                this.$store.dispatch("login", result.data.userId)
                                this.$router.push({
                                    name: 'index'
                                });
                            } else if(result.status==404){
                                this.$confirm('首次登录需要验证邮箱, 是否继续?', '首次登录', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    this.$prompt('请输入邮箱', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                                        inputErrorMessage: '邮箱格式不正确'
                                    }).then((value1) => {
                                        console.log(value1.value)
                                        this.$axios.get(url + "/user/logincode",{
                                            params:{
                                                userEmail: value1.value
                                            }
                                        }).then(res=>{
                                            if(res.data.status==200){
                                                this.$message({
                                                    type: 'success',
                                                    message: '验证码已发送至邮箱：' + value1.value
                                                });
                                                this.$prompt('请输入验证码（如果未收到，请查看垃圾邮箱）', '提示', {
                                                    confirmButtonText: '确定',
                                                    cancelButtonText: '取消',
                                                }).then((value3) => {
                                                    if(value3.value == res.data.data){
                                                        this.$store.dispatch("login", result.data.userId)
                                                        this.$router.push({
                                                            name: 'index'
                                                        });
                                                        this.$axios.get(url + "/user/firstlogin",{
                                                            params:{
                                                                userId: result.data.userId,
                                                                userEmail:value1.value
                                                            }
                                                        })
                                                        this.$message({
                                                            type: 'success',
                                                            message: '登陆成功'
                                                        });
                                                    }else{
                                                        this.$message({
                                                            type: 'error',
                                                            message: '验证码错误'
                                                        });
                                                    }
                                                }).catch(() => {
                                                    this.$message({
                                                        type: 'info',
                                                        message: '取消输入'
                                                    });
                                                });
                                            }else{
                                                this.$message({
                                                    type: 'info',
                                                    message: '发送失败'
                                                });
                                            }
                                        })
                                    }).catch(() => {
                                        this.$message({
                                            type: 'info',
                                            message: '取消登录'
                                        });
                                    });
                                }).catch(() => {
                                    this.$message({
                                        type: 'info',
                                        message: '取消登录'
                                    });
                                });
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: '手机号/邮箱或密码错误'
                                });
                            }
                        })
                        .catch(function (error) {
                            this.$message({
                                type: 'error',
                                message: '登录异常'
                            });
                        });
                }
            }
        }
    }
</script>

<style>
    #home {
        top: 0px;
        left: 0px;
        width: 1920px;
        height: 969px;
        background-image: url("https://desk-fd.zol-img.com.cn/t_s1920x1080c5/g2/M00/05/00/ChMlWl0_rymIfKpSABGAMt-GOeYAAMNiQHQOdIAEYBK594.jpg");
    }

    #login {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font: 20px/1.4 "Helvetica Neue", "HelveticaNeue", Helvetica, Arial, sans-serif;
        position: absolute;
        background: rgba(255, 255, 255, 0.75);
        border-radius: 6px;
        top: 65%;
        left: 50%;
        width: 350px;
        padding: 10px !important;
        margin: -350px 0px 0px -175px !important;
        background-position: center 48%;
    }

    .login_form {
        display: flex;
        flex-direction: column;
    }

    .login_btn {
        font-size: 14px;
        background-color: red;
        height: 40px;
        width: 250px;
        margin-top: 30px;
        border-radius: 30px;
    }
</style>