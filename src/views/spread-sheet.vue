<template>
  <div class="spread">
    <div class="spread-header">
      <el-upload
        class="upload-demo"
        action=""
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleChange"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <div class="spread-body">
      <div ref="spreadSheet" class="spread-sheet"></div>
      <div ref="spreadBar" class="spread-bar"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css'
import GC from '@grapecity/spread-sheets'
import * as ExcelIO from '@grapecity/spread-excelio'
import '@grapecity/spread-sheets-resources-zh'
GC.Spread.Common.CultureManager.culture('zh-cn')

export default defineComponent({
  name: 'SpreadSheet',
  props: {},
  setup() {
    let spread, excelIO
    const spreadBar = ref()
    const spreadSheet = ref()

    const initSpreadSheets = () => {
      spread = new GC.Spread.Sheets.Workbook(spreadSheet.value)
      excelIO = new ExcelIO.IO()
      initStatusBar()
      initSpreadEvents()
    }

    // 初始化缩放条
    const initStatusBar = () => {
      const statusBar = new GC.Spread.Sheets.StatusBar.StatusBar(
        spreadBar.value
      )
      statusBar.bind(spread)
    }

    // 初始化事件
    const initSpreadEvents = () => {
      spread.bind(GC.Spread.Sheets.Events.ActiveSheetChanged, () => {
        setSpreadProject()
      })
    }

    const setSpreadProject = () => {
      const sheet = spread.getActiveSheet()
      sheet.options.isProtected = true
    }

    const handleChange = file => {
      excelIO.open(file.raw, spreadJSON => {
        if (spread) {
          spread.fromJSON(spreadJSON)
          setSpreadProject()
        }
      })
    }

    onMounted(() => {
      initSpreadSheets()
    })

    return {
      spreadBar,
      spreadSheet,
      handleChange
    }
  }
})
</script>

<style lang="scss" scoped>
.spread {
  display: flex;
  flex-direction: column;
  height: 100%;
  &-body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  &-sheet {
    flex: 1;
  }
  &-bar {
    height: 28px;
  }
}
</style>
