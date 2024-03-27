<template>
  <div class="comment">
    <el-tag
      v-for="(item, index) in tagList"
      :key="index"
      @click="handleTag(item)"
    >
      {{ item }}
    </el-tag>
    <rich-textarea ref="textareaRef" />
    <div v-show="dropdownVisible" class="comment-dropdown">
      <div
        v-for="item in 5"
        :key="item"
        class="comment-dropdown-item"
        @click="changeDropDown(item)"
      >
        选项{{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import RichTextarea from '@/components/RichTextarea.vue'

const textareaRef = ref()
const tagList = ref(['维度', '指标', '测试文本'])
const tagRef = ref()
const dropdownVisible = ref(false)

const initTagEvent = (tag: HTMLElement) => {
  tag.addEventListener('click', e => {
    e.stopPropagation()
    const target = e.target as HTMLElement
    const position = target.getBoundingClientRect()
    const dropdown = document.querySelector('.comment-dropdown') as HTMLElement
    if (dropdown) {
      dropdown.style.position = 'fixed'
      dropdown.style.left = position.left + 'px'
      dropdown.style.top = position.bottom + 10 + 'px'
      dropdown.style.zIndex = '999'
    }
    const isTag = target.classList.contains('tag-text')
    tagRef.value = isTag ? target : target.querySelector('.tag-text')
    dropdownVisible.value = true
  })
}

const handleTag = (val: string) => {
  const tag = document.createElement('span')
  tag.setAttribute('contenteditable', 'false')
  tag.className = 'custom-tag'
  tag.innerHTML =
    '<span class="tag-content"><span class="tag-text">' + val + '</span></span>'
  // const tag =
  //   '<span class="custom-tag" contentEditable="false">' +
  //   '<span class="tag-content"><span class="tag-text">' +
  //   val +
  //   '</span></span></span>'
  // const tag = `<input class="custom-tag" type="button" value="${val}"/>`
  textareaRef.value?.insertTag(tag)
  initTagEvent(tag)
}

const changeDropDown = (val: number) => {
  tagRef.value.innerHTML = '选项' + val
  dropdownVisible.value = false
}

onMounted(() => {
  window.addEventListener('click', () => {
    dropdownVisible.value = false
  })
})
</script>

<style lang="less">
.comment {
  .el-tag {
    margin: 0 10px 10px 0;
  }

  // .custom-tag {
  //   font-size: 14px;
  //   line-height: 24px;
  //   border: none;
  //   border-radius: 4px;
  //   background: #4c84ff26;
  //   padding: 0 8px;
  //   margin: 0 2px;
  // }

  .custom-tag {
    font-size: 13px;
    margin: 0 2px;

    .tag-content {
      padding: 4px 0;
      border-radius: 4px;
      background: #4c84ff26;
    }

    .tag-text {
      padding: 0 8px;
    }
  }

  &-dropdown {
    min-width: 100px;
    height: auto;
    max-height: 200px;
    padding: 10px 0;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    overflow: auto;

    &-item {
      padding: 0 10px;
      line-height: 30px;
      cursor: pointer;

      &:hover {
        background: #4c84ff26;
      }
    }
  }
}
</style>
