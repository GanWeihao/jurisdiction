<template>
    <div id="index">
        <caidan v-on:childByValue="childByValue"></caidan>
        <pagehead></pagehead>
        <setting v-bind:title="rulesId"></setting>
    </div>
</template>

<script>
    import caidan from "@/components/caidan";
    import pagehead from "@/components/pagehead";
    import setting from "@/components/setting";
    export default {
        name: "Index",
        components: {
            caidan,
            pagehead,
            setting
        },
        data() {
            return{
                rulesId:''
            }
        },
        methods:{
            childByValue:function (childValue) {
                this.rulesId = childValue
            }
        }
    }
</script>

<style>
    #index{
        margin: 0;
        padding: 0;
        width: 1920px;
        height: 969px;
    }
</style>