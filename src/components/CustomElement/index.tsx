import { defineCustomElement } from 'vue'

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
      font-size: 24px;
    }
    `
  ],
  setup(props, { emit }) {
    const handleClick = (event: Event) => {
      emit('message', event)
    }

    return () => (
      <button class="btn" onClick={handleClick}>
        {props.msg}
      </button>
    )
  }
})

// 注册自定义元素.
// 注册后，页面上所有的 `<my-vue-element>` 标签都会更新
customElements.define('my-vue-element', MyVueElement)
