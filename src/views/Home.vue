<template>
  <div class="home">
    <img src="../assets/icon.png" alt="林大课表LOGO" id="logo" />
    <br /><strong id="app_name">林大课表</strong>
    <div id="app_code">{{ AppCode }}</div>
    <div id="app_info">{{ AppSize }} / 42815下载 / 简体中文</div>

    <el-button-group id="app_download">
      <el-button type="success" icon="el-icon-mobile" @click="downloadApk"
        >安卓下载</el-button
      >
      <el-button type="warning" icon="el-icon-apple" disabled
        >IOS下载</el-button
      >
      <el-button type="danger" icon="el-icon-menu" disabled>小程序</el-button>
    </el-button-group>
    <div id="app_img_box">
      <div id="app_img">
        <el-carousel :interval="4000" type="card" height="400px">
          <el-carousel-item v-for="item in 6" :key="item">
            <img width="80%" :src="appImgs[item - 1]" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <div
      id="lv-container"
      data-id="city"
      data-uid="MTAyMC81MjYxNS8yOTA5Mw=="
    ></div>

    <span id="busuanzi_container_site_pv"
      >本站总访问量<span id="busuanzi_value_site_pv"></span>次</span
    >
    <div class="bg-bottom">
      <div
        style="text-align:center;font-size:14px;color:#BDBDBD;margin-top:10px;"
        click="window.location.href='https://lkdxka.com';"
      >
        Copyight © 2019-2021 觅漾工作室技术部 All Rights Reserved.
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";

function loadJS(url, callback) {
  var script = document.createElement("script"),
    fn = callback || function() {};

  script.type = "text/javascript";

  //IE

  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;

        fn();
      }
    };
  } else {
    //其他浏览器

    script.onload = function() {
      fn();
    };
  }

  script.src = url;

  document.getElementsByTagName("head")[0].appendChild(script);
}

export default {
  data() {
    return {
      appImgs: [
        "//ldkb.nixiaobai.com/demo/demo1.jpg",
        "//ldkb.nixiaobai.com/demo/demo2.jpg",
        "//ldkb.nixiaobai.com/demo/demo3.jpg",
        "//ldkb.nixiaobai.com/demo/demo4.jpg",
        "//ldkb.nixiaobai.com/demo/demo5.jpg",
        "//ldkb.nixiaobai.com/demo/demo6.jpg"
      ]
    };
  },
  methods: {
    downloadApk: function() {
      const elemIF = document.createElement("iframe");
      elemIF.src = this.DownloadUrl;
      elemIF.style.display = "none";
      document.body.appendChild(elemIF);
    }
  },
  beforeMount() {
    // (function(d, s) {
    //   var j,
    //     e = d.getElementsByTagName(s)[0];

    //   if (typeof LivereTower === "function") {
    //     return;
    //   }

    //   j = d.createElement(s);
    //   j.src = "https://cdn-city.livere.com/js/embed.dist.js";
    //   j.async = true;

    //   e.parentNode.insertBefore(j, e);
    // })(document, "script");

    loadJS("//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js");
    loadJS("https://cdn-city.livere.com/js/embed.dist.js")
  },

  computed: {
    AppCode: function() {
      return store.state.updateInfo.VERSION;
    },
    AppSize: function() {
      return store.state.updateInfo.SIZE;
    },
    DownloadUrl: function() {
      return store.state.updateInfo.URL;
    }
  }
};
</script>

<style scoped>
#home {
  text-align: center;
}
#logo {
  height: 80px;
  width: 80px;
}
#app_name {
  color: #000000;
  margin-top: 8px;
}
#app_code {
  color: #757575;
  margin-top: 8px;
  font-size: 15px;
}
#app_info {
  color: #757575;
  margin-top: 10px;
  font-size: 13px;
}
#app_download {
  margin-top: 10px;
}
#app_img {
  width: 500px;
  margin: 20px;
  height: 400px;
}
#app_img_box {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
}
</style>
