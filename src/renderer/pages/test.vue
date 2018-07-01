<template>
  <div style="padding: 10px 0;">
    <el-button size="middle" type="primary" v-on:click="downloadMater()">下载材料</el-button>
  </div>
</template>

<script>

   export default {
        data() {
            return {
                 exportList: [{
                        name: '韩版设计时尚风衣大',
                        number: 'MPM00112',
                        salePrice: '￥999.00',
                        stocknums: 3423,
                        salesnums: 3423,
                        sharenums: 3423,
                    },
                    {
                        name: '韩版设计时尚风衣大',
                        number: 'MPM00112',
                        salePrice: '￥999.00',
                        stocknums: 3423,
                        salesnums: 3423,
                        sharenums: 3423,
                    },
                ]
            }
        },

        methods: {
             downloadMater (){
                 const defaultCellStyle =  { font: { name: "Verdana", sz: 11, color: "FF00FF88"}, fill: {fgColor: {rgb: "FFFFAA00"}}};
                 const wopts = { bookType:'xlsx', bookSST:false, type:'binary', defaultCellStyle: defaultCellStyle, showGridLines: false};
                 const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} }; 
                 let data = this.exportList
                wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data)
                
                //创建二进制对象写入转换好的字节流
               let tmpDown =  new Blob([this.s2ab(XLSX.write(wb, wopts))], { type: "application/octet-stream" })
               FileSaver.saveAs(tmpDown, "hello world.xls");
             },
             //字符串转字符流
             s2ab (s) {
                if (typeof ArrayBuffer !== 'undefined') {  
                    var buf = new ArrayBuffer(s.length);  
                    var view = new Uint8Array(buf);  
                    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;  
                    return buf;  
                } else {  
                    var buf = new Array(s.length);  
                    for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;  
                    return buf;  
                }
             }
        }
    }

</script>

<style scoped>
</style>
