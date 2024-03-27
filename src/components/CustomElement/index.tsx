import App from '@/App.vue'
import { defineCustomElement, createApp } from 'vue'

createApp(App).component('test-btn', {
  template: '<button>test</button>'
})

const MyVueElement = defineCustomElement({
  props: {
    msg: String,
    selected: Boolean,
    index: Number
  },
  emits: ['message'],
  styles: [
    `
    .btn {
      position: relative;
      min-height: 32px;
      padding: 9px 15px;
      outline: none;
      border: none;
      -webkit-appearance: none;
    }
    .test {
      position: fixed;
      right: 0;
      bottom: 0;
    }
    `
  ],
  setup(props, { emit }) {
    const handleClick = (event: Event) => {
      emit('message', event)
    }

    return () => (
      <div>
        <div>ceshi </div>
        <test-btn />
        <button class="btn" onClick={handleClick}>
          {props.msg}
          <span class="test">测试</span>
        </button>
      </div>
    )
  }
})

// 注册自定义元素.
// 注册后，页面上所有的 `<my-vue-element>` 标签都会更新
customElements.define('my-vue-element', MyVueElement)
