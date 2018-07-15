<template>
    <div class="pos">
        <el-row class="pos-row">
            <el-col :span="8" class="pos-order">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="结账" name="first">
                        <el-table :data="getTableDate" max-height="400px" stripe  show-summary :summary-method="sumMoney" class="pos-first-table">
                            <el-table-column prop="name"  label="商品名称"></el-table-column>
                            <el-table-column prop="price"  label="金额" :formatter="dollarFormat"></el-table-column>
                            <el-table-column prop="count"  label="数量"></el-table-column>
                            <el-table-column prop="opt" align="center" label="操作" width="150px">
                            <template scope="scope">
                                <el-button type="info" plain size="mini" @click="addCount(scope.row)">增加</el-button>
                                <el-button type="danger" plain size="mini" @click="deleteGood(scope.row)">删除</el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                        <div class="pos-first-btns">
                            <el-button type="primary" plain size="small" @click="payAccount">结账</el-button>
                            <el-button type="primary" plain size="small" >挂单</el-button>
                            <el-button type="primary" plain size="small" @click="deleteAll">删除</el-button>
                        </div>
                        
                    </el-tab-pane>
                    <el-tab-pane label="挂单" name="second">挂单</el-tab-pane>
                    <el-tab-pane label="外卖" name="third">外卖</el-tab-pane>
                </el-tabs>

            </el-col>
            <el-col :span="16" class="pos-items">
                <el-container>
                <el-header height="300px">
                    <el-tabs v-model="activeGoods">
                        <el-tab-pane label="热销商品" name="first">
                            <ul class="pos-items-ul">
                                <li class="pos-items-li" v-for="well in wellGoods">
                                    <el-button type="primary" plain class="pos-items-tag" @click="selecGood(well)">{{well.name}}-{{well.price}}元</el-button>
                                </li>
                            </ul>

                        </el-tab-pane>
                    </el-tabs>
                </el-header>
                <el-main class="pos-classify-goods">
                    <el-tabs v-model="classifyGoods" type="card" @tab-click="handleClick">
                        <el-tab-pane label="套餐" name="meal">
                            <ul class="classifyGoods-ul">
                                <li class="classifyGoods-li" v-for="meal in mealGoods" @click="selecGood(meal)">
                                    <img :src="meal.picture"  class="good-img"/>
                                    <div class="good-name">{{meal.name}}</div>
                                    <div class="good-price">￥{{meal.price}}元</div>
                                </li>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="主食" name="food">
                            <ul class="classifyGoods-ul">
                                <li class="classifyGoods-li" v-for="food in foodGoods" @click="selecGood(food)">
                                    <img :src="food.picture"  class="good-img"/>
                                    <div class="good-name">{{food.name}}</div>
                                    <div class="good-price">￥{{food.price}}元</div>
                                </li>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="小吃" name="snack">
                            <ul class="classifyGoods-ul">
                                <li class="classifyGoods-li" v-for="snack in snackGoods" @click="selecGood(snack)">
                                    <img :src="snack.picture"  class="good-img"/>
                                    <div class="good-name">{{snack.name}}</div>
                                    <div class="good-price">￥{{snack.price}}元</div>
                                </li>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="饮料" name="drink">
                            <ul class="classifyGoods-ul">
                                <li class="classifyGoods-li" v-for="drink in drinkGoods" @click="selecGood(drink)">
                                    <img :src="drink.picture"  class="good-img"/>
                                    <div class="good-name">{{drink.name}}</div>
                                    <div class="good-price">￥{{drink.price}}元</div>
                                </li>
                            </ul>
                        </el-tab-pane>
                    </el-tabs>
                </el-main>
                </el-container>
            </el-col>
        </el-row>
    </div>
</template>
<script>


export default {
    data(){
        return{
            activeName: 'first',
            activeGoods:'first',
            classifyGoods:'meal',
            tableDate:[{
                name: '可口可乐',
                price: 8,
                count:1
                }, {
                
                name: '香辣鸡腿堡',
                price: 15,
                count:1
                }, {
                
                name: '爱心薯条',
                price: 8,
                count:1
                }, {
                
                name: '甜筒',
                price: 8,
                count:1
                }],
            wellGoods:[{
                name: '香辣鸡腿堡',
                price: 15,
                count:1,
                picture:'https://img.4008823823.com.cn/kfcios/Version/435_268218.jpg'
            },{
                name: '爱心薯条',
                price: 8,
                count:1,
                picture:'https://img.4008823823.com.cn/kfcios/Version/458_294144.jpg'
            },{
                name: '甜筒',
                price: 8,
                count:1,
                picture:'https://img.4008823823.com.cn/kfcios/Version/481_330173.jpg'
            },{
                    name: '堡堡Line双人餐',
                price: 82,
                count:1,
                picture:'https://img.4008823823.com.cn/kfcios/Version/481_333908.jpg'
            },{
                name: '皮蛋瘦肉粥油条饮品',
                price: 19.5,
                count:1,
                picture:'https://img.4008823823.com.cn/kfcios/Version/475_320554.jpg'
            },{
                name: '巧克力华夫咖啡餐',
                price: 20,
                count:1,
                picture:'https://img.4008823823.com.cn/kfcios/Version/475_320565.jpg'
            },{
                    name: '薰衣草风味杯',
                price: 13,
                count:1,
                picture:'https://img.4008823823.com.cn/kfcios/Version/481_330893.jpg'
            },{
                name: '九珍果汁饮料',
                price: 11,
                count:1,
                picture:'https://img.4008823823.com.cn/kfcios/Version/237_93012.jpg'
            },{
                name: '热柠檬红茶',
                price: 11,
                count:1,
                picture:'https://img.4008823823.com.cn/kfcios/Version/439_270354.jpg'
            }],
            mealGoods:[],
            foodGoods:[],
            snackGoods:[],
            drinkGoods:[]
        }
    },
    methods:{
        handleClick:function(tab,event){
            console.log(tab,event);
        },
        dollarFormat:function(row,column){
            var value=row.price;
            if(!value) return '0.00'
            return value.toString().split('.').length>1?value:value+'.00';
        },
        addCount:function(data){
            var index=0;
            var obj=JSON.parse(JSON.stringify(data));
            this.tableDate.filter(function(o,i){
                o.name==obj.name&&(index=i);
            });
            obj.count++;
            this.$set(this.tableDate,index,obj);
        },
        deleteGood:function(data){
            var index=0;
            var obj=JSON.parse(JSON.stringify(data));
            this.tableDate.filter(function(o,i){
               o.name==obj.name&&(index=i);
            });
            if(obj.count<=1){
                this.tableDate.splice(index,1);
            }else{
                obj.count--;
                this.$set(this.tableDate,index,obj);
            }
           
        },
        sumMoney:function(param){
            var sum=[];
            var countSum=0;
            var countS=0;
            this.tableDate.forEach((data,index)=>{
                countSum+=Number(data.price)*Number(data.count);
                countS+=data.count;
            });
            sum.push("合计");
            sum.push(countSum.toString().split(".").length>1?countSum:countSum+".00");
            sum.push(countS);
            return sum;
           
        },
        deleteAll:function(){
            if(this.tableDate.length>0){
                this.$confirm('请确认是否删除该订单?', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.tableDate=[];
                });
            }
                
            
        },
        selecGood:function(data){
            var index=-1;
            var count=0;
            var obj=JSON.parse(JSON.stringify(data));
            this.tableDate.forEach((d,i)=>{
                if(d.name==obj.name){
                    index=i;
                    count=d.count;
                }
            }); 
            if(index>-1){
                obj.count+=count;
                this.$set(this.tableDate,index,obj);
            }else{
                this.$set(this.tableDate,this.tableDate.length,obj); 
            }
        },
        payAccount:function(){
            if(this.tableDate.length>0){
                this.$confirm('请确认客户是否已付清钱款?', '提示', {
                    confirmButtonText: '已付清',
                    cancelButtonText: '未付清',
                    type: 'warning'
                }).then(this.deleteAll);
            }else{
                this.$message("请点餐之后再结账！");
            }
            
        }
    },
    components:{
        
    },
    computed:{
        getTableDate:function(){
          return this.tableDate;
        }
    },
    created:function(){
        var that=this;
        //获取畅销商品、分类商品
        this.$axios.get('/PosAction.do?method=getAllGoods').then(function(res){
            var datas=res.data;
            that.mealGoods=datas.data.mealGoods;
            that.foodGoods=datas.data.foodGoods;
            that.snackGoods=datas.data.snackGoods;
            that.drinkGoods=datas.data.drinkGoods;
        });
        this.$axios.get('/PosAction.do?method=getWellGoods').then(function(res){
            var datas=res.data;
            that.wellGoods=datas.data.wellGoods;
        });
    }
}
</script>
<style>
.pos{
    width: 100%;
    height: 100%;
}
.pos-row{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
.pos-order{
    height: 100%;
    border-right: 1px solid #ccc;
}
.pos-items{
    height: 100%;
}
.pos-first-table{
    overflow-y: scroll;
}
.pos-first-btns{
    text-align: center;
    margin-top: 20px;
}
.pos-items-ul{
    list-style: none;
}
.pos-items-li{
    float: left;
    margin:0 0 20px 20px;
    overflow: hidden;
}
.pos-items-tag{
    /*width:150px;*/   
}
.pos-classify-goods{
    position: absolute;
    top:300px;
    border-top: 1px solid #ccc;
    padding: 0;
    width: 66%;
    height: calc(100% - 300px);
}
.classifyGoods-ul{
    list-style: none;
    margin: 0;
    padding: 0;
}
.classifyGoods-li{
    float: left;
    margin: 10px 0 0 20px;
    width: 170px;
    height: 80px;
    border: 1px solid #ccc;
    cursor: pointer;
}
.good-img{
    float: left;
    width: 80px;
    height: 80px;
}
.good-name{
   text-align: center;
   margin-top: 5px;
   font-size: 14px;
   color: #409eff;
}
.good-price{
    text-align: center;
    margin-top: 5px;
    font-size: 15px;
    color: red;
}
</style>
