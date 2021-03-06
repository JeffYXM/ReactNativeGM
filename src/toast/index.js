import React from 'react'
import PropTypes from 'prop-types'
import { View, ActivityIndicator } from 'react-native'
import Icon from '../ifont'
import LayerRoot from '../layer_root'
import Text from '../text'
import S from '../styles'

const renderIcon = (icon) => {
  if (icon === 'loading') {
    return <ActivityIndicator color='#fff' style={[S.marginRight5]}/>
  }

  return <Icon name={icon} style={[S.marginRight5, S.textWhite]}/>
}

// TODO 补充动画
class Toast extends React.Component {
  render () {
    const {
      icon,
      children
    } = this.props

    return (
      <View style={[S.flexAlignCenter, S.flexJustifyCenter, {
        position: 'absolute',
        bottom: 100,
        left: 0,
        right: 0
      }]}>
        <View style={[S.flexRow, S.flexAlignCenter, {
          padding: 10,
          paddingHorizontal: 20,
          marginHorizontal: 20,
          borderRadius: 5,
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }]}>
          {icon && renderIcon(icon)}
          <Text style={[S.textWhite]}>{children}</Text>
        </View>
      </View>
    )
  }
}

const processOptions = (options = {}) => {
  if (typeof options === 'string') {
    options = {
      children: options
    }
  }
  return options
}

let timer = null

// 静态方法支持time参数。 false 或者 数字
Object.assign(Toast, {
  clear () {
    LayerRoot.removeComponent(LayerRoot.TYPE.TOAST)
  },
  tip (options, icon) {
    clearTimeout(timer)
    options = processOptions(options)
    LayerRoot.setComponent(LayerRoot.TYPE.TOAST, <Toast icon={icon} {...options}/>)
    if (options.time !== false && options.time !== 0) {
      timer = setTimeout(() => {
        LayerRoot.removeComponent(LayerRoot.TYPE.TOAST)
      }, options.time || 2000)
    }
  },
  success (options) {
    Toast.tip(options, 'success')
  },
  info (options) {
    Toast.tip(options, 'info-circle')
  },
  warning (options) {
    Toast.tip(options, 'warning')
  },
  danger (options) {
    Toast.tip(options, 'close')
  },
  loading (options) {
    options = processOptions(options)
    Toast.tip(Object.assign({ children: '加载中...' }, options), 'loading')
  }
})

Toast.propTypes = {
  icon: PropTypes.string, // iconfont 的图标名字
  children: PropTypes.node
}

export default Toast
