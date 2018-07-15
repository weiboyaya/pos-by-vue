<template>
    <div class="member">
        <el-tabs type="border-card" class="member-tabs">
            <el-tab-pane label="会员管理" class="member-label">
                <el-table :data="members" border style="width:60%;height=80%;">
                    <el-table-column prop="id" label="序号"></el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="vipId" label="会员编号"></el-table-column>
                    <el-table-column prop="points" label="积分"></el-table-column>
                    <el-table-column label="操作" align="center" width="200px">
                        <template scope="scope"> 
                            <el-button type="primary" plain size="mini" @click="showHis(scope.row)">消费历史</el-button>
                            <el-button type="danger" plain size="mini" @click="changeMsg(scope.row)">修改信息</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="member-add">
                    <el-button type="primary" plain size="small" @click="addMember('add')">新增</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-dialog title="消费记录" :visible="hisData.length>0" @close="closeDialog(null)">
            <el-table :data="hisData" :row-class-name="tableRowClassName">
                <el-table-column label="序号" property="id"></el-table-column>
                <el-table-column label="名称" property="name"></el-table-column>
                <el-table-column label="积分" property="points"></el-table-column>
                <el-table-column label="日期" property="date"></el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="会员信息" :visible="custInfo[0].id!=''" @close="closeDialog(null)">
            <el-form :model="custInfo[0]">
                <el-form-item label="序号" label-width="120px">
                    <el-input v-model="custInfo[0].id" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="客户名称" label-width="120px">
                    <el-input v-model="custInfo[0].name"></el-input>
                </el-form-item>
                <el-form-item label="会员编号" label-width="120px">
                    <el-input v-model="custInfo[0].vipId" ></el-input>
                </el-form-item>
                <el-form-item label="积分" label-width="120px">
                    <el-input v-model="custInfo[0].points" :disabled="true"></el-input>
                </el-form-item>
                <div class="member-info-btns">
                    <el-button type="primary" plain size="small" @click="closeDialog(custInfo[0])">确定</el-button>
                    <el-button type="primary" plain size="small" @click="closeDialog(null)">取消</el-button>
                </div>
                
            </el-form>
        </el-dialog>
        <el-dialog title="新增会员" :visible="newMember[0].points!=''" @close="addMember('close')">
            <el-form :model="newMember[0]">
                <el-form-item label="序号" label-width="120px">
                    <el-input v-model="newMember[0].id" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="客户名称" label-width="120px">
                    <el-input v-model="newMember[0].name"></el-input>
                </el-form-item>
                <el-form-item label="会员编号" label-width="120px">
                    <el-input v-model="newMember[0].vipId" ></el-input>
                </el-form-item>
                <el-form-item label="积分" label-width="120px">
                    <el-input v-model="newMember[0].points" :disabled="true"></el-input>
                </el-form-item>
                <div class="member-info-btns">
                    <el-button type="primary" plain size="small" @click="addMember(newMember[0])">确定</el-button>
                    <el-button type="primary" plain size="small" @click="addMember('close')">取消</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            members:[{
                id:1,
                name:'张三',
                vipId:'A001',
                points:100,
                history:[{
                    id:1,
                    name:'张三',
                    points:'+150',
                    date:'2018-6-4 10:12:12'
                },{
                    id:2,
                    name:'张三',
                    points:'-50',
                    date:'2018-7-2 14:12:12'
                }]
            },{
                id:2,
                name:'李四',
                vipId:'A002',
                points:100,
                history:[{
                    id:1,
                    name:'李四',
                    points:'+100',
                    date:'2018-6-4 10:12:12'
                }]
            }],
            hisData:[],
            custInfo:[{
                id:'',
                name:'',
                vipId:'',
                points:''
            }],
            newMember:[{
                id:'',
                name:'',
                vipId:'',
                points:''
            }]
        }
    },
    methods:{
        showHis:function(data){
            this.hisData=data.history;
        },
        changeMsg:function(data){
            var obj=JSON.parse(JSON.stringify(data));
            this.custInfo=[];
            this.custInfo.push(obj);
        },
        closeDialog:function(data){
            if(data){
                var obj=JSON.parse(JSON.stringify(data));
                var index=0;
                this.members.forEach((o,i)=>{
                    o.id==obj.id&&(index=i);
                });
                this.$set(this.members,index,obj);
            }
            this.hisData=[];
            this.custInfo=[{
                id:'',
                name:'',
                vipId:'',
                points:''
            }];
            
        },
        tableRowClassName:function({row,rowIndex}){
            if(row.points.toString().split("-").length>1){
                return 'warning-row';
            }else{
                return 'success-row';
            }
        },
        addMember:function(data){
            if(data=='add'){
                 this.newMember=[{
                    id:'',
                    name:'',
                    vipId:'',
                    points:'0'
                }];
            }else if(data=='close'){
                 this.newMember=[{
                    id:'',
                    name:'',
                    vipId:'',
                    points:''
                }];
            }else if(data){
                var obj=JSON.parse(JSON.stringify(data));
                this.$set(this.members,this.members.length,obj);
                this.newMember=[{
                    id:'',
                    name:'',
                    vipId:'',
                    points:''
                }];
            }
        }
    }
}
</script>
<style>
.member{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
.member-tabs{
    height: calc(100% - 2px);
}
.member-info-btns{
    text-align: center;
}
.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .member-add{
      margin:10px 0 0 30%;
  }
</style>
