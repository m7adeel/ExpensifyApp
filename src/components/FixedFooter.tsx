import React, {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import useThemeStyles from '@styles/useThemeStyles';

type FixedFooterProps = {
    /** Children to wrap in FixedFooter. */
    children: ReactNode;

    /** Styles to be assigned to Container */
    style: Array<StyleProp<ViewStyle>>;
};

function FixedFooter({style = [], children}: FixedFooterProps) {
    const styles = useThemeStyles();
    return <View style={[styles.ph5 as ViewStyle, styles.pb5 as ViewStyle, styles.flexShrink0 as ViewStyle, ...style]}>{children}</View>;
}

FixedFooter.displayName = 'FixedFooter';

export default FixedFooter;
