<template>
  <div class="flex-column dw-input" style="height: 100%;">
    <div class="head-box">
      <div>
        <el-row class="input-row flex">
          <span class="input-title">物资:</span>
          <el-input class="contact-input flex-1" v-model="propsData.kName" :disabled="readOnly"></el-input>
        </el-row>
        <el-row class="input-row flex">
          <span class="input-title">物资编号:</span>
          <el-input class="contact-input flex-1" v-model="propsData.kNum" :disabled="readOnly"></el-input>
        </el-row>
      </div>
    </div>
    <div class="flex-1 custom-bar" style="overflow: auto;position: relative;">
      <div v-for="(i, index) in propsData.materials" :key="index">
        <el-row class="input-row">
          <span class="input-title">原材选择:</span>
          <el-input class="bdw-input" v-model="i.name" :disabled="true"></el-input>
          <span class="input-title" style="margin-left: -50px;">占比:</span>
          <el-input class="bdw-input" v-model="i.rate" :disabled="readOnly"></el-input> %
        </el-row>
      </div>
      <!-- <el-button v-if="!readOnly" type="primary" round size="small" style="margin-left: 25px;" @click="addSubject">添加标的物</el-button> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'data-k-detail',
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
          name: '',
          rate: null
        }
        this.propsData.materials.push(o)
      },
      deleteSubject (index) {
        this.propsData.materials.splice(index, 1)
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
