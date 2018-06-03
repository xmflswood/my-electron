<template>
  <div class="flex-column dw-input" style="height: 100%;">
    <div class="head-box">
      <div>
        <el-row class="input-row flex">
          <span class="input-title">项目名称:</span>
          <el-input class="contact-input flex-1" v-model="propsData.projectName" :disabled="readOnly"></el-input>
        </el-row>
        <el-row class="input-row flex">
          <span class="input-title">合同编号:</span>
          <el-input class="contact-input flex-1" v-model="propsData.contactNum" :disabled="readOnly"></el-input>
        </el-row>
        <el-row class="input-row flex">
          <span class="input-title">合同签订日期:</span>
          <el-date-picker
            :disabled="readOnly"
            v-model="propsData.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-row>
      </div>
    </div>
    <div class="flex-1 custom-bar" style="overflow: auto;position: relative;">
      <div v-for="(i, index) in propsData.subjects" :key="index">
        <el-row class="input-row">
          <span class="input-title">标的物1选择:</span>
          <el-input class="bdw-input" v-model="i.subject" :disabled="readOnly"></el-input>
          <span class="input-title">数量:</span>
          <el-input class="bdw-input" v-model="i.nums" :disabled="readOnly"></el-input>
        </el-row>
        <el-row class="input-row">
          <span class="input-title">中标价格:</span>
          <el-input class="bdw-input" v-model="i.price" :disabled="readOnly"></el-input>
          <i v-if="propsData.subjects.length > 1 && !readOnly" class="el-icon-delete delete-subject" @click="deleteSubject(index)"></i>
        </el-row>
      </div>
      <el-button v-if="!readOnly" type="primary" round size="small" style="margin-left: 25px;" @click="addSubject">添加标的物</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'contact-detail',
    props: {
      propsData: {
        type: Object,
        required: true
      },
      readOnly: {
        type: Boolean,
        required: true
      }
    },
    data () {
      return {
      }
    },
    methods: {
      addSubject () {
        let o = {
          subject: '',
          nums: null,
          price: null
        }
        this.propsData.subjects.push(o)
      },
      deleteSubject (index) {
        this.propsData.subjects.splice(index, 1)
      }
    },
    watch: {
    }
  }
</script>

<style scoped>
  .input-row {
    margin: 10px 0;
  }
  .input-title {
    display: inline-block;
    width: 120px;
    text-align: right;
    font-size: 16px;
    margin-right: 20px;
    line-height: 40px;
  }
  .contact-input {
    padding-right: 20px;
  }
  .head-box {
    border-bottom: 1px solid lightgray;
  }
  .bdw-input {
    width: 140px;
  }
  .delete-subject {
    font-size: 20px;
    color: gray;
    margin-left: 90px;
    cursor: pointer;
  }
</style>
