<template>
  	<div class="table">
    	<table width="100%" cellpadding="0" cellspacing="0">
    		<thead>
    			<th v-for="item in tableTitle">{{item}}</th>
                <th v-if="hasOperate">操作</th>
    		</thead>
    		<tbody>
    			<tr v-for="(item,index) in tableData">
    				<td v-for="ite in tableType">
                        <Winput v-if="item.btnType" v-model="item[ite]" :value="item[ite]"></Winput>
                        <span v-if="!item.btnType">{{item[ite]}}</span>
    				</td>
                    <td v-if="hasOperate">
                        <Wbutton @search="btnEvent(it,item)" v-show="!item.btnType" v-for="it in tableButton" :key="it" :value="btnType[it]"></Wbutton>
                        <Wbutton v-show="item.btnType" @search="btnEvent('complete',item)" value="完成"></Wbutton>
                        <Wbutton v-show="item.btnType" @search="btnEvent('cancel',item)" value="取消"></Wbutton>
                    </td>
    			</tr>
    		</tbody>
    	</table>
  	</div>
</template>

<script>

import Wbutton from 'components/wbutton'
import Winput from 'components/winput'

export default {
    components:{
        Wbutton,
        Winput
    },
	props:{
		tableTitle:Array,
		tableData:Array,
		tableType:Array,
        tableButton:Array,
        hasOperate:Boolean
	},
  	data () {
    	return {
      		msg: 'Welcome to Your Vue.js App',
            btnType: {
                delete: '删除',
                update: '编辑',
                detail: '详情',
                complete: '完成'
            }
    	}
  	},
    methods:{
        btnEvent(type,item){
            if(type == 'delete'){
                this.$emit(type, item._id);
            }
            else if(type == 'update'){
                item.btnType = true;
            }
            else if(type == 'complete'){
                this.$emit(type, item)
            }
            else if(type == 'cancel'){
                item.btnType = false;
            }
            this.$forceUpdate();
        }
    }
}
</script>

<style lang="scss">
.table{
}
.table>table{
	border-collapse:collapse;
}
.table>table th{
	padding:10px;
	border:1px solid #fff;
}
.table>table td{
	padding:10px;
	border:1px solid #fff;
}
.table>table>tbody>tr:hover{
}
</style>
