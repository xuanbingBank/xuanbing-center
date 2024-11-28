/**
 * @description 递归菜单项组件
 */
import { defineComponent, PropType, h } from 'vue'
import { ElSubMenu, ElMenuItem, ElIcon } from 'element-plus'
import type { MenuItem } from '@/types/menu'

const RecursiveMenuItem = defineComponent({
  name: 'RecursiveMenuItem',
  props: {
    menuItem: {
      type: Object as PropType<MenuItem>,
      required: true
    }
  },
  setup(props) {
    /**
     * @description 渲染图标
     */
    const renderIcon = () => {
      const icon = props.menuItem.meta?.icon
      if (icon) {
        return h(ElIcon, null, {
          default: () => h(icon)
        })
      }
      return null
    }

    /**
     * @description 渲染标题
     */
    const renderTitle = () => {
      const title = props.menuItem.meta?.title || ''
      return [
        renderIcon(),
        h('span', title)
      ]
    }

    return () => {
      const children = props.menuItem.children
      if (children?.length) {
        return h(
          ElSubMenu,
          { 
            index: props.menuItem.path,
            popperClass: 'side-menu-popper'
          },
          {
            title: () => renderTitle(),
            default: () => children.map(child => 
              h(RecursiveMenuItem, {
                key: child.path,
                menuItem: child
              })
            )
          }
        )
      }

      return h(
        ElMenuItem,
        { index: props.menuItem.path },
        {
          default: () => renderTitle()
        }
      )
    }
  }
})

export default RecursiveMenuItem 