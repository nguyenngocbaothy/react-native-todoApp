import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Dimensions,
    Image,
    TouchableOpacity,
    Alert,
    RefreshControl,
    ScrollView,
} from 'react-native';
import { AntDesign, MaterialIcons, EvilIcons } from '@expo/vector-icons';
import moment from "moment";
import Swipeout from 'react-native-swipeout';
import { findCategoryType } from '../constants/CategoryType';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


const { width: WIDTH } = Dimensions.get('window');

const Item = ({ item, index, onDeleteItem }) => {
    const swipeSetting = {
        autoClose: true,
        backgroundColor: "#fff",
        onClose: (secId, rowId, direction) => {
            // console.log('on close')
        },
        onOpen: (secId, rowId, direction) => {
            // console.log('on open')
        },
        left: [
            {
                onPress: () => {
                    Alert.alert(
                        'Alert',
                        'Are you sure to delete?',
                        [
                            { text: "No", onPress: () => console.log("cancel pressed"), style: 'cancel' },
                            {
                                text: 'yes', onPress: () => {
                                    onDeleteItem(item.id, index)
                                }
                            }
                        ],
                        { cancelable: true }
                    )
                },
                backgroundColor: "red",
                component: (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                        }}
                    >
                        <MaterialIcons name="delete-outline" size={30} color="#fff" />
                    </View>
                ),
            }
        ],
        rowId: item.id,
    }

    const renderCategoryType = (value: number) => {
        const name = findCategoryType(value)?.name

        switch (value) {
            case 1:
                return (
                    <>
                        <AntDesign name="user" size={20} color="grey" />
                        <Text style={styles.time}>{name}</Text>
                    </>
                )
                break;
            case 2:
                return (
                    <>
                        <MaterialIcons name="work-outline" size={20} color="grey" />
                        <Text style={styles.time}>{name}</Text>
                    </>
                )
                break;
            case 3:
                return (
                    <>
                        <AntDesign name="file1" size={20} color="grey" />
                        <Text style={styles.time}>{name}</Text>
                    </>
                )
                break;
            default:
                return (
                    <>
                        <AntDesign name="user" size={20} color="grey" />
                        <Text>{name}</Text>
                    </>
                )
                break;
        }
    }
    return (
        <>
            <Swipeout {...swipeSetting}>
                <View
                    style={styles.containerItem}
                >
                    <View style={styles.item}>
                        <Text style={styles.title}>{item?.title}</Text>
                    </View>
                    <View
                        style={styles.itemRow}
                    >
                        <View>
                            <View style={styles.info}>
                                <AntDesign name="clockcircleo" size={20} color="grey" style={{ marginRight: 10 }} />
                                <Text style={styles.time}>
                                    {moment(item?.date).format("HH:mm")}
                                </Text>
                            </View>
                            <View style={styles.info}>
                                <AntDesign name="calendar" size={22} color="grey" style={{ marginRight: 10 }} />
                                <Text style={styles.time}>
                                    {moment(item?.date).format("DD/MM/YYYY")}
                                </Text>
                            </View>
                        </View>

                        <View>
                            <View
                                style={[styles.itemRow]}
                            >
                                {renderCategoryType(item?.cate)}
                            </View>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        borderBottomColor: '#000',
                        borderBottomWidth: 0.5,
                    }}
                />

            </Swipeout>
        </>
    )
};

const App = ({ data, onRefeshData, onDeleteItem, filterDate }) => {
    const [isFreshingData, setIsFreshingData] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        if (filterDate && selectedDate) {
            filterDate(selectedDate)
        }
    }, [selectedDate])

    const renderItem = (item, index) => (
        <Item item={item} index={index} onDeleteItem={onDeleteItem} />
    );

    let objCalendarConfig = {
        marked: true,
        selectedColor: 'blue',
        dotColor: 'orange',
    }

    const renderDate = () => {
        if (data && data.length > 0) {
            let objDate = {}

            data.forEach((element) => {
                objDate[moment(element.date).format("YYYY-MM-DD")] = objCalendarConfig
            })

            if (selectedDate && !isFreshingData) {
                objDate[selectedDate] = { selected: true }
            }

            return objDate;
        } else {
            return {
                [selectedDate]: { selected: true },
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <View
                style={{height: '100%', width: '100%', position: 'absolute' }} source={{ uri: 'https://i.stack.imgur.com/t96aT.jpg' }} /> */}

            <FlatList
                ListHeaderComponent={
                    <>
                        {/* <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                paddingRight: 10,
                                paddingTop: 5,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    if (onRefeshData) {
                                        setIsFreshingData(true)
                                        onRefeshData()
                                    }
                                }}
                                style={styles.roundBtn}
                            >
                                <EvilIcons
                                    name="refresh"
                                    size={24}
                                    color="black"

                                />
                            </TouchableOpacity>
                        </View> */}

                        <View>
                            <Calendar
                                markedDates={renderDate()}
                                onDayPress={(day) => {
                                    // console.log('press day', day)
                                    setSelectedDate(day.dateString)
                                }}
                                renderEmptyData={() => { return (<View />); }}
                            />
                        </View>
                    </>
                }
                data={data}
                renderItem={({ item, index }) => renderItem(item, index)}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={isFreshingData}
                        onRefresh={() => {
                            if (onRefeshData) {
                                setIsFreshingData(true)
                                onRefeshData()
                                setIsFreshingData(false)
                                setSelectedDate(null)
                            }
                        }}
                    />
                }
                ListEmptyComponent={
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            width: WIDTH,
                            marginTop: 50
                        }}
                    >
                        <Text>No data</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    containerItem: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    item: {
        // backgroundColor: '#fff',
        paddingBottom: 10,
        paddingTop: 10,
        marginVertical: 5,
        marginHorizontal: 0,
        width: WIDTH,
    },
    title: {
        fontSize: 16,
    },
    info: {
        flexDirection: "row",
        marginBottom: 5,
    },
    time: {
        fontSize: 14,
        color: "grey",
    },
    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    roundBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#fff',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 5,
    },
});

export default App;