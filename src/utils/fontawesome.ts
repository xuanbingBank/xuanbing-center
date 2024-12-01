/**
 * @description Font Awesome 图标配置
 */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faWindowMinimize,
  faWindowMaximize,
  faXmark
} from '@fortawesome/free-solid-svg-icons'

// 添加图标到库中
library.add(
  faWindowMinimize,
  faWindowMaximize,
  faXmark
)

export { FontAwesomeIcon } 