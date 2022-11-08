import React, {Component} from 'react';
import {TouchableWithoutFeedback, View, KeyboardAvoidingView} from 'react-native';
import PDF from 'react-native-pdf';
import styles from '../../styles/styles';
import * as StyleUtils from '../../styles/StyleUtils';
import withWindowDimensions, {windowDimensionsPropTypes} from '../withWindowDimensions';
import FullScreenLoadingIndicator from '../FullscreenLoadingIndicator';
import PDFPasswordForm from './PDFPasswordForm';
import * as pdfViewPropTypes from './pdfViewPropTypes';
import compose from '../../libs/compose';
import withWindowDimensions from '../withWindowDimensions';
import withKeyboardState from '../withKeyboardState';

/**
 * On the native layer, we use a pdf library to display PDFs
 *
 * @param props
 * @returns {JSX.Element}
 */

const PDFView = props => (
    <TouchableWithoutFeedback style={[styles.flex1, props.style]}>
        <PDF
            trustAllCerts={false}
            activityIndicator={<FullScreenLoadingIndicator />}
            source={{uri: props.sourceURL}}
            style={[
                styles.imageModalPDF,
                StyleUtils.getWidthAndHeightStyle(props.windowWidth, props.windowHeight),
            ]}
        />
    </TouchableWithoutFeedback>
);

PDFView.propTypes = propTypes;
PDFView.defaultProps = defaultProps;
PDFView.displayName = 'PDFView';

        if (!message.match(/password/i)) {
            return;
        }

        // Render password form, and don't render PDF and loading indicator.
        this.setState({
            shouldRequestPassword: true,
            shouldAttemptPdfLoad: false,
        });

        // The message provided by react-native-pdf doesn't indicate whether this
        // is an initial password request or if the password is invalid. So we just assume
        // that if a password was already entered then it's an invalid password error.
        if (this.state.password) {
            this.setState({isPasswordInvalid: true});
        }
    }

    /**
     * When the password is submitted via PDFPasswordForm, save the password
     * in state and attempt to load the PDF. Also show the loading indicator
     * since react-native-pdf/PDF will need to reload the PDF.
     *
     * @param {String} password Password submitted via PDFPasswordForm
     */
    attemptPdfLoadWithPassword(password) {
        // Render react-native-pdf/PDF so that it can validate the password.
        // Note that at this point in the password challenge, shouldRequestPassword is true.
        // Thus react-native-pdf/PDF will be rendered - but not visible.
        this.setState({
            password,
            shouldAttemptPdfLoad: true,
            shouldShowLoadingIndicator: true,
        });
    }

    /**
     * After the PDF is successfully loaded hide PDFPasswordForm and the loading
     * indicator.
     */
    finishPdfLoad() {
        this.setState({
            shouldRequestPassword: false,
            shouldShowLoadingIndicator: false,
        });
    }

    render() {
        const pdfStyles = [
            styles.imageModalPDF,
            StyleUtils.getWidthAndHeightStyle(this.props.windowWidth, this.props.windowHeight),
        ];
        const touchableStyles = [
            styles.flex1,
            this.props.style,
            styles.w100,
        ];

        // If we haven't yet successfully validated the password and loaded the PDF,
        // then we need to hide the react-native-pdf/PDF component so that PDFPasswordForm
        // is positioned nicely. We're specifically hiding it because we still need to render
        // the PDF component so that it can validate the password.
        if (this.state.shouldRequestPassword) {
            pdfStyles.push(styles.invisible);
        }

        const containerStyles = this.state.shouldRequestPassword && this.props.isSmallScreenWidth
            ? [styles.w100, styles.flex1]
            : [styles.alignItemsCenter, styles.flex1];

        return (
            <View style={containerStyles}>
                {this.state.shouldAttemptPdfLoad && (
                    <TouchableWithoutFeedback style={touchableStyles}>
                        <PDF
                            trustAllCerts={false}
                            renderActivityIndicator={() => <FullScreenLoadingIndicator />}
                            source={{uri: this.props.sourceURL}}
                            style={pdfStyles}
                            onError={this.initiatePasswordChallenge}
                            password={this.state.password}
                            onLoadComplete={this.finishPdfLoad}
                        />
                    </TouchableWithoutFeedback>
                )}
                {this.state.shouldRequestPassword && (
                    <KeyboardAvoidingView style={styles.flex1}>
                        <PDFPasswordForm
                            onSubmit={this.attemptPdfLoadWithPassword}
                            onPasswordUpdated={() => this.setState({isPasswordInvalid: false})}
                            isPasswordInvalid={this.state.isPasswordInvalid}
                            shouldShowLoadingIndicator={this.state.shouldShowLoadingIndicator}
                        />
                    </KeyboardAvoidingView>
                )}
            </View>
        );
    }
}

PDFView.propTypes = pdfViewPropTypes.propTypes;
PDFView.defaultProps = pdfViewPropTypes.defaultProps;

export default compose(
    withWindowDimensions,
    withKeyboardState,
)(PDFView);
