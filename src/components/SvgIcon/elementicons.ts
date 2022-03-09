import * as components from '@element-plus/icons-vue'
import { App } from 'vue'

export default {
  install: (app: App<Element>) => {
    for (const key in components) {
      const componentConfig = components[key as keyof typeof components]
      app.component(componentConfig.name, componentConfig)
    }
  }
}
