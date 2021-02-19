<template>
  <div id="app">
    <div id="nav"
         class="no_print">
      <el-row>
        <el-col :span="4">
          <router-link to="/">
            <div class="menu_li"
                 :class="{ activeClass: isActive == '/' }"
                 @click="isActive = '/'">
              <i class="el-icon-house"></i><span v-if="PCBool">首页</span>
            </div>
          </router-link>
        </el-col>
        <el-col :span="4">
          <router-link to="/ClassTable">
            <div class="menu_li"
                 :class="{ activeClass: isActive == '/ClassTable' }"
                 @click="isActive = '/ClassTable'">
              <i class="el-icon-date"></i><span v-if="PCBool">班级课表</span>
            </div>
          </router-link>
        </el-col>
        <el-col :span="4">
          <router-link to="/Person">
            <div class="menu_li"
                 :class="{ activeClass: isActive == '/Person' }"
                 @click="isActive = '/Person'">
              <i class="el-icon-user"></i><span v-if="PCBool">个人课表</span>
            </div>
          </router-link>
        </el-col>
        <el-col :span="4">
          <router-link to="/Other">
            <div class="menu_li"
                 :class="{ activeClass: isActive == '/Other' }"
                 @click="isActive = '/Other'">
              <i class="el-icon-attract"></i><span v-if="PCBool">扩展功能</span>
            </div>
          </router-link>
        </el-col>
        <el-col :span="4">
          <router-link to="/About">
            <div class="menu_li"
                 :class="{ activeClass: isActive == '/About' }"
                 @click="isActive = '/About'">
              <i class="el-icon-reading"></i><span v-if="PCBool">关于网站</span>
            </div>
          </router-link>
        </el-col>
        <el-col :span="4">
          <el-popconfirm @confirm="openQQ()"
                         confirm-button-text="好的"
                         cancel-button-text="不用了"
                         icon="el-icon-share"
                         icon-color="red"
                         title="加入林大课表聊天群？">
            <div class="menu_li"
                 slot="reference">
              <i class="el-icon-chat-dot-square"></i><span v-if="PCBool">加入Q群</span>
            </div>
          </el-popconfirm>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import store from './store'
export default {
  data() {
    return {
      isActive: '/',
    }
  },
  methods: {
    IsPC() {
      var userAgentInfo = navigator.userAgent
      var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod']
      var flag = true
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false
          break
        }
      }
      return flag
    },
    openQQ() {
      window.open(
        'https://qm.qq.com/cgi-bin/qm/qr?k=dkfzXwCFb8y6b6CpxMIBBvJxBP88NVOK&jump_from=webapi'
      )
    },
    toPath(to) {
      this.$router.push('/home')
    },
  },
  beforeMount() {
    this.isActive = this.$route.path
    //林大课表安卓APP更新日志
    axios
      .get('//ldkb.nixiaobai.com/updata.json')
      .then(function (response) {
        store.commit('ChangeUpdateInfo', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    //林科大开学日期
    axios
      .get('//ldkb-1257334448.file.myqcloud.com/opentime.txt')
      .then(function (response) {
        store.commit('ChangeOpenDate', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    //教师目录

    //
  },

  computed: {
    PCBool: function () {
      return this.IsPC()
    },
  },
}
</script>

<style>
/*包含以下四种的链接*/
a {
  text-decoration: none;
}
/*正常的未被访问过的链接*/
a:link {
  text-decoration: none;
}
/*已经访问过的链接*/
a:visited {
  text-decoration: none;
}
/*鼠标划过(停留)的链接*/
a:hover {
  text-decoration: none;
}
/* 正在点击的链接*/
a:active {
  text-decoration: none;
}
a {
  color: #3c3c3c;
}
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  text-align: center;
  color: #3c3c3c;
}
.menu_li {
  height: 56px;
  line-height: 56px;
}
.menu_li > i {
  margin-right: 2px;
}
.menu_li:hover,
.menu_li:focus {
  outline: none;
  background: #fff0f8;
}
.activeClass {
  outline: none;
  background: #fff0f8;
  color: hotpink;
}
a .activeClass {
  outline: none;
  background: #fff0f8;
  color: hotpink;
}
@media print {
  .no_print {
    display: none;
  }
}
</style>
