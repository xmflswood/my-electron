<template>
  <div class="color-dark contact-item flex">
    <div class="contact-item-box flex-1" title="点击查看" @click="$emit('checkContack')">
      <div class="contact-item-title">{{showData.projectName}}</div>
      <div class="contact-item-normal">{{showData.contactNum}}</div>
      <div class="contact-item-normal">{{showData.date}}</div>
    </div>
    <div class="btn-box">
      <el-button round type="primary" size="small" @click="$emit('editContact')">修 改</el-button>
      <el-button round type="info" size="small" @click="showDelete = true">删 除</el-button>
    </div>
    <el-dialog
      :visible.sync="showDelete">
      <span>确定删除该档案？</span>
      <span slot="footer">
        <el-button type="primary" @click="confirmDelete" size="small" round :disabled="doing">确 定</el-button>
        <el-button @click="showDelete = false" round size="small">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'contact-show',
    props: {
      showData: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        showDelete: false,
        doing: false
      }
    },
    methods: {
      confirmDelete () {
        this.doing = true
        this.$emit('confirmDelete')
        this.showDelete = false
        setTimeout(() => {
          this.doing = false
        }, 300)
      }
    }
  }
</script>

<style scoped>
  .contact-item {
    padding: 10px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #d8d8d8;
    align-items: center;
  }
  .contact-item:hover {
    border-bottom: 1px solid white;
  }
  .contact-item-title {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 5px;
  }
  .contact-item-normal {
    font-size: 16px;
  }
  .contact-item-box {
    cursor: pointer;
    padding: 0 20px;
    overflow: hidden;
    box-sizing: border-box;
  }
  .contact-item-box:hover {
    color: white;
  }
  .btn-box {
    width: 200px;
    position: relative;
  }
</style>
