<template>
    <div id="update" v-if="url==title">
        <el-upload
                action
                multiple
                :limit="1"
                :show-file-list="false"
                :http-request="uploadHttp"
                accept="image/jpeg, image/gif, image/png"
        >
            <el-image class="up_img" :src="'http://106.13.207.98:8080/jurisdiction/img/'+userMsg.userHeadimg"></el-image>
        </el-upload>

        <el-form class="up_form" :label-position="labelPosition" label-width="80px" size="medium">
            <el-form-item class="item" label="姓名">
                <el-input class="input" v-model="userMsg.userName"></el-input>
            </el-form-item>
            <el-form-item class="item" label="手机号">
                <div class="up_p">
                    <div style="margin-right: 0;float: left">
                        <b>{{userMsg.userTelphone}}</b>
                    </div>
                    <div style="margin-right: 0;float: right">
                        <el-button type="text">修改手机</el-button>
                        <el-button type="text">解除绑定</el-button>
                    </div>
                </div>
            </el-form-item>
            <el-form-item class="item" label="邮箱地址">
                <div class="up_p">
                    <div style="margin-right: 0;float: left">
                        <b>{{userMsg.userEmail}}</b>
                    </div>

                    <div style="margin-right: 0;float: right">
                        <el-button type="text" @click="email_btn()">修改邮箱</el-button>
                        <el-button type="text" @click="delemail_btn()">解除绑定</el-button>
                    </div>
                </div>
            </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-edit" size="medium" @click="updatename()">保存</el-button>
    </div>
</template>

<script>
    var url = "http://106.13.207.98:8080/jurisdiction";
    export default {
        name: "update",
        data() {
            return {
                title:"/update",
                labelPosition: 'right',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                },
                userId: '',
                userMsg: {}
            };
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
                    if (res.data.status == 200) {
                        this.userMsg = res.data.data;
                    } else {
                        this.$message('查询个人信息失败');
                    }
                }).catch(res => {
                    this.$message('查询个人信息异常');
                })
            },

            email_btn() {
                if (this.userMsg.userEmail == "" || this.userMsg.userEmail == null) {
                    this.$prompt('请输入要绑定的邮箱', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                        inputErrorMessage: '邮箱格式不正确'
                    }).then((value2) => {
                        this.$axios.get(url + "/user/updateemail", {
                            params: {
                                userId: this.userId,
                                userEmail: value2.value
                            }
                        }).then(res2 => {
                            if (res2.data.status == 200) {
                                this.init();
                                this.$message({
                                    type: 'success',
                                    message: '修改成功'
                                });
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res2.data.message
                                });
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消修改'
                        });
                    });
                } else {
                    this.$confirm('需要验证邮箱, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$axios.get(url + "/user/logincode", {
                            params: {
                                userEmail: this.userMsg.userEmail
                            }
                        }).then(res => {
                            if (res.data.status == 200) {
                                this.$prompt('请输入验证码', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                }).then((value1) => {
                                    if (value1.value == res.data.data) {
                                        this.$prompt('请输入要绑定的邮箱', '提示', {
                                            confirmButtonText: '确定',
                                            cancelButtonText: '取消',
                                            inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                                            inputErrorMessage: '邮箱格式不正确'
                                        }).then((value2) => {
                                            this.$axios.get(url + "/user/updateemail", {
                                                params: {
                                                    userId: this.userId,
                                                    userEmail: value2.value
                                                }
                                            }).then(res2 => {
                                                if (res2.data.status == 200) {
                                                    this.$message({
                                                        type: 'success',
                                                        message: '修改成功'
                                                    });
                                                    this.init();
                                                } else {
                                                    this.$message({
                                                        type: 'error',
                                                        message: res2.data.message
                                                    });
                                                }
                                            })
                                        }).catch(() => {
                                            this.$message({
                                                type: 'info',
                                                message: '已取消修改'
                                            });
                                        });
                                    } else {
                                        this.$message({
                                            type: 'error',
                                            message: '验证码输入有误'
                                        });
                                    }
                                }).catch(() => {
                                    this.$message({
                                        type: 'info',
                                        message: '取消输入'
                                    });
                                });
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: '验证失败'
                                });
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消修改'
                        });
                    });
                }
            },

            delemail_btn(){
                this.$confirm('需要验证邮箱, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.get(url + "/user/logincode", {
                        params: {
                            userEmail: this.userMsg.userEmail
                        }
                    }).then(res => {
                        if (res.data.status == 200) {
                            this.$prompt('请输入验证码', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                            }).then((value1) => {
                                if (value1.value == res.data.data) {
                                    this.$axios.get(url + "/user/delemail",{
                                        params:{
                                            userId: this.userId
                                        }
                                    }).then(res2=>{
                                        if(res2.data.status==200){
                                            this.init();
                                            this.$message({
                                                type: 'success',
                                                message: '解绑成功'
                                            });
                                        }else{
                                            this.$message({
                                                type: 'info',
                                                message: res2.data.message
                                            });
                                        }
                                    }).catch(error2=>{
                                        this.$message({
                                            type: 'error',
                                            message: error2.data.message
                                        });
                                    })
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: '验证码输入有误'
                                    });
                                }
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '取消解绑'
                                });
                            });
                        } else {
                            this.$message({
                                type: 'info',
                                message: '验证失败'
                            });
                        }
                    })
                }).catch(()=>{
                    this.$message({
                        type: 'info',
                        message: '已取消解绑'
                    });
                })
            },

            uploadHttp(file) {
                var fd = new FormData();
                fd.append("userHeadimg", file.file);
                this.$axios
                    .post(url + "/file/upload", fd)
                    .then(res => {
                        if (res.data.status == 200) {
                            this.$message({
                                type: "seccess",
                                message: "上传成功，正在更换..."
                            });
                            var path = res.data.data;
                            let params = this.$qs.stringify({
                                userId: this.userId,
                                userHeadimg: path
                            });
                            this.$axios.post(url + "/user/upHeadimg", params)
                                .then(res2 => {
                                    if (res2.data.status == 200) {
                                        this.$message({
                                            type: "success",
                                            message: "更换成功!"
                                        });
                                        this.init();
                                    }
                                }).catch(res2 => {
                                this.$message({
                                    type: "error",
                                    message: res2.data.message
                                });
                            })
                        } else {
                            this.$message({
                                type: "info",
                                message: "上传失败！"
                            });
                        }
                    })
                    .catch(res => {
                        this.$alert("上传异常", "消息", {
                            confirmButtonText: "确定"
                        });
                    });
            },
            updatename() {
                this.$axios.get(url + "/user/changename", {
                    params: {
                        userId: this.userId,
                        userName: this.userMsg.userName
                    }
                }).then(res => {
                    if (res.data.status == 200) {
                        this.$message({
                            type: "success",
                            message: "修改成功！"
                        });
                    } else {
                        this.$message({
                            type: "info",
                            message: "修改失败！"
                        });
                    }
                }).catch(res => {
                    this.$message({
                        type: "error",
                        message: "修改异常！"
                    });
                })
            }
        }
    }
</script>

<style>
    #update {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .up_img {
        margin-top: 50px;
        width: 250px;
        height: 250px;
        border-radius: 50%;
    }

    .up_form {
        margin-top: 30px;
    }

    .input {
        font-size: 20px;
        height: 60px;
        width: 600px;
    }

    .up_p {
        font-size: 17px;
        height: 60px;
        width: 600px;
    }
</style>