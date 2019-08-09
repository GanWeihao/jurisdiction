<template>
  <div id="pagehead">
    <div class="pagehead-bg">
      <a href="/" class="login_out" @click="removeSession">
        注销
        <i class="el-icon-s-release"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pagehead',
  props: {
    msg: String
  },
  methods: {
    removeSession:function () {
      window.localStorage.removeItem("userId")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #pagehead{
    margin: 0;
    padding: 0;
  }
    .pagehead-bg{
      float: left;
      margin: 0;
      width: 89%;
      height: 80px;
      background-color: #545c64;
    }
  .login_out{
    text-decoration: none;
    line-height: 80px;
    margin-left: 1580px;
    font-size: 20px;
    color: white;
  }

</style>
