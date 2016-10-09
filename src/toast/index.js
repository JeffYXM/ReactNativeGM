import React, {PropTypes} from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Dimensions,
    Platform,
    ProgressBarAndroid,
    ActivityIndicator
} from 'react-native';
import {IFont} from '../icon';
import LayerRoot from '../layer_root';
import G from '../global/variable';

const styles = StyleSheet.create({
    toastWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    toast: {
        // width: V.baseFontSize * 7.6,
        // height: V.baseFontSize * 7.6,
        position: 'absolute',
        top: 180,
        left: 30,
        right: 30,
        padding: 10,
        paddingBottom: 0,
        backgroundColor: 'rgba(40, 40, 40, 0.75)',
        borderRadius: 5
    },
    toastIcon: {
        marginBottom: 10,
        color: '#fff',
        fontSize: G.baseFontSize * 2,
        textAlign: 'center'
    },
    toastContent: {
        marginBottom: 10,
        color: '#fff',
        textAlign: 'center'
    },
    toastLoading: {
        marginTop: 10,
        marginBottom: 10
    }
});

const renderLoading = () => {
    if (Platform.OS === 'ios') {
        return <ActivityIndicator color="#fff" size="large" style={styles.toastLoading}/>;
    }
    return <ProgressBarAndroid color="#fff" styleAttr="Large" style={styles.toastLoading}/>;
};

const renderIcon = (icon) => {
    if (icon === 'loading') {
        return renderLoading();
    }
    if (icon) {
        return <IFont name={icon} style={[styles.toastIcon]}/>;
    }
    return undefined;
};

const Toast = (props) => {
    const {
        icon,
        visible,
        onShow,
        onRequestClose,
        style,
        wrapperStyle,
        textStyle,
        children
    } = props;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onShow={onShow}
            onRequestClose={onRequestClose}
        >
            <View style={[styles.toastWrapper, wrapperStyle]}>
                <View style={[styles.toast, style]}>
                    {renderIcon(icon)}
                    <Text style={[styles.toastContent, textStyle]}>{children}</Text>
                </View>
            </View>
        </Modal>
    );
};

const processOptions = (options)=> {
    if (typeof options === 'string') {
        options = {
            children: options
        };
    }
    return options;
};

let timer = null;

// 静态方法支持time参数。 false 或者 数字
Object.assign(Toast, {
    clear(){
        LayerRoot.removeComponent(LayerRoot.TYPE.TOAST);
    },
    tip(options){
        clearTimeout(timer);
        options = processOptions(options);
        LayerRoot.setComponent(LayerRoot.TYPE.TOAST, <Toast {...options} visible={true}/>);
        if (options.time !== false && options.time !== 0) {
            timer = setTimeout(() => {
                LayerRoot.removeComponent(LayerRoot.TYPE.TOAST);
            }, options.time || 2000);
        }
    },
    success(options){
        options = processOptions(options);
        Toast.tip(Object.assign({icon: 'success'}, options));
    },
    info(options){
        options = processOptions(options);
        Toast.tip(Object.assign({icon: 'info-circle'}, options));
    },
    warning(options){
        options = processOptions(options);
        Toast.tip(Object.assign({icon: 'warning'}, options));
    },
    danger(options){
        options = processOptions(options);
        Toast.tip(Object.assign({icon: 'close'}, options));
    },
    loading(options){
        options = processOptions(options);
        Toast.tip(Object.assign({icon: 'loading', children: '加载中...'}, options));
    }
});

Toast.propTypes = {
    icon: PropTypes.string, // iconfont 的图标名字
    visible: PropTypes.bool.isRequired,
    onShow: PropTypes.func,
    onRequestClose: PropTypes.func,
    wrapperStyle: View.propTypes.style,
    style: View.propTypes.style,
    textStyle: Text.propTypes.style,
    children: PropTypes.node
};

export default Toast;