<template>
    <div id="menu_list">
        <el-menu
                unique-opened
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
        >
            <el-submenu v-for="(caidan,i) in caianList" :index="caidan.MENU_ID">
                <template slot="title">
                    <span  style="font-size: 16px;">{{caidan.MENU_NAME}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item
                            v-for="rules in ruleslist"
                            v-if="rules.MENU_ID == caidan.MENU_ID"
                            @click="sendRulesId(rules.RULES_URL)"
                            style="font-size: 15px;">
                        {{rules.RULES_NAME}}
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    var url = "http://106.13.207.98:8080/jurisdiction";
    export default {
        name: 'caidan',
        data() {
            return {
                caianList: [],
                ruleslist: [],
                userId: "",
                index: 0
            };
        },
        mounted: function () {
            this.init();
        },
        props:["message"],
        methods: {
            init() {
                this.userId = this.$store.state.loginUserId;
                this.$axios.get(url + "/user/menu", {
                    params: {
                        userId: this.userId
                    }
                }).then(res2 => {
                    console.log("caidan",res2)
                    if (res2.data.status == 200) {
                        this.caianList = res2.data.data;
                    }
                }).catch(error2 => {
                    this.$message('查询菜单异常');
                })

                // console.log(this.caianList)
                this.$axios.get(url + "/user/rules",{
                    params:{
                        userId: this.userId
                    }
                }).then(res => {
                    if(res.data.status==200){
                        this.ruleslist = res.data.data;
                    }
                }).catch(error => {
                    this.$message('查询权限异常');
                })
            },
            sendRulesId(id) {
                this.$emit('childByValue',  id)
            }
        }
    }
</script>

<style>
    #menu_list{
        float: left;
        width: 11%;
        height: 969px;
        background-color: #545c64;
    }
    .menu_sub{
        border: none;
        margin: 0;
        padding: 0;
    }
.el-menu-vertical-demo{

    border: none;
}
</style>