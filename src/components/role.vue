<template>
    <div class="role" v-if="url==title">
        <el-button size="medium" @click="addRole()">
            添加角色
        </el-button>
        <el-button size="medium" @click="delRole()">
            删除角色
        </el-button>
        <div class="f5">
            <el-button size="medium" @click="openFullScreen">
                刷新
            </el-button>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="role in rolelist" :label="role.ROLE_NAME" :name="role.ROLE_ID">
                <el-checkbox-group
                        v-model="checkboxRules"
                        :min="1"
                        :max="rulesOptions.length">
                    <el-checkbox v-for="rules in rulesOptions" :label="rules.RULES_ID" :key="rules.RULES_ID">
                        <br/>
                        {{rules.RULES_NAME}}
                    </el-checkbox>
                </el-checkbox-group>
                <el-divider></el-divider>
                <el-button type="primary" @click="setrules(role.ROLE_ID)">保存</el-button>
            </el-tab-pane>
        </el-tabs>


        <el-dialog :before-close="handleClose" title="添加角色" :visible.sync="dialogFormVisible">
            <el-form :model="role">
                <el-form-item label="角色名称" :label-width="formLabelWidth">
                    <el-input v-model="role.roleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色权限" :label-width="formLabelWidth">
                    <el-checkbox-group
                            v-model="checkboxRules2"
                            :min="1"
                            :max="rulesOptions2.length">
                        <el-checkbox v-for="rules2 in rulesOptions2" :label="rules2.RULES_ID" :key="rules2.RULES_ID">
                            {{rules2.RULES_NAME}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="submit_insertrole_close()">取 消</el-button>
                <el-button type="primary" @click="submit_insertrole()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    var url = "http://106.13.207.98:8080/jurisdiction"
    export default {
        name: "role",
        data() {
            return {
                title:"/role",
                dialogFormVisible: false,
                formLabelWidth: "120px",
                activeName: '',
                rolelist: [],
                rulesOptions: [],
                checkboxRules: [],
                roleId:"",
                role: {
                    roleName: ""
                },
                rulesOptions2: [],
                checkboxRules2: [],

                loading:false
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
                this.$axios.get(url + "/role/findall")
                    .then(res => {
                        if (res.data.status == 200) {
                            this.rolelist = res.data.data;
                            this.activeName = res.data.data[0].ROLE_ID
                            this.$axios.get(url + "/rules/findall")
                                .then(res2 => {
                                    if (res2.data.status == 200) {
                                        this.rulesOptions = res2.data.data
                                        this.$axios.get(url + "/rules/select", {
                                            params: {
                                                roleId: res.data.data[0].ROLE_ID
                                            }
                                        }).then(res3 => {
                                            var li = []
                                            for (let i = 0; i < res3.data.data.length; i++) {
                                                li.push(res3.data.data[i].rulesId)
                                            }
                                            this.checkboxRules = li;
                                            console.log(li)
                                        }).catch(error3 => {
                                            this.$message(error3.data.message)
                                        })
                                    }
                                }).catch(error2 => {
                                this.$message(error2.data.message)
                            })
                        }
                    }).catch(error => {
                    this.$message(error.data.message)
                })
            },
            openFullScreen() {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    this.init();
                    loading.close();
                }, 1000);
            },
            handleClick(tab, event) {
                this.roleId = tab.name
                this.$axios.get(url + "/rules/select", {
                    params: {
                        roleId: tab.name
                    }
                }).then(res => {
                    var li = []
                    for (let i = 0; i < res.data.data.length; i++) {
                        li.push(res.data.data[i].rulesId)
                    }
                    this.checkboxRules = li;
                }).catch(error => {
                    this.$message(error.data.message)
                })
            },
            addRole() {
                this.$axios.get(url + "/rules/findall")
                    .then(res => {
                        if (res.data.status == 200) {
                            this.rulesOptions2 = res.data.data;
                            this.dialogFormVisible = true
                        }
                    }).catch(error => {
                    this.$message(error.data.message)
                })
            },
            handleClose() {
                this.dialogFormVisible = false
                this.form = {
                    roleName: ""
                }
                this.checkboxRules2 = []
            },
            submit_insertrole_close() {
                this.handleClose();
            },
            submit_insertrole() {
                this.$axios.get(url + "/role/insert", {
                    params: {
                        roleName: this.role.roleName
                    }
                }).then(res2 => {
                    if (res2.data.status == 200) {
                        for (var i = 0; i < this.checkboxRules2.length; i++) {
                            this.$axios.get(url + "/rolerules/insert", {
                                params: {
                                    roleRulesRoleId: res2.data.data.roleId,
                                    roleRulesRulesId: this.checkboxRules2[i]
                                }
                            }).then(res3 => {
                                this.dialogFormVisible = false
                                this.init();
                            }).catch(error => {

                            })
                        }
                    }
                })
            },
            setrules(id) {
                console.log(this.checkboxRules)
                this.$axios.get(url + "/rolerules/del", {
                    params: {
                        roleRulesRoleId: id
                    }
                }).then(res => {
                    if (res.data.status == 200) {
                        for (var i = 0; i < this.checkboxRules.length; i++) {
                            this.$axios.get(url + "/rolerules/insert", {
                                params: {
                                    roleRulesRoleId: id,
                                    roleRulesRulesId: this.checkboxRules[i]
                                }
                            }).then(res => {
                                if (res.data.status == 200) {

                                }
                            }).catch(error => {
                                this.$message("保存异常")
                            })
                        }
                        this.$message("保存成功")
                    }
                }).catch(error => {
                    this.$message("保存异常")
                })
            },
            delRole(){
                this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.get(url + "/role/del",{
                        params:{
                            roleId:this.roleId
                        }
                    }).then(res=>{
                        if(res.data.status==200){
                            this.$axios.get(url + "/rolerules/del",{
                                params:{
                                    roleRulesRoleId: this.roleId
                                }
                            }).then(res2=>{
                                this.init();
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }).catch(error2=>{
                                this.$message("删除异常")
                            })
                        }else{
                            this.$message(res.data.message)
                        }
                    }).catch(error=>{
                        this.$message(error.data.message)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            }
        }
    }
</script>

<style>
    .f5{
        float: right;
    }
</style>