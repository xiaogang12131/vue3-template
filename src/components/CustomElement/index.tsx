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
      min-height: 32px;
      padding: 9px 15px;
      outline: none;
      border: none;
      -webkit-appearance: none;
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
