// import something here
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { Quill } from 'vue-quill-editor'
import { ImageExtend } from 'quill-image-extend-module'

Quill.register('modules/ImageExtend', ImageExtend)

export default ({ app, router, Vue }) => {
  Vue.use(VueQuillEditor, {
    placeholder: '请输入内容'
  })
}
