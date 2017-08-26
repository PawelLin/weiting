<template>
    <div class="page">
        <div class="page-title">
            <h2>唯亭</h2>
        </div>
        <div class="page-contain">
            <div class="menu">
                <!-- <a href="javascript:;">菜单</a> -->
                <router-link :class="{'active-menu':activeMenu === item.name}" v-for="(item,index) in menu" :key="item.id" @click.native="addMenu(item)" :to="item.url">{{item.name}}</router-link>
                <!-- <Wsocket></Wsocket> -->
            </div>
            <div class="contain">
                <!-- <div class="menu-list">
                    <a :class="{'active-menu':activeMenu === item.name}" @click="toMenu(item)" v-for="(item,index) in menuList" :key="item.id" href="javascript:;">
                        {{item.name}}
                        <span v-show="menuList.length != 1" @click.stop.prevent="removeMenu(index)">×</span>
                    </a>
                </div> -->
                <div class="menu-contain">
                    <transition :name="transitionName">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import common from 'services/common'
import Wsocket from 'components/wsocket'

export default {
    components:{
        Wsocket
    },
    data () {
        return {
            menu:[],
            menuList:[
            ],
            activeMenu:'',
            transitionName:'slide-down',
            transitionName1: 'fade'
        }
    },
    methods:{
        getMenu(){
            common.getMenu({
                method:'post',
                data:{
                    name: '',
                    url: ''
                }
            }).then(data => {
                this.menu = data.data;
            });
        },
        addMenu(item){
            this.activeMenu = item.name;
            let isRepeat = false;
            if(this.menuList.length > 0){
                this.menuList.forEach(menu => {
                    if(menu.name == item.name){
                        isRepeat = true;
                        return;
                    }
                });
            }
            if(!isRepeat){
                this.menuList.push(item);
            }
            if(this.menuList.length == 1){
                this.activeMenu = this.menuList[0].name;
            }
        },
        removeMenu(index){
            this.menuList.splice(index,1);
            if(this.menuList.length == 1){
                this.activeMenu = this.menuList[0].name;
                this.$router.push(this.menuList[0].url);
            }
        },
        toMenu(item){
            this.activeMenu = item.name;
            this.$router.push(item.url);
        }
    },
    mounted(){
        this.getMenu();
    },
    watch: {
        // '$route' (to, from) {
        //  if(this.menuList.length <= 1){
        //      this.transitionName = 'slide-top';
        //  }
        //  else{
        //      const theMenu = [];
          //        this.menuList.forEach(item => {
          //            theMenu.push(item.url);
          //        });
          //    const toIndex = theMenu.indexOf(to.path);
          //    const fromIndex = theMenu.indexOf(from.path);
          //    this.transitionName = toIndex > fromIndex ? 'slide-top' : 'slide-down';
        //  }
        // }
    }
}
</script>

<style lang="scss">
.page{
    height:100%;
}
.page-title{
    height:50px;
    border-bottom:1px solid #fff;
    padding:10px;
}
.page-contain{
    height:calc(100% - 50px);
}
.menu{
    width:200px;
    border-right:1px solid #fff;
    height:100%;
    float:left;
    position:relative;
}
.menu > a{
    display:inline-block;
    width:100%;
    text-decoration: none;
    color:#000;
    font-size:20px;
    text-align: center;
    line-height:50px;
    border-bottom:1px solid #fff;
    height:50px;
}
.menu > a:hover{
    background-color:#fff;
}
.contain{
    width:calc(100% - 200px);
    height:100%;
    float:left;
}
.menu-list{
    height:50px;
    line-height:50px;
    font-size:18px;
    border-bottom:1px solid #fff;
}
.menu-list > a{
    position:relative;
    display:inline-block;
    height:50px;
    border-right:1px solid #fff;
    padding:0 20px 0 10px;
    color:#000;
    position:relative;
}
.menu-list > a > span{
    cursor:pointer;
    position:absolute;
    top:1px;
    right:4px;
}
.menu-contain{
    height:100%;
    overflow-y:hidden;
    overflow-x:hidden;
}
.active-menu{
    background-color:#fff;
}
.slide-left-enter-active, .slide-left-leave-active {
    transition: transform .3s ease-in-out;
    transform: translateX(100%);
}
.slide-left-enter, .slide-left-leave-active {
    transform: translateX(-100%);
}
.slide-right-enter-active, .slide-right-leave-active {
    transition: transform .3s ease-in-out;
    transform: translateX(-100%);
}
.slide-right-enter, .slide-right-leave-active {
    transform: translateX(100%);
}
.slide-top-enter-active, .slide-top-leave-active {
    transition: transform .3s ease-in-out;
    transform: translateY(100%);
}
.slide-top-enter, .slide-top-leave-active {
    transform: translateY(-100%);
}
.slide-down-enter-active, .slide-down-leave-active {
    transition: transform .3s ease-in-out;
    transform: translateY(-100%);
}
.slide-down-enter, .slide-down-leave-active {
    transform: translateY(100%);
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-active {
    opacity: 0
}
</style>
