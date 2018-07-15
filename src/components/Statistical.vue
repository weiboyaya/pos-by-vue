<template>
    <div class="statistical">
        <el-menu :default-active="active" mode="horizontal" @select="menuSelect">
            <el-submenu v-for="menu in menus" :index="menu.name" >
                <template slot="title">{{menu.title}}</template>
                <el-menu-item v-for="cmenu in menu.datas" :index="cmenu.name">{{cmenu.title}}</el-menu-item>
            </el-submenu>
        </el-menu>
        <div class="statistical-content" id="chart" ref="chart">
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            active:'',
            charObj:null,
            menus:[{
                name:'line',
                title:'折线图',
                datas:[{
                    name:'salesLine',
                    title:'销售额折线图'
                }]
                },{
                    name:'bar',
                    title:'柱状图',
                    datas:[{
                        name:'salesBar',
                        title:'销售额柱状图'
                    }]
                },{
                    name:'pie',
                    title:'饼状图',
                    datas:[{
                        name:'salesPie',
                        title:'销售额饼状图'
                    }]
                }],
                line:{
                    title:{
                        text:'销售情况统计',
                        left:'center'
                    },
                    xAxis:{
                        type:'category',
                        data:['1月','2月','3月','4月','5月','6月','7月']
                    },
                    yAxis:{
                        type:'value'
                    },
                    series:[{
                        data:[10, 52, 200, 334, 390, 330, 220],
                        type:'line'
                    }]
                },
                bar:{
                    title:{
                        text:'销售情况统计',
                        left:'center'
                    },
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['1月','2月','3月','4月','5月','6月','7月'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'销售额',
                            type:'bar',
                            barWidth: '60%',
                            data:[10, 52, 200, 334, 390, 330, 220]
                        }
                    ]
                },
                pie:{
                    title:{
                        text:'销售情况统计',
                        left:'center'
                    },
                     tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        // orient: 'vertical',
                        // top: 'middle',
                        bottom: 10,
                        left: 'center',
                        data: ['1月','2月','3月','4月','5月','6月','7月']
                    },
                    series:[{
                        name:'销售额',
                        type: 'pie',
                        radius : '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data:[{
                            value:10,
                            name:'1月'
                            },{
                            value:52,
                            name:'2月'
                            },{
                            value:200,
                            name:'3月'
                            },{
                            value:334,
                            name:'4月'
                            },{
                            value:390,
                            name:'5月'
                            },{
                            value:330,
                            name:'6月'
                            },{
                            value:220,
                            name:'7月'
                            }]
                    }]
                }
        }
    },
    methods:{
        menuSelect:function(key,keyPath){
            this.charObj=null;
            this.charObj=this.$echarts.init(document.getElementById('chart'));
            var key={"line":this.line,"bar":this.bar,"pie":this.pie}[keyPath[0]]||"line";
            this.charObj.clear();//清除之前的样式
            this.charObj.setOption(key);
        }
    },
    mounted:function(){
        this.menuSelect("salesLine",["line","salesLine"]);
    }

}
</script>
<style>
.statistical{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
.statistical-content{
    height: calc(100% - 61px);
}
</style>
