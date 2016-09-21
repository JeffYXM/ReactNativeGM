import React, {PropTypes} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import G from '../global/variable';

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: G.defaultBg
    },
    pageWhite: {
        backgroundColor: G.whiteBg
    },
    pageContent: {
        flex: 1
    }
});

class Page extends React.Component {
    render() {
        const {
            style,
            header,
            tabbar,
            bottom,
            white,
            children,
            ...rest
        } = this.props;

        return (
            <View {...rest} style={[styles.page, white ? styles.pageWhite : {}, style]}>
                {header ? <View>{header}</View> : undefined}
                <ScrollView style={styles.pageContent}>
                    {children}
                </ScrollView>
                {tabbar ? <View>{tabbar}</View> : undefined}
                {bottom ? bottom : undefined}
            </View>
        );
    }
}

Page.propTypes = {
    children: PropTypes.node,
    style: View.propTypes.style,
    white: PropTypes.bool,
    header: PropTypes.node,
    tabbar: PropTypes.node,
    bottom: PropTypes.node
};

export default Page;