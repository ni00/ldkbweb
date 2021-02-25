<template>
  <div class="classtable" id="bn_input">
    <div class="no_print">
      <el-select id="input_year" v-model="value_year" placeholder="请选择年级">
        <el-option
          v-for="item in [2017, 2018, 2019, 2020]"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-select
        id="input_subject"
        filterable
        v-model="value_subject"
        placeholder="请选择专业"
      >
        <el-option
          v-for="item in subject"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>

      <el-input-number
        id="input_num"
        v-model="value_class"
        :min="1"
        :max="15"
        label="班级序号"
      ></el-input-number
      ><br />
    </div>

    <div id="bn_box" class="no_print">
      <el-button icon="el-icon-search" type="success" @click="getClassTable"
        >查询课表</el-button
      >
      <el-button
        id="download_ics"
        icon="el-icon-bottom"
        type="primary"
        @click="downloadIcs"
        >下载ICS</el-button
      >
      <el-button
        id="download_ics"
        icon="el-icon-printer"
        type="warning"
        onclick="javascript:window.print()"
        >打印课表</el-button
      >
      <el-button
        id="download_ics"
        icon="el-icon-delete"
        type="danger"
        @click="CleanVueX()"
        >清空缓存</el-button
      >
    </div>
    <div>
      <h2 v-if="value_year && value_subject">
        {{ value_year }}{{ value_subject }}{{ value_class }}班
      </h2>
    </div>

    <el-calendar v-model="value_date">
      <div slot="dateCell" slot-scope="{ date }">
        <div>{{ getDay(date) }}</div>

        <div class="schedule_box">
          <li
            class="schedule_cell"
            v-for="(v, i) in showSchedule(date)"
            :key="i"
            @click="showTable(date)"
            v-bind:style="{ background: cellColor(v.course_name) }"
          >
            {{ v.course_name }}
          </li>
        </div>
      </div>
    </el-calendar>
    <el-dialog
      :title="tableTitle"
      :visible.sync="dialogTableVisible"
      width="95%"
    >
      <el-table :data="scheduleData">
        <el-table-column
          property="section"
          label="节次"
          width="50px"
        ></el-table-column>
        <el-table-column
          property="course_name"
          label="课程名称"
        ></el-table-column>
        <el-table-column
          property="class_room"
          label="教学地点"
        ></el-table-column>
        <el-table-column property="teacher" label="教师名称"></el-table-column>
        <el-table-column property="week" label="开课周次"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
import * as dayjs from "dayjs";
import * as isLeapYear from "dayjs/plugin/isLeapYear"; // import plugin
import "dayjs/locale/zh-cn"; // import locale
import md5 from "js-md5";

dayjs.extend(isLeapYear); // use plugin
dayjs.locale("zh-cn"); // use locale

function shuffle(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    var index = parseInt(Math.random() * (len - i));
    var temp = arr[index];
    arr[index] = arr[len - i - 1];
    arr[len - i - 1] = temp;
  }
  return arr;
}

let color_set = [
  "#689f38",
  "#303f9f",
  "#a1887f",
  "#aed581",
  "#ff6f00",
  "#aeea00",
  "#e040fb",
  "#ff5722",
  "#ffc107",
  "#827717",
  "#7986cb",
  "#ffecb3",
  "#006064",
  "#e91e63",
  "#5d4037",
  "#0288d1",
  "#c51162",
  "#7b1fa2",
  "#dd2c00",
  "#9e9e9e",
  "#880e4f",
  "#d32f2f",
  "#4fc3f7",
  "#00b8d4",
  "#4caf50",
  "#455a64",
  "#c8e6c9",
  "#bbdefb",
  "#f57c00",
  "#2196f3",
  "#536dfe",
  "#40c4ff",
  "#d1c4e9",
  "#00796b",
  "#0d47a1",
  "#212121",
  "#cddc39",
  "#b2ebf2",
  "#311b92",
  "#ffab00",
  "#00c853",
  "#ffccbc",
  "#ff5252",
  "#bf360c",
  "#673ab7",
  "#ffab40",
  "#e57373",
  "#f8bbd0",
  "#ba68c8",
  "#6200ea",
  "#4db6ac",
  "#ffb74d",
  "#00bcd4",
  "#fbc02d",
  "#1b5e20",
  "#2962ff",
  "#90a4ae"
];
color_set = shuffle(color_set);
export default {
  data() {
    return {
      tableTitle: "课程详情",
      scheduleData: [],
      dialogTableVisible: false,
      value_date: new Date(),
      value_year: "",
      value_subject: "",
      value_class: "",
      subject: [
        "社会体育指导与管理",
        "会计学",
        "电子信息工程",
        "国际经济与贸易(国际教育实验班)",
        "市场营销",
        "国际商务",
        "旅游管理(国际)",
        "电子科学与技术",
        "土木类",
        "材料类",
        "园林",
        "生物技术",
        "车辆工程",
        "新能源科学与工程",
        "测绘工程",
        "材料化学",
        "法语",
        "粮食工程",
        "工程力学",
        "食品科学与工程类",
        "材料成型及控制工程",
        "土地资源管理",
        "法学",
        "风景园林",
        "信息与计算科学",
        "建筑学",
        "交通运输",
        "农林经济管理",
        "工程管理",
        "林学(陶铸实验班)",
        "金融学类",
        "酒店管理",
        "森林保护",
        "会展经济与管理",
        "日语",
        "计算机科学与技术",
        "林学类",
        "水土保持与荒漠化防治",
        "食品科学与工程",
        "英语",
        "环境生态工程",
        "国际经济与贸易",
        "机械设计制造及其自动化",
        "林产化工",
        "金融学(CFA卓越班)",
        "金融学(中外合作办学)",
        "市场营销(国际)",
        "物流管理",
        "国际旅游班",
        "舞蹈学",
        "音乐表演",
        "建筑类",
        "旅游信息化技术与管理",
        "保险学",
        "城市地下空间工程",
        "木材科学与工程",
        "工业设计",
        "游憩与公园管理",
        "食品质量与安全",
        "人力资源管理",
        "地理信息科学",
        "土木工程",
        "城乡规划",
        "电子信息工程(中外合作办学)",
        "环境工程",
        "旅游管理",
        "金融学",
        "林学",
        "生态学",
        "生物科学类",
        "行政管理",
        "汽车服务工程",
        "产品设计",
        "金融学(CFA)",
        "国际经济与贸易（留学生）",
        "翻译",
        "游憩与公园管理班",
        "能源与动力工程",
        "会计学(中外合作办学)",
        "旅游管理类",
        "应用物理学",
        "材料科学与工程",
        "会计学(ACCA)",
        "高分子材料与工程",
        "林学(中外合作办学)",
        "自动化",
        "环境科学与工程类",
        "俄语",
        "森林工程",
        "化学工程与工艺",
        "园艺",
        "朝鲜语",
        "环境设计",
        "生物工程",
        "软件工程",
        "国际旅游",
        "物流工程",
        "物流管理(国际教育实验班)",
        "会计学(ACCA卓越班)",
        "视觉传达设计",
        "环境科学",
        "通信工程"
      ].sort(function compareFunction(param1, param2) {
        //console.log("param1",param2)
        return param1.localeCompare(param2, "zh-Hans-CN", {
          sensitivity: "accent"
        });
      })
    };
  },
  methods: {
    downloadIcs: function() {
      const that = this;
      if (
        this.value_year &&
        this.value_subject &&
        this.subject.indexOf(this.value_subject) > -1
      ) {
        let classname =
          this.value_year + this.value_subject + this.value_class + "班";
        axios
          .get(`//ldkb-1257334448.file.myqcloud.com/json/${classname}.json`)
          .then(function(response) {
            if (response.data == "404") {
              that.$message.error("服务器未检索到此班级，请确认输入是否正确！");
            } else {
              const elemIF = document.createElement("iframe");
              elemIF.src =
                "https://ldkb-1257334448.file.myqcloud.com/ics/" +
                classname +
                ".ics";
              elemIF.style.display = "none";
              document.body.appendChild(elemIF);
              that.$message({
                message: "恭喜你，下载成功！",
                type: "success"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
            that.$message.error("服务器错误，请联系网站管理员！");
          });
      } else {
        that.$message.error("服务器未检索到此班级，请确认输入是否正确！");
      }
    },
    getClassTable() {
      const that = this;
      if (
        this.value_year &&
        this.value_subject &&
        this.subject.indexOf(this.value_subject) > -1
      ) {
        let classname =
          this.value_year + this.value_subject + this.value_class + "班";
        store.commit("UpdateClassHistory", [
          this.value_year,
          this.value_subject,
          this.value_class
        ]);
        axios
          .get(`//ldkb-1257334448.file.myqcloud.com/json/${classname}.json`)
          .then(function(response) {
            if (response.data == "404") {
              that.$message.error("服务器未检索到此班级，请确认输入是否正确！");
            } else {
              //console.log(response.data);
              store.commit("ChangeclassTableJson", response.data);

              that.$message({
                message: "检索成功！",
                type: "success"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
            that.$message.error("服务器错误，请联系网站管理员！");
          });
      } else {
        that.$message.error("未检索到此班级，请确认输入是否正确！");
      }
    },
    showSchedule(date) {
      let thisday = dayjs(date);
      try {
        return this.getSchedule(thisday);
      } catch (error) {
        console.log(error);
        return "";
      }
    },
    getSchedule(thisday) {
      const data = this.ClassTableJson;
      const cha = dayjs(thisday).diff(dayjs(this.OpenDate), "day") + 1;

      if (cha > 0 && cha < 175) {
        let theday = this.ClassTableJson[this.getWeekDayName(thisday)];

        let cell = [];

        for (let i in theday) {
          if (
            theday[i].week_array.indexOf(String(this.getWeek(thisday))) > -1
          ) {
            cell.push(theday[i]);
          }
        }

        return cell;
      } else {
        return "";
      }
    },
    getDay(thisday) {
      return dayjs(thisday).date();
    },
    getWeek(thisday) {
      return Math.ceil(
        (dayjs(thisday).diff(dayjs(this.OpenDate), "day") + 1) / 7
      );
    },
    getWeekDayName(thisday) {
      const weeks = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      return weeks[dayjs(thisday).day()];
    },
    getTableTitle(thisday) {
      let date = dayjs(thisday).format("YYYY年 M月D日");
      let weeknum = this.getWeek(thisday);
      let weekday = dayjs(thisday).format("dddd");
      this.tableTitle = `${date} 第${weeknum}周 ${weekday}`;
    },
    showTable(data) {
      //console.log(this.getSchedule(data))
      this.scheduleData = this.getSchedule(data);
      this.dialogTableVisible = true;
      this.getTableTitle(data);
    },
    setCellColor(name) {
      let color = color_set.pop();
      store.commit("UpdateColorObject", [name, color]);
    },
    cellColor(name) {
      if (typeof name == "string") {
        if (!store.state.colorObject[md5(name)]) {
          this.setCellColor(md5(name));
        }
        return store.state.colorObject[md5(name)];
      } else {
        return "#FFFFFF";
      }
    },
    CleanVueX() {
      store.commit("CleanAll");
    }
  },
  beforeMount() {
    this.value_year = store.state.classHistory.value_year;
    this.value_subject = store.state.classHistory.value_subject;
    this.value_class = store.state.classHistory.value_class;
  },

  computed: {
    ClassTableJson: function() {
      return store.state.classTableJson;
    },
    OpenDate: function() {
      return store.state.openDate;
    }
  }
};
</script>

<style scoped>
#download_ics {
  margin-left: 10px;
}
.schedule_cell {
  font-size: 12px;
  /* background: green; */
  color: #fffefe;
  display: block; /*内联对象需加*/
  word-break: keep-all; /* 不换行 */
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 内容超出宽度时隐藏超bai出部分的内容 */
  text-overflow: clip; /*溢出时显示省略标记...；需与overflow:hidden;一起使用*/
}
.schedule_box {
  height: 60px;
  overflow: hidden;
}
#bn_box,
#bn_input {
  margin-top: 5px;
}

@media print {
  .no_print {
    display: none;
  }
}
</style>
