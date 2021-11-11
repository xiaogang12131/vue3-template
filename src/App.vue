<template>
  <el-container>
    <el-aside width="200px">
      <el-menu :default-openeds="['/']" default-active="/" router>
        <el-sub-menu index="/">
          <template #title>
            <el-icon><icon-menu /></el-icon>Menu
          </template>
          <el-menu-item index="/">Home</el-menu-item>
          <el-menu-item index="/custom-element">CustomElement</el-menu-item>
          <el-menu-item index="/spread-sheet">SpreedSheet</el-menu-item>
          <el-menu-item index="/virtual-data">VirtualData</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-dropdown>
          <el-icon><setting /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>View</el-dropdown-item>
              <el-dropdown-item>Add</el-dropdown-item>
              <el-dropdown-item>Delete</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, computed, watch, watchEffect, onMounted } from 'vue'
import { useStore } from 'store'
import { getTableData } from 'api/table'
import { Menu, Setting } from '@element-plus/icons'

export default defineComponent({
  components: {
    Setting,
    'icon-menu': Menu
  },
  setup() {
    const store = useStore()
    const token = computed(() => store.state.user.token)

    const laodTableData = async () => {
      await getTableData()
    }

    // watch | watchEffect
    watch(token, (token, prevToken) => {
      console.log(token, prevToken)
    })
    watchEffect(() => {
      console.log(token.value)
    })

    onMounted(() => {
      laodTableData()
    })
  }
})
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  .el-menu {
    height: 100%;
  }
  .el-header {
    height: 40px;
    line-height: 40px;
    text-align: right;
  }
}
.wrapper {
  height: 100%;
  .nav {
    line-height: 40px;
  }
  .container {
    height: calc(100% - 40px);
    padding: 20px;
  }
}
</style>
