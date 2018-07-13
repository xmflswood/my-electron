<template>
  <div class="welcome-bg">
    <!-- <div class="bg"></div> -->
    <div class="welcome-box">
      <div class="item">
        <div class="logo"></div>
        <div class="t1"></div>
        <div class="t2"></div>
      </div>
      <div class="item">
        <div class="l1"></div>
        <div class="t3"></div>
        <div class="l2"></div>
      </div>
      <div class="item">
        <div class="t4">
          <el-button class="btn" @click="$emit('confirm')">点击进入</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  div {
    background-repeat: no-repeat;
    background-size: cover;
  }
  /* .bg {
    width: 900px;
    height: 1350px;
    background-image: url('../assets/img/t/8.png');
    position: absolute;
    top: 0px;
    left: 0px;
  } */
  .welcome-bg {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('../assets/img/t/8.png');
    display: flex;
    justify-content: center;
    overflow: hidden;
  }
  .welcome-box {
    width: 720px;
    text-align: center;
    height: 100%;
    /* background-color: black; */
  }
  .welcome-box .item {
    height: 33%;
    width: 100%;
    position: relative;
  }
  .logo {
    width: 207px;
    height: 198px;
    background-image: url('../assets/img/t/5.png');
    position: absolute;
    top: 0;
    left: 0;
  }
  .t1 {
    width: 520px;
    height: 93px;
    background-image: url('../assets/img/t/1.png');
    position: absolute;
    top: 30px;
    left: 120px;
  }
  .t2 {
    width: 400px;
    height: 46px;
    background-image: url('../assets/img/t/2.png');
    position: absolute;
    top: 100px;
    left: 170px;
  }
  .t3 {
    width: 580px;
    height: 139px;
    background-image: url('../assets/img/t/3.png');
    position: absolute;
    top: 20px;
    left: 20px;
  }
  .t4 {
    width: 460px;
    height: 53.5px;
    background-image: url('../assets/img/t/4.png');
    position: absolute;
    top: 20px;
    left: 80px;
  }
  .l1 {
    width: 898px;
    height: 5px;
    background-image: url('../assets/img/t/6.png');
    position: absolute;
    top: 0px;
    left: 0px;
  }
  .l2 {
    width: 898px;
    height: 5px;
    background-image: url('../assets/img/t/6.png');
    position: absolute;
    top: 200px;
    left: -180px;
  }
  .btn {
    width: 320px;
    height: 60px;
    font-weight: bold;
    font-size: 24px;
    letter-spacing: 6px;
    border-radius: 8px;
    background-color: #138176;
    border: none;
    color: white;
    position: relative;
    top: 80px;
  }
</style>
