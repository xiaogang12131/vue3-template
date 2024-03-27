<template>
  <div class="rich-textarea">
    <div class="textarea" ref="textareaRef" contenteditable="true"></div>
    <div class="operation">
      <span class="emoji-txt" @click="emojiShow = !emojiShow">表情</span>
    </div>
    <div class="emoji" v-show="emojiShow">
      <div class="emoji-content">
        <img
          v-for="(item, key) in 130"
          :key="key"
          @click="insertEmoji(item)"
          :src="`https://cdn.sunofbeaches.com/emoji/${item}.png`"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineExpose, onMounted } from 'vue'

const textareaRef = ref<HTMLDivElement | null>(null)
const lastEditRange = ref<Range | null>(null)
const emojiShow = ref(false)

const getTextContent = () => {
  const textarea = textareaRef.value as HTMLElement
  if (textarea.innerHTML === '<br>') {
    return ''
  }
  return textarea.innerHTML
}

// 插入内容
const insertHtml = (html: string | HTMLElement) => {
  const el = document.createElement('div')
  if (typeof html === 'string') {
    el.innerHTML = html
  } else {
    el.appendChild(html)
  }
  const node = el.children[0] as HTMLElement
  const textarea = textareaRef.value as HTMLElement
  const selection = window.getSelection() as Selection
  if (lastEditRange.value) {
    // 添加最后记录的光标，以还原之前选区
    selection.removeAllRanges()
    selection.addRange(lastEditRange.value)
    if (node) {
      const range = selection.getRangeAt(0)
      range.insertNode(node)
      range.setStartAfter(node)
      range.collapse(true)
      // 清除选区，添加光标
      selection.removeAllRanges()
      selection.addRange(range)
    }
    lastEditRange.value = selection.getRangeAt(0)
  } else {
    textarea.appendChild(node)
    // 使用选取对象，选取可编辑div中的所有子节点
    selection.selectAllChildren(textarea)
    // 合并到最后面，即实现了添加一个表情后，把光标移到最后面
    selection.collapseToEnd()
  }
  return node
}

const insertSpace = () => {
  const node = document.createElement('span')
  node.innerHTML = '&#x200B;'
  node.className = 'space'
  insertHtml(node)
  return node
}

const insertTag = (html: string | HTMLElement) => {
  const content = getTextContent()
  const range = lastEditRange.value
  const container = range?.commonAncestorContainer
  const parentElement = container?.parentElement
  const isStart = range?.startOffset === 0
  const isSpace = !!parentElement?.classList.contains('space')
  if (content === '' || (isStart && isSpace)) {
    insertSpace()
  }
  insertHtml(html)
  const newSpace = insertSpace()
  if (isStart && isSpace) {
    newSpace.nextSibling?.remove()
  }
}

const insertEmoji = (val: number) => {
  const img = document.createElement('img')
  img.src = `https://cdn.sunofbeaches.com/emoji/${val}.png`
  insertHtml(img)
}

onMounted(() => {
  document.querySelector('.custom-tag')?.addEventListener('click', () => {
    textareaRef.value?.blur()
  })

  // 监听光标变化
  document.addEventListener('selectionchange', () => {
    let selection = window.getSelection() as Selection
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const container = range.commonAncestorContainer
      const parentElement = container.parentElement
      const rootElement = document.querySelector('.textarea') as HTMLElement
      const isTag = !!parentElement?.classList.contains('tag-text')
      if (rootElement.contains(container) && !isTag) {
        lastEditRange.value = range
      }
    }
  })

  // textareaRef.value?.addEventListener('keydown', e => {
  //   if (e.key === 'Backspace') {
  //     // 在这里执行需要的操作
  //     const selection = window.getSelection() as any
  //     const range = selection.getRangeAt(0)
  //     const isTag =
  //       selection.anchorNode.parentElement?.className === 'custom-tag'
  //     if (isTag) {
  //       textareaRef.value?.removeChild(selection.anchorNode.parentElement)
  //       e.preventDefault()
  //     }
  //   }
  // })
})

defineExpose({
  textarea: textareaRef,
  insertEmoji,
  insertHtml,
  insertSpace,
  insertTag
})
</script>

<style lang="less">
.rich-textarea {
  background-color: #fff;

  .textarea {
    height: 120px;
    font-size: 16px;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    outline: none;
    padding: 10px;
    overflow-y: scroll;

    &:focus {
      border: 1px solid red;
    }

    img {
      width: 20px;
      height: 20px;
      vertical-align: bottom;
      margin: 2px;
    }
  }

  .operation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 5px;
    line-height: 20px;
    height: 30px;

    .emoji-txt {
      color: #4485f9;
      cursor: pointer;
    }

    .emoji-btn {
      background-color: #4485f9;
      cursor: pointer;
      padding: 0px 10px;
      color: #fff;
      height: 100%;
      line-height: 28px;
      border-radius: 5px;
    }
  }

  .emoji {
    background-color: #fff;
    height: 200px;
    border-radius: 5px;
    padding: 5px;
    overflow-y: auto;
    margin-top: 14px;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.028);

    &-content {
      img {
        cursor: pointer;
        width: 40px;
        margin: 2px;
        padding: 9px;
        border-radius: 8px;
        vertical-align: bottom;
        transition: all 0.28s;

        &:hover {
          transform: scale(1.2);
        }

        &:hover {
          background-color: #eaeaea;
        }
      }
    }
  }

  .space {
    line-height: 18px;
    // background: yellow;
  }
}
</style>
