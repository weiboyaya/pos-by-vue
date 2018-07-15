<template>
    <div class="LeftNav">
        <ul class="LeftNav-ul">
            <li :class="['LeftNav-menu',selecTitle==menu.title?selecClass:'']" v-for="menu in menuLists"
             @mouseover="over(menu.title)" @mouseout="out" @click="selecMenu(menu)">
                <i :class="[menu.class,selecTitle==menu.title?selecClass:'']"></i>
                <div :class="['LeftNav-title',selecTitle==menu.title?selecClass:'']">{{menu.title}}</div>
            </li>  
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            menuLists:[{
                title:'收银',
                class:'icon iconfont icon-sponsor',
                name:'pos'
            },{
                title:'店铺',
                class:'icon iconfont icon-shop',
                name:'store'
            },{
                title:'商品',
                class:'icon iconfont icon-goods_light',
                name:'goods'
            },{
                title:'会员',
                class:'icon iconfont icon-vipcard',
                name:'member'
            },{
                title:'统计',
                class:'icon iconfont icon-tongji',
                name:'statistical'
            }],
            selecClass:'',
            selecTitle:''
        }
    },
    methods:{
        over:function(val){
            this.selecClass='hovers';
            this.selecTitle=val;
        },
        out:function(){
            this.selecClass='';
            this.selecTitle='';
        },
        selecMenu:function(menu){
            this.$router.push(menu.name);
        }
    }
}
</script>
<style scoped>
.LeftNav{
    width: 60px;
    height: 100%;
    background: #409eff;
}
.LeftNav-ul{
    margin: 0;
    padding: 0;
}
.LeftNav-menu{
    text-align: center;
    padding: 5px 0 5px 0;
}
.iconfont{
    font-size: 35px;
    color: #fff;  
}
.LeftNav-title{
    font-size: 13px;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #fff;  
    text-align: center;
}
.hovers{
    background: #ccc;
    color: #409eff;
    cursor: pointer;
}
</style>
