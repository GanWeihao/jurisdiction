<template>
    <div id="about" v-if="url==title">
        <div>
            <h1>了解项目</h1>
        </div>
        <div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "about",
        data(){
            return{
                title:"/about"
            }
        },
        props: {
            url: String,
        },
    }
</script>

<style>
    #about{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-left: 10px;
    }
</style>