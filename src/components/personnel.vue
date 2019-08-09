<template>
    <div id="personnel" v-if="url==title">
        <el-button size="medium" @click="adduser()">添加用户</el-button>
        <el-table
                size="medium"
                :data="tableData"
                style="margin-top:10px;width: 100%;height: 869px">
            <el-table-column
                    fixed="left"
                    type="index"
                    label="序号"
                    width="50">
            </el-table-column>
            <el-table-column
                    fixed="left"
                    prop="userName"
                    label="姓名"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="userTelphone"
                    label="手机号"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="userEmail"
                    label="邮箱"
                    width="250">
            </el-table-column>
            <el-table-column
                    prop="userTime"
                    label="注册时间"
                    width="300">
            </el-table-column>

            <el-table-column
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="medium">查看角色</el-button>
                    <el-button @click="updateuser(scope.row)" type="text" size="medium">编辑</el-button>
                    <el-button @click="deleteuser(scope.row)" type="text" size="medium">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                :before-close="handleClose"
                destroy-on-close
                title="查看角色"
                :visible.sync="dialogVisible"
                width="30%">
            <el-checkbox-group
                    v-model="checkboxRoles"
                    :min="1"
                    :max="roleOptions.length">
                <el-checkbox v-for="role in roleOptions" :label="role.ROLE_ID" :key="role.ROLE_ID">{{role.ROLE_NAME}}
                </el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
    <el-button @click="submit_roleclose()">取 消</el-button>
    <el-button type="primary" @click="submit_role()">确 定</el-button>
  </span>
        </el-dialog>

        <el-dialog :before-close="handleClose" title="添加用户" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.userPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="form.userTelphone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" :label-width="formLabelWidth">
                    <el-input v-model="form.userEmail" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目角色" :label-width="formLabelWidth">
                    <el-checkbox-group
                            v-model="checkboxRoles"
                            :min="1"
                            :max="roleOptions.length">
                        <el-checkbox v-for="role in roleOptions" :label="role.ROLE_ID" :key="role.ROLE_ID">{{role.ROLE_NAME}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="submit_insertuser_close()">取 消</el-button>
                <el-button type="primary" @click="submit_insertuser()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :before-close="handleClose2" title="修改资料" :visible.sync="dialogFormVisible2">
            <el-form :model="form2">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="form2.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="form2.userTelphone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" :label-width="formLabelWidth">
                    <el-input v-model="form2.userEmail" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="submit_updateuser_close()">取 消</el-button>
                <el-button type="primary" @click="submit_updateuser()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    var url = "http://106.13.207.98:8080/jurisdiction";
    export default {
        name: "personnel",
        data() {
            return {
                title:"/personnel",
                dialogFormVisible: false,
                dialogFormVisible2:false,
                dialogVisible: false,
                tableData: [],
                user: {},
                roleOptions: [],
                checkboxRoles: [],
                form:{
                    userName:'',
                    userPassword:'',
                    userTelphone:'',
                    userEmail:''
                },
                form2:{
                    userId:'',
                    userName:'',
                    userTelphone:'',
                    userEmail:''
                },
                formLabelWidth:"120px"
            };
        },
        props: {
            url: String,
        },
        mounted: function () {
            this.init();
        },
        methods: {
            init() {
                this.$axios.get(url + "/user/findall")
                    .then(res => {
                        if (res.data.status == 200) {
                            for (let i = 0; i < res.data.data.length; i++) {
                                var date = new Date(res.data.data[i].userTime);
                                res.data.data[i].userTime = date.toLocaleString();
                            }
                            this.tableData = res.data.data;
                        }
                    })
            },
            handleClose(){
                this.roleOptions = []
                this.checkboxRoles = []
                this.form={
                    userName:'',
                    userPassword:'',
                    userTelphone:'',
                    userEmail:''
                }
                this.dialogFormVisible = false
                this.dialogVisible = false
            },
            handleClose2(){
                this.form2={
                    userId:'',
                    userName:'',
                    userTelphone:'',
                    userEmail:''
                }
                this.dialogFormVisible2 = false
            },
            submit_updateuser_close(){
              this.handleClose2();
            },
            submit_roleclose(){
                this.handleClose()
            },
            submit_insertuser_close(){
                this.handleClose()
            },
            handleClick(row) {
                this.user = row
                console.log(row)
                this.$axios.get(url + "/role/findall")
                    .then(res => {
                        if (res.data.status == 200) {
                            this.roleOptions = res.data.data;
                        }
                    })
                    .catch(error => {

                    })
                this.$axios.get(url + "/role/find", {
                    params: {
                        userId: row.userId
                    }
                }).then(res2 => {
                    var li = []
                    for (let i = 0; i < res2.data.data.length; i++) {
                        li.push(res2.data.data[i].roleId)
                    }
                    this.checkboxRoles = li;
                })
                this.dialogVisible = true
            },

            adduser(){
                this.$axios.get(url + "/role/findall")
                    .then(res => {
                        if (res.data.status == 200) {
                            this.roleOptions = res.data.data;
                            this.dialogFormVisible = true
                        }
                    })
                    .catch(error => {

                    })

            },

            submit_role() {
                console.log(this.user.userId)
                this.$axios.get(url + "/role/delall", {
                    params: {
                        userId: this.user.userId
                    }
                }).then(res => {
                    if (res.data.status == 200) {
                        for (var i = 0; i < this.checkboxRoles.length; i++) {
                            this.$axios.get(url + "/role/add", {
                                params: {
                                    userRoleUserId: this.user.userId,
                                    userRoleRoleId: this.checkboxRoles[i]
                                }
                            }).then(res2 => {
                                if (res2.data.status == 200) {
                                    this.dialogVisible = false
                                }
                            })
                        }
                    } else {
                        this.$message('修改失败');
                    }
                })
            },
            submit_insertuser(){
                let params = this.$qs.stringify(this.form);
                this.$axios.post(url + "/user/add", params)
                    .then(res=>{
                        if(res.data.status==200){
                            this.$axios.get(url + "/role/delall", {
                                params: {
                                    userId: res.data.data.userId
                                }
                            }).then(res2 => {
                                if (res2.data.status == 200) {
                                    for (var i = 0; i < this.checkboxRoles.length; i++) {
                                        this.$axios.get(url + "/role/add", {
                                            params: {
                                                userRoleUserId: res.data.data.userId,
                                                userRoleRoleId: this.checkboxRoles[i]
                                            }
                                        }).then(res3 => {
                                            if (res3.data.status == 200) {
                                                this.dialogFormVisible = false
                                                this.init();
                                            }
                                        })
                                    }
                                } else {
                                    this.$message('添加失败');
                                }
                            })
                        }else{
                            this.$message(res.data.message);
                        }
                    })
            },
            submit_updateuser(){
                this.$axios.get(url + "/user/update",{
                    params:{
                        userName: this.form2.userName,
                        userTelphone: this.form2.userTelphone,
                        userEmail: this.form2.userEmail,
                        userId: this.form2.userId
                    }
                }).then(res=>{
                    if(res.data.status==200){
                        this.init();
                        this.handleClose2();
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                    }else{
                        this.$message("修改失败");
                    }
                }).catch(error=>{
                    this.$message("修改失败");
                })
            },
            updateuser(row){
                this.form2={
                    userId:row.userId ,
                    userName:row.userName,
                    userTelphone:row.userTelphone,
                    userEmail:row.userEmail
                }
                this.dialogFormVisible2 = true
            },
            deleteuser(row){
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.get(url + "/user/delete",{
                        params:{
                            userId: row.userId
                        }
                    }).then(res=>{
                        if(res.data.status==200){
                            this.init();
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$message({
                                type: 'info',
                                message: '删除失败!'
                            });
                        }
                    }).catch(error=>{
                        this.$message({
                        type: 'success',
                        message: '删除异常!'
                    })
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
    #personnel {
        font-size: 20px;
    }
</style>