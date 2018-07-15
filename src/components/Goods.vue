<template>
    <div class="goods">
        <el-table ref="singleTable" :data="goodsData" highlight-current-row @current-change="handleCurrentChange" style="width:100%;height:calc(100% - 42px);overflow-y:scroll">
            <el-table-column property="id" label="id"></el-table-column>
            <el-table-column property="name" label="名称"></el-table-column>
            <el-table-column property="type" label="类型"></el-table-column>
            <el-table-column property="price" label="价格"></el-table-column>
            <el-table-column property="picture" label="图例"></el-table-column>
        </el-table>
        <div class="goods-btns">
            <el-button plain size="small" type="primary" @click="addGood('add')">新增</el-button>
            <el-button plain size="small" type="primary" @click="updateGood()">修改</el-button>
            <el-button plain size="small" type="primary" @click="deleteGood()">删除</el-button>
        </div>
        <el-dialog title="新增/修改商品" :visible="newGood.id!=''" @close="addGood('close')">
            <el-form :model="newGood" :rules="rules">
                <el-form-item prop="name" label="名称" label-width="120px">
                    <el-input v-model="newGood.name"></el-input>
                </el-form-item>
                <el-form-item prop="type"  label="商品类型" label-width="120px">
                    <el-select  placeholder="商品类型" v-model="value" class="goods-select">
                        <el-option v-for="types in goodType" :label="types.key" :key="types.value" :value="types.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="price" label="价格" label-width="120px">
                    <el-input type="price" v-model.number="newGood.price"></el-input>
                </el-form-item>
                <el-form-item prop="picture" label="图例" label-width="120px">
                    <el-input v-model="newGood.picture"></el-input>
                </el-form-item>
            </el-form>
            <div class="goods-btns">
                <el-button type="primary" plain size="small" @click="addGood('commit')">保存</el-button>
                <el-button type="primary" plain size="small" @click="addGood('close')">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        var checkName=(rule,value,callback)=>{
            if(!value){
                return callback(new Error("名称不能为空"));
            }
        }
        var checkPicture=(rule,value,callback)=>{
            if(!value){
                callback(new Error("图例不能为空"));
            }

        }
        var checkPrice=(rule,value,callback)=>{
             if(!value){
                callback(new Error("金额不能为空"));
            }
            if(Number.isNaN(value)){
                callback(new Error("请输入数字值"));
            }
        }

        return{
            goodsData:[],
            newGood:{
                id:'',
                name:'',
                type:'',
                price:'',
                priture:''
            },
            value:'',
            currentRow:'',
            opt:'',
            goodType:[{key:"套餐",value:"meal"},{key:"主食",value:"food"},{key:"小吃",value:"snack"},{key:"饮料",value:"drink"}],
            rules:{
                name:[{validator:checkName,trigger:'blur'}],
                picture:[{validator:checkPicture,trigger:'blur'}],
                price:[{validator:checkPrice,trigger:'blur'}]
            }
        }
    },
    methods:{
        handleCurrentChange:function(val){
            this.currentRow=val;
            console.log(val);
        },  
        addGood:function(value){
            if(value=='close'){
                this.newGood={
                    id:'',
                    name:'',
                    type:'',
                    price:'',
                    priture:''
                }
            }else if(value=='add'){
               this.newGood={
                    id:'1',
                    name:'',
                    type:'',
                    price:'',
                    priture:''
                };
                this.opt="add"; 
            }else if(value=='commit'){
                this.$refs['newGood'].validate((valid)=>{
                    if(!valid){
                        return false;
                    }
                });

                var that=this;
                var url=(this.opt=='add')?'/PosAction.do?method=addGood':'/PosAction.do?method=updateGood';
                let param = new URLSearchParams();
                param.append("id", that.newGood.id);
                param.append("name",that.newGood.name);
                param.append("type",that.value);
                param.append("price",that.newGood.price);
                param.append("picture",that.newGood.picture);
                
                this.$axios.post(url,param).then(function(res){
                     var datas=res.data;
                     if(datas.success){
                         that.$message("保存成功！");
                         that.getGoodList();
                     }else{
                         that.$message("保存失败："+datas.message);
                     }
                    that.newGood={
                        id:'',
                        name:'',
                        type:'',
                        price:'',
                        priture:''
                    }
                });
            }
        },
        deleteGood:function(){
            var that=this;
            if(this.currentRow==''){
                 this.$message("请选择商品之后再操作！"); 
                 return;
            }
            this.$confirm('请确认是否删除该商品?', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    let param = new URLSearchParams();
                    param.append("id", that.currentRow.id);

                    that.$axios.post('/PosAction.do?method=deleteGood',param).then(function(res){
                        var datas=res.data;
                        if(datas.success){
                            that.$message("删除成功！"); 
                        }
                        that.getGoodList();
                    });
                });
            
        },
        updateGood:function(){
            if(this.currentRow==''){
                 this.$message("请选择商品之后再操作！"); 
                 return;
            }
            var obj=JSON.parse(JSON.stringify(this.currentRow));
            this.newGood=obj;
            this.value=obj.type;
            this.opt="update";
        },
        getGoodList:function(){
             var that=this;
            //查询商品列表
            this.$axios.get('/PosAction.do?method=getGoodsList').then(function(res){
                var datas=res.data;
                that.goodsData=datas.data.goodsList;
            });
        }
    },
    created:function(){
       this.getGoodList();
    }
}
</script>
<style>
.goods{
    height: 100%;
}
.goods-btns{
    text-align: center;
    margin-top: 10px;
}
.goods-select{
    width: 100%;
}
</style>
