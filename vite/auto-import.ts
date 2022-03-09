import autoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

export default function createAutoImport () {
  const elementPlusResolver = ElementPlusResolver()
  const plugin = []
  plugin.push(
    autoImport({
      imports: [
        'vue',
        'vue-router',
        {
          lodash: [
            // default imports
            ['default', '_']
          ]
        }
        // {
        //   vuex: ['useStore']
        // }
      ],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      resolvers: [elementPlusResolver]
      // dts: false
    })
  )
  plugin.push(
    Components({
      resolvers: [elementPlusResolver]
    })
  )
  plugin.push(ElementPlus())// 解决 elmessage 无样式
  return plugin
}
