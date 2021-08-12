import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
    Dimensions,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    ActivityIndicator,
} from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { defaultUser, storeData, getData } from '../../constants/User'

import { styles } from './style';

const { width: WIDTH } = Dimensions.get('window');

export const Login = ({ navigation }) => {
    // const [isAuth, setIsAuth] = useState(true)

    // useEffect(() => {
    //     console.log('use effect')
    //     getData()
    //         .then((auth) => {
    //             console.log("auth", auth)
    //             if (auth) {
    //                 setIsAuth(true)
    //                 navigation.navigate("Root")
    //             } else {
    //                 setIsAuth(false)
    //             }
    //         })
    // }, [isAuth])

    // console.log("is auth", isAuth)

    const createButtonAlert = (title: string, content: string): void =>
        Alert.alert(
            title,
            content,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );

    const loginValidationSchema = yup.object().shape({
        username: yup
            .string()
            .required('Username is required'),
        password: yup
            .string()
            .required('Password is required'),
    })

    // if (!isAuth) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Image
                        style={styles.logo}
                        source={{
                            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY-_2ys2SC6r4WT0tYJwjMuhjd2iFyTZTHZg&usqp=CAU',
                        }}
                    />

                    <Formik
                        validationSchema={loginValidationSchema}
                        initialValues={{
                            username: '',
                            password: '',
                        }}
                        onSubmit={values => {
                            if (
                                values.username === defaultUser.username &&
                                values.password === defaultUser.password
                            ) {
                                storeData(values.username)
                                navigation.navigate("Root")
                            } else {
                                createButtonAlert("Error login", "Invalid username or password")
                            }
                        }}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            isValid,
                        }) => (
                            <>
                                <View style={styles.info}>
                                    <View style={styles.inputControl}>
                                        <Text style={styles.title}>username:</Text>
                                        <TextInput
                                            placeholder="Input your username..."
                                            onChangeText={handleChange('username')}
                                            onBlur={handleBlur('username')}
                                            value={values.username}
                                            style={[styles.input, { width: WIDTH - 55 }]}
                                            returnKeyType='next'
                                            returnKeyLabel='next'
                                        />
                                        {errors.username &&
                                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.username}</Text>
                                        }
                                    </View>

                                    <View style={styles.inputControl}>
                                        <Text style={styles.title}>password:</Text>
                                        <TextInput
                                            placeholder="Input your password..."
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            value={values.password}
                                            style={[styles.input, { width: WIDTH - 55, paddingRight: 110 }]}
                                            returnKeyType='go'
                                            secureTextEntry
                                            autoCompleteType='password'
                                            autoCapitalize='none'
                                        />
                                        {errors.password &&
                                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                                        }

                                        {/* <Text
                                            style={styles.txtForgetPassword}
                                            onPress={() => createButtonAlert("Forget Password title", "Forget Password content message")}
                                        >
                                            Forget Password
                                        </Text> */}
                                    </View>

                                    <View>
                                        <TouchableOpacity
                                            // onPress={() => navigation.navigate("Root")}
                                            onPress={() => handleSubmit()}
                                            style={styles.btnLogin}
                                        // disabled={!isValid}
                                        >
                                            <Text style={styles.textLogin}>Sign In</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View>
                                        <Text style={styles.signup}>
                                            Don't have an account? {' '}
                                            <Text
                                                style={{ color: "grey" }}
                                                onPress={() => createButtonAlert("Sign up title", "Sign up content message")}
                                            >
                                                sign up
                                            </Text>
                                        </Text>
                                    </View>
                                </View>
                            </>
                        )}
                    </Formik>
                </View>


            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
    // } else {
    //     return (
    //         <View
    //             style={{
    //                 flex: 1,
    //                 justifyContent: "center",
    //                 alignItems: "center",
    //             }}
    //         >
    //             <ActivityIndicator size="large" color="#2196F3" />
    //         </View>
    //     )
    // }
}