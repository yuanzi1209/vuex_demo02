<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      :value="inputValue"
      @change="handleInputChange"
    />
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="showDiffList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @change="
            (e) => {
              cbStatusChanged(e, item.id)
            }
          "
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ unDoneLength }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button
            :type="viewKey === 'all' ? 'primary' : 'default'"
            @click="changeList('all')"
            >全部</a-button
          >
          <a-button
            @click="changeList('undone')"
            :type="viewKey === 'undone' ? 'primary' : 'default'"
            >>未完成</a-button
          >
          <a-button
            @click="changeList('done')"
            :type="viewKey === 'done' ? 'primary' : 'default'"
            >>已完成</a-button
          >
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'app',
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['list', 'inputValue', 'viewKey']),
    ...mapGetters(['unDoneLength', 'showDiffList']),
  },
  methods: {
    handleInputChange(e) {
      // console.log(e.target.value)
      this.$store.commit('setInputVal', e.target.value)
    },
    addItemToList() {
      if (!this.inputValue.length) {
        return this.$message.warning('文本框不能为空！')
      }
      this.$store.commit('addItem')
    },
    removeItemById(id) {
      // console.log(id)
      const index = this.list.findIndex((item) => item.id === id)
      // console.log(index)
      this.$store.commit('removeItem', index)
    },
    /* 监听复选框的change事件 */
    cbStatusChanged(e, id) {
      // console.log(e.target.checked)
      const index = this.list.findIndex((item) => item.id === id)

      // 思考：只能传一个参数？
      // this.$store.commit('checkoutDone', e.target.checked, index)

      const params = {
        i: index,
        done: e.target.checked,
      }
      this.$store.commit('checkoutDone', params)
    },
    clean() {
      this.$store.commit('cleanDone')
    },
    changeList(key) {
      // console.log(key)
      this.$store.commit('changeViewKey', key)
    },
  },
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
