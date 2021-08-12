import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
  TextInput,
  Button,
  Platform,
} from 'react-native';
import moment from "moment";
import {
  Formik,
  FormikErrors,
  Form,
  Field,
} from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as Yup from 'yup';
import faker from 'faker';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import TodoList from 'components/todoList';
import { categoryType } from '../constants/CategoryType';
import defaultData from '../constants/Data';

// import Icon from 'react-native-vector-icons/FontAwesome';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';

const { width: WIDTH } = Dimensions.get('window');
export default function TabOneScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const initialValues = {
    title: "",
    cate: categoryType[0].value,
    date: moment(),
  }
  const [DATA, setData] = useState(defaultData);
  const [DATAcopy, setDataCopy] = useState(defaultData);
  const [isFilter, setIsFilter] = useState(false);


  // data time
  const [date, setDate] = useState(new Date());

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const todoSchema = Yup.object().shape({
    title: Yup.string().required('Title is required!'),
  });

  const filterDate = (selectedDate) => {
    setIsFilter(true)
    const filtered = [...DATA].filter(el => moment(el.date).format("YYYY-MM-DD") === selectedDate)
    setDataCopy(filtered)
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}

      <TodoList
        data={isFilter ? DATAcopy : DATA}
        onRefeshData={() => {
          setData(DATA)
          setIsFilter(false)
        }}
        onDeleteItem={(itemId, index) => {
          const copyData = [...DATA]
          const filtered = copyData.filter(e => e.id !== itemId)
          setData(filtered);
          setDataCopy(filtered)
        }}
        filterDate={filterDate}
      />


      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 55,
          position: 'absolute',
          bottom: 10,
          right: 10,
          height: 55,
          backgroundColor: '#2196F3',
          borderRadius: 100,
        }}
        onPress={() => setModalVisible(true)}
      >
        {/* <Icon name='plus' size={30} color='#01a699' /> */}
        <AntDesign name="plus" size={30} color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          {/* <View style={styles.modalView}> */}


          <View>
            <Formik
              validationSchema={todoSchema}
              initialValues={initialValues}
              onSubmit={(values, { resetForm }) => {
                const newValue = {
                  id: faker.datatype.uuid(),
                  ...values,
                }
                setData([newValue, ...DATA])

                resetForm(initialValues)
                setModalVisible(false)
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isSubmitting,
                setFieldValue,
                resetForm,
              }) => (
                <View>
                  <View
                    style={{
                      // flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginBottom: 10,
                    }}>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(!modalVisible)
                          resetForm(initialValues)
                        }}
                        style={styles.roundBtn}
                      >
                        <Entypo
                          name="cross"
                          size={22}
                          color="red"
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        alignSelf: "center",
                      }}
                    >
                      <Text>ADD NEW</Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => handleSubmit()}
                        style={styles.roundBtn}
                      >
                        <Entypo
                          name="check"
                          size={22}
                          color="blue"
                        />
                      </TouchableOpacity>
                    </View>

                  </View>

                  <View style={styles.formContainer}>
                    <View
                      style={{
                        marginTop: 15,
                        marginBottom: 35,
                      }}
                    >
                      <Text
                        style={{ color: "red" }}
                      >
                        *
                        <Text
                          style={{
                            color: "#2196F3",
                          }}
                        >
                          What is to be done:
                        </Text>
                      </Text>
                      <TextInput
                        onChangeText={handleChange('title')}
                        onBlur={handleBlur('title')}
                        value={values.title}
                        style={styles.input}
                        placeholder={'Input title here...'}
                      />
                      {errors.title && touched.title ? (
                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.title}</Text>
                      ) : null}
                    </View>
                    <View>
                      <Text
                        style={{
                          color: "#2196F3",
                        }}
                      >
                        Due date:
                      </Text>
                      <View
                        style={styles.selectDateTime}
                      >
                        <TextInput
                          placeholder={"Show date picker!"}
                          editable={false}
                          selectTextOnFocus={false}
                          defaultValue={initialValues.date.format("DD/MM/YYYY")}
                          value={moment(values.date).format("DD/MM/YYYY")}
                        />
                        <FontAwesome name="calendar" size={24} color="black" onPress={showDatepicker} />
                      </View>
                      <View
                        style={styles.selectDateTime}
                      >
                        <TextInput
                          // value={values.title}
                          placeholder={"Show time picker!"}
                          editable={false}
                          selectTextOnFocus={false}
                          defaultValue={initialValues.date.format("HH:mm")}
                          value={moment(values.date).format("HH:mm")}
                        />
                        <AntDesign name="clockcircleo" size={24} color="black" onPress={showTimepicker} />
                      </View>
                      {show && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={date}
                          mode={mode}
                          is24Hour={true}
                          display="default"
                          onChange={(event, selectedDate) => {
                            onChange(event, selectedDate)
                            setFieldValue('date', selectedDate)
                          }}
                        />
                      )}
                    </View>
                    <View
                      style={{
                        marginTop: 15,
                        marginBottom: 50,
                      }}
                    >
                      <Text
                        style={{
                          color: "#2196F3",
                        }}
                      >
                        Add to list:
                      </Text>
                      <Picker
                        selectedValue={values.cate}
                        onValueChange={(itemValue, itemIndex) => {
                          setFieldValue('cate', itemValue)
                        }}
                        itemStyle={{
                          fontSize: 14,
                          width: WIDTH,
                        }}
                      >
                        {
                          categoryType && categoryType.length > 0 && categoryType.map((item, index) => {
                            return (
                              <Picker.Item
                                key={index}
                                label={item.name}
                                value={item.value}
                              />
                            )
                          })
                        }
                      </Picker>
                    </View>
                  </View>

                </View>
              )}
            </Formik>
          </View>

          {/* <Text style={styles.modalText}>Hello World!</Text> */}
          {/* <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable> */}
          {/* </View> */}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  centeredView: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 22,
    width: WIDTH,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  formContainer: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  input: {
    backgroundColor: "#fff",
    borderBottomColor: '#e8eced',
    borderBottomWidth: 1,
    width: WIDTH - 30,
  },
  selectDateTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
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
    shadowRadius: 15,
  },
});
