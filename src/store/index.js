import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    updateInfo: {},
    classTableJson: {},
    openDate: "2021-03-01",
    roomList: [],
    teacherList: [],
    subjectList: [],
    courseList: [],
    colorObject: {},
    classHistory:{
      value_year: "",
      value_subject: "",
      value_class: "",
    }

  },
  mutations: {
    CleanAll(state){
        state.classTableJson={}
        state.colorObject={}
        state.classHistory={
            value_year: "",
            value_subject: "",
            value_class: "",
          }
    },
    ChangeUpdateInfo(state, data) {
      state.updateInfo = data;
    },
    ChangeclassTableJson(state, data) {
      state.classTableJson = data;
    },
    ChangeOpenDate(state, data) {
      state.openDate = data;
    },
    UpdateRoomList(state, data) {
      state.roomList = data;
    },
    UpdateTeacherList(state, data) {
      state.teacherList = data;
    },
    UpdateSubjectList(state, data) {
      state.subjectList = data;
    },
    UpdateCourseList(state, data) {
      state.courseList = data;
    },
    UpdateColorObject(state, data) {
      state.colorObject[data[0]] = data[1];
    },
    CleanColorObject(state) {
        state.colorObject = {};
    },
    UpdateClassHistory(state, data) {
      state.classHistory = {
        value_year: data[0],
        value_subject: data[1],
        value_class: data[2],
      }
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()] 
});
