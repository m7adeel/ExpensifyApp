import _ from 'lodash';
import React from 'react';
import {View, ViewStyle} from 'react-native';
import BlockingView from '@components/BlockingViews/BlockingView';
import Icon from '@components/Icon';
import * as Expensicons from '@components/Icon/Expensicons';
import useThemeStyles from '@styles/useThemeStyles';
import variables from '@styles/variables';
import {PendingMapViewProps} from './MapViewTypes';

function PendingMapView({title = '', subtitle = '', style}: PendingMapViewProps) {
    const styles = useThemeStyles();
    const hasTextContent = !_.isEmpty(title) || !_.isEmpty(subtitle);

    return (
        <View style={[styles.mapPendingView as ViewStyle, style]}>
            {hasTextContent ? (
                <BlockingView
                    icon={Expensicons.EmptyStateRoutePending}
                    title={title}
                    subtitle={subtitle}
                    shouldShowLink={false}
                />
            ) : (
                <View style={[styles.flex1 as ViewStyle, styles.alignItemsCenter as ViewStyle, styles.justifyContentCenter as ViewStyle, styles.ph10 as ViewStyle]}>
                    <Icon
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignoreg
                        src={Expensicons.EmptyStateRoutePending}
                        width={variables.iconSizeUltraLarge}
                        height={variables.iconSizeUltraLarge}
                    />
                </View>
            )}
        </View>
    );
}

PendingMapView.displayName = 'PendingMapView';

export default PendingMapView;
