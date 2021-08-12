import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value: string) => {
    try {
        await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
        // saving error
    }
}

const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@storage_Key')
        if (value !== null) {
            // value previously stored
            return value
        }
    } catch (e) {
        // error reading value
    }
}

const clearAll = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        // clear error
    }
}



const defaultUser = {
    username: "admin",
    password: "123",
}

export {
    defaultUser,
    storeData,
    getData,
    clearAll,
};