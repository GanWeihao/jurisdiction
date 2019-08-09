<template>
    <div id="rules"  v-if="url==title">
        <el-button size="medium" @click="addrules()">添加权限</el-button>
        <el-table
                size="medium"
                :data="ruleslist"
                style="margin-top:10px;width: 100%;height: 869px">
            <el-table-column
                    fixed="left"
                    type="index"
                    label="序号"
                    width="75">
            </el-table-column>
            <el-table-column
                    fixed="left"
                    prop="rulesName"
                    label="权限"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="menu.menuName"
                    label="上级菜单"
                    width="250">
            </el-table-column>
            <el-table-column
                    prop="rulesTime"
                    label="添加时间"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="rulesUrl"
                    label="URL地址"
                    width="200">
            </el-table-column>

            <el-table-column
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="medium" @click="updaterules(scope.row)">编辑</el-button>
                    <el-button type="text" size="medium" @click="deleterules(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :before-close="insertrules_handleClose" title="添加权限" :visible.sync="dialogFormVisible">
            <el-form :model="form1">
                <el-form-item label="权限名称" :label-width="formLabelWidth">
                    <el-input v-model="form1.rulesName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上级菜单" :label-width="formLabelWidth">
                    <el-select v-model="form1.rulesMenuId" placeholder="请选择上级菜单">
                        <el-option v-for="menu in menulist" :label="menu.MENU_NAME" :value="menu.MENU_ID"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="URL地址" :label-width="formLabelWidth">
                    <el-select v-model="form1.rulesUrl" placeholder="请选择URL地址">
                        <el-option v-for="url in urllist" :label="url.urlName" :value="url.urlName"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="submit_addrules_close()">取 消</el-button>
                <el-button type="primary" @click="submit_addrules()">确 定</el-button>
            </div>
        </el-dialog>


        <el-dialog :before-close="updaterules_handleClose" title="编辑权限" :visible.sync="dialogFormVisible2">
            <el-form :model="form2">
                <el-form-item label="权限名称" :label-width="formLabelWidth">
                    <el-input v-model="form2.rulesName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上级菜单" :label-width="formLabelWidth">
                    <el-select v-model="form2.rulesMenuId" placeholder="请选择上级菜单">
                        <el-option v-for="menu in menulist" :label="menu.MENU_NAME" :value="menu.MENU_ID"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="URL地址" :label-width="formLabelWidth">
                    <el-select v-model="form2.rulesUrl" placeholder="请选择URL地址">
                        <el-option v-for="url in urllist" :label="url.urlName" :value="url.urlName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="sunmit_updaterules_close()">取 消</el-button>
                <el-button type="primary" @click="sunmit_updaterules()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    var url = "http://106.13.207.98:8080/jurisdiction"
    export default {
        name: "rules",
        props: {
            url: String,
        },
        data(){
            return{
                title:"/rules",
                ruleslist:[],
                urllist:[],
                dialogFormVisible: false,
                form1: {
                    rulesName: '',
                    rulesMenuId: '',
                    rulesUrl:''
                },
                dialogFormVisible2: false,
                form2: {
                    rulesId: '',
                    rulesName: '',
                    rulesMenuId: '',
                    rulesUrl:''
                },
                formLabelWidth: '120px',
                menulist:[],
                rules:{}
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            init(){
                this.$axios.get(url + "/rules/menu/findall")
                    .then(res=>{
                        if(res.data.status==200){
                            this.ruleslist = res.data.data
                            console.log(this.ruleslist)
                        }
                    }).catch(error=>{
                        this.$message("异常")
                })

                this.$axios.get(url + "/menu/findall")
                    .then(res=>{
                        if(res.data.status==200){
                            this.menulist = res.data.data;
                        }
                    }).catch(error=>{
                    this.$message(error.data.message)
                })


                this.$axios.get(url + "/url/selectall")
                    .then(res=>{
                        if(res.data.status==200){
                            this.urllist = res.data.data;
                            console.log(this.urllist)
                        }
                    }).catch(error=>{
                    console.log(error)
                })
            },
            insertrules_handleClose(){
                this.dialogFormVisible = false
                this.form1= {
                    rulesName: '',
                    rulesMenuId: '',
                    rulesUrl:''
                }
            },
            addrules(){
                this.dialogFormVisible = true

            },
            submit_addrules(){
                this.$axios.get(url + "/rules/add",{
                    params:{
                        rulesName: this.form1.rulesName,
                        rulesMenuId: this.form1.rulesMenuId,
                        rulesUrl: this.form1.rulesUrl
                    }
                })
                    .then(res=>{
                        if(res.data.status==200){
                            this.init();
                            this.insertrules_handleClose();
                        }
                    }).catch(error=>{
                        this.$message(error.data.message);
                })
            },
            submit_addrules_close(){
                this.insertrules_handleClose();
            },
            updaterules_handleClose(){
                this.dialogFormVisible2 = false
                this.form2 = {
                    rulesId: '',
                    rulesName: '',
                    rulesMenuId: '',
                    rulesUrl: ''
                }
            },
            updaterules(row){
                this.form2 = {
                    rulesId: row.rulesId,
                    rulesName: row.rulesName,
                    rulesMenuId: row.rulesMenuId,
                    rulesUrl: row.rulesUrl
                },
                this.dialogFormVisible2 = true
            },
            sunmit_updaterules(){
                this.$axios.get(url + "/rules/update",{
                    params:{
                        rulesId:this.form2.rulesId,
                        rulesName: this.form2.rulesName,
                        rulesMenuId: this.form2.rulesMenuId,
                        rulesUrl: this.form2.rulesUrl
                    }
                }).then(res=>{
                    if(res.data.status==200){
                        this.init();
                        this.updaterules_handleClose();
                    }
                })
            },
            sunmit_updaterules_close(){
                this.updaterules_handleClose();
            },
            deleterules(row){
                console.log(row.rulesId)
                this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.get(url + "/rules/delete",{
                        params:{
                            rulesId: row.rulesId
                        }
                    }).then(res=>{
                        if(res.data.status==200){
                            this.$axios.get(url + "/role/rules/delete",{
                                params:{
                                    rulesId: row.rulesId
                                }
                            }).then(res2=>{
                                this.init();
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }).catch(error2=>{
                                this.$message({
                                    type: 'error',
                                    message: '删除异常1!'
                                });
                            })
                        }
                    }).catch(error=>{
                        this.$message({
                            type: 'error',
                            message: '删除异常2!'
                        });
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

</style>