<template>
  	<div class="welcome">
        <Winput v-model="name" title="菜单名"></Winput>
        <Winput v-model="url" title="URL"></Winput>
        <Wselect :options="options" v-model="type"></Wselect>
        <Wbutton @search="addMenu" value="新增"></Wbutton>
        <Wbutton @search="getList" value="搜索"></Wbutton>
        <Wtable :has-operate="true" :table-title="tableTitle" :table-data="tableData" :table-type="tableType" :table-button="tableButton" @delete="removeMenu" @complete="updateMenu"></Wtable>
  	</div>
</template>

<script>
import common from 'services/common'
import Wflex from 'components/wflex'
import Wtable from 'components/wtable'
import Winput from 'components/winput'
import Wbutton from 'components/wbutton'
import Wselect from 'components/wselect'
export default {
    components:{
        Wtable,
        Winput,
        Wflex,
        Wbutton,
        Wselect
    },
  	data () {
    	return {
      		msg: '',
            tableTitle: ['菜单名','URL'],
            tableType: ['name','url'],
            tableButton: ['delete','update'],
            tableData: [],
            name: '',
            url: '',
            type: '',
            options:[
                { value: '', desc: '不限' },
                { value: 'vue', desc: 'vue' },
                { value: 'angular', desc: 'angular' }
            ]
    	}
  	},
  	methods:{
        getList(params){
            common.getMenu({
                method:'post',
                data:{
                    name:this.name,
                    url:this.url
                }
            }).then(data => {
                this.tableData = data.data;
            });
        },
        addMenu(){
            common.addMenu({
                method: 'post',
                data:{
                    name: this.name,
                    url: this.url
                }
            }).then(data => {
                alert('新增成功');
                this.getList();
                this.$parent.getMenu();
            });
        },
        updateMenu(item){
            common.updateMenu({
                method: 'post',
                data:{
                    _id: item._id,
                    name: item.name,
                    url: item.url
                }
            }).then(data => {
                alert('更新成功');
                this.getList();
                this.$parent.getMenu();
            })
        },
        removeMenu(id){
            common.removeMenu({
                method: 'post',
                data:{
                    _id: id
                }
            }).then(data => {
                alert('删除成功');
                this.getList();
                this.$parent.getMenu();
            });
        }
  	},
  	mounted(){
        this.getList();
  	}
}
</script>

<style lang="scss">
.welcome{
    height:100%;
    padding:10px;
}
</style>
