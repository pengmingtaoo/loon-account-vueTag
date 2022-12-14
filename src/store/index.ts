import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import {types} from 'sass';
import Error = types.Error;
import {defaultExpenseTags} from '@/constants/defaulsTags';
import idCreator from '@/lib/idCreator';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    tagList:  [],
    recordList: JSON.parse(window.localStorage.getItem("recordList") || "[]"),
    createRecordError: null,
    createTagError: null,
    currentRecord: undefined,
    currentTag: undefined,
  } as RootState,

  mutations: {
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
        if (!state.tagList || state.tagList.length === 0) {
          store.commit('insertTag',  {name:'other',value:'其他'});
          store.commit('insertTag',  {name: 'shop', value: '购物'});
          store.commit('insertTag',  {name:'food',value:'饮食'});
          store.commit('insertTag',  {name: 'house', value: '居住'});
          store.commit('insertTag',  {name: 'transport', value: '交通'});
      }

    },
    setCurrentTag(state, id: number) {
      //找到路由ID
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
    insertTag: function (state, tag: Tag) {
      //传入的参数为tag类型，
      const names = state.tagList.map((item) => item.name);
      if (names.indexOf(tag.name) >= 0) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        state.createTagError = new Error("duplicated");
        return; //插入的标签如果重名，则返回
      }
      tag.id = idCreator();
      const deepClone = clone(tag);
      state.tagList.push(deepClone);
      store.commit("saveTags");
    },
    removeTag(state, id:number) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit("saveTags");
      } else {
        window.alert("删除失败");
      }
    },

    saveTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },

    setCurrentRecord(state, id: number) {
      //找到路由ID
      state.currentRecord = state.recordList.filter((t) => t.id === id)[0];
    },

    createRecord(state, record: RecordItem) {
      record.id = idCreator();
      //深拷贝
      const deepClone = clone(record);
      deepClone.createdDate = new Date();
      state.recordList.push(deepClone); //更新数据
      store.commit("saveRecords");
    },

    updateRecord(state, { id, record }: { id: number; record: RecordItem }) {
      for (let index = 0; index < state.recordList.length; index++) {
        if (state.recordList[index].id === id) {
          state.recordList[index] = record;
          break;
        }
      }
      store.commit("saveRecords");
    },

    removeRecord(state, id: number) {
      let index = -1;
      for (let i = 0; i < state.recordList.length; i++) {
        if (state.recordList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.recordList.splice(index, 1);
        store.commit("saveRecords");
      } else {
        window.alert("删除失败");
      }
    },

    saveRecords(state) {
      window.localStorage.setItem(
        "recordList",
        JSON.stringify(state.recordList)
      );
    },
  },
});
export default store;