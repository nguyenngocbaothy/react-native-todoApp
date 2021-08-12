import { StyleSheet } from 'react-native';
import { Color } from '../../../themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.text,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: 96,
        height: 88,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
    },
    info: {
        marginTop: 50,
    },
    inputControl: {
        marginBottom: 20,
    },
    title: {
        textTransform: 'uppercase',
        color: "grey",
        justifyContent: 'flex-start',
    },
    input: {
        backgroundColor: "#fff",
        borderBottomColor: '#e8eced',
        borderBottomWidth: 1,
    },
    btnLogin: {
        backgroundColor: "#2196F3",
        padding: 10,
        height: 50,
        justifyContent: "center",
        marginTop: 40,
    },
    textLogin: {
        color: "#fff",
        textAlign: "center",
        textTransform: "uppercase",
    },
    signup: {
        textTransform: "uppercase",
        textAlign: "center",
        marginTop: 30,
        fontSize: 13,
    },
    txtForgetPassword: {
        color: "grey",
        position: "absolute",
        bottom: 5,
        right: 0,
    },
});
