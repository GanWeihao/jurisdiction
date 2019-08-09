<template>
    <div id="setting">
        <div class="setting-table">
            <el-card class="box-card">
                <div v-if="title==''">
                    <h1>欢迎来到蓝桥权限管理系统！</h1>
                </div>
                <div>
                    <about v-bind:url="title"></about>

                    <intro v-bind:url="title"></intro>

                    <personal v-bind:url="title"></personal>

                    <update v-bind:url="title"></update>

                    <personnel v-bind:url="title"></personnel>

                    <role v-bind:url="title"></role>

                    <rules v-bind:url="title"></rules>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>

    import about from "@/components/about";
    import intro from "@/components/intro"
    import personal from "@/components/personal";
    import update from "@/components/update";

    import personnel from "@/components/personnel";
    import role from "@/components/role";
    import rules from "@/components/rules"

    var url = "http://106.13.207.98:8080/jurisdiction"
    export default {
        name: "setting",
        components:{
            about,
            intro,
            personal,
            update,

            personnel,
            role,
            rules
        },
        data(){
            return{
                list:[]
            }
        },
        props: {
            title: String,
        },
        beforeCreate(){

        },
        mounted() {

        },
        methods: {
            init(){

            }
        }
    }
</script>

<style>
    #setting{

    }
    .setting-table{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        float: left;
        margin: 0;
        width: 89%;
        height: 889px;
        background-color: rgba(0,0,0,0.1);
    }
    .box-card{
        height: 800px;
        width: 95%;
    }

</style>