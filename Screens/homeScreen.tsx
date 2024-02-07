import { View, Text, StyleSheet,  TextInput, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ScreenParamTypes } from '../App'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useAppDispatch} from '../Hooks/hooks'
import { addParkingSpace } from '../Features/parkingSpace/parkingSpaceSlice'

const Home = () => {

  const [parkingSpace, setParkingSpace] = React.useState<Number | any>();

  const navigator = useNavigation<NativeStackNavigationProp<ScreenParamTypes,'Home'>>();

  const dispatch = useAppDispatch();

  return (

    <View style={styles.container}>
      <Text style={styles.text}>Parking Management</Text>
      <TextInput style={styles.input} placeholder='Enter number of parking spaces'
        keyboardType='number-pad'
        onChangeText={(e) => {
          setParkingSpace(e)
        }} />
        <Button 
            disabled={!parkingSpace}
            title='Submit'
            onPress={() =>{
                dispatch(addParkingSpace(parkingSpace))
                navigator.navigate('Parking')
              }}
        />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  text: {
      fontWeight: '300',
      fontSize: 30,
  },
  input: {
    margin: 15,
    padding: 5,
    borderBottomWidth: 0.5,
    fontSize: 18,
  }
});

export default Home;