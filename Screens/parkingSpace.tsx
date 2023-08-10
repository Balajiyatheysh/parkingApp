import React from 'react'
import { TimePicker } from 'react-native-simple-time-picker'
import { useAppDispatch, useAppSelector } from '../Hooks/hooks'
import { View, TouchableOpacity, Text, StyleSheet, TextInput, ScrollView, Modal } from 'react-native'
import { allocateParking, fetchParkingSpotDetails } from '../Features/parkingSpace/parkingSpaceSlice'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenParamTypes } from '../App'


export default function ParkingSpace() {

    const [parkingSpace, setparkingSpace] = React.useState<boolean>(false)
    const { parkingSpaces } = useAppSelector(state => state.ParkingSpace)
    const dispatch = useAppDispatch()
    const navigator = useNavigation<NativeStackNavigationProp<ScreenParamTypes, 'Parking'>>()

    const AllocateParking = () => {
        var date = new Date()
        const [hours, setHours] = React.useState<number>(date.getHours())
        const [minutes, setMinutes] = React.useState<number>(date.getMinutes())
        const [carRegNumber, setCarRegNumber] = React.useState<any>()

        return (
            <Modal style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.carRegContainer}>
                    <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
                        <Text style={styles.parkingInfo}>Car Registration</Text>
                        <TextInput style={styles.regInput} placeholder='Enter Car Registration' onChangeText={(text) => setCarRegNumber(text)} />
                        <Text style={styles.parkingInfo}>Entry Time</Text>
                        <TimePicker style={{ marginBottom: 50 }} value={{ hours, minutes }} onChange={(value: { hours: number, minutes: number }) => {
                            setHours(value.hours)
                            setMinutes(value.minutes)
                        }} />
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <TouchableOpacity style={styles.regBtnstyle} onPress={() => setparkingSpace(false)}>
                            <Text style={{ fontSize: 18, color: '#FFF' }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.regBtnstyle}>
                            <Text style={{ fontSize: 18, color: '#FFF' }} onPress={() => {
                                if (carRegNumber) {
                                    dispatch(allocateParking({ carReg: carRegNumber, startTime: { hours: hours, minutes: minutes } }))
                                    setparkingSpace(false)
                                } else alert('Please add car registration')
                            }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        )
    }

    return (

        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.parkingContainer} >
                {parkingSpaces.map((x: any) =>
                    !x.occupied ?
                        <View style={styles.parkingSpace} key={x.id} ><Text>{x.id}</Text></View> :
                        <TouchableOpacity style={styles.spacesAlloted} key={x.id} onPress={() => {
                            dispatch(fetchParkingSpotDetails(x))
                            navigator.navigate('Checkout')
                        }} >
                            <Text style={{ fontWeight: '600', paddingBottom: 15 }}>Tap to heckout</Text>
                            <Text>{x.carReg}</Text>
                            <Text style={{ paddingTop: 10 }}>Car logged in at <Text style={{ fontWeight: '500', paddingTop: 5 }}>{x.startTime.hours}:{x.startTime.minutes}</Text></Text>
                        </TouchableOpacity>
                )}
            </ScrollView>
            {parkingSpace ?

                <AllocateParking /> :

                <TouchableOpacity
                    style={styles.parkingSpaceBtn}
                    onPress={() => setparkingSpace(true)} >
                    <Text style={{ fontSize: 18, color: '#FFF' }}>Add  Details</Text>
                </TouchableOpacity>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    parkingContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 10,
        padding: 5,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 5,
        padding: 4,
    },
    parkingSpace: {
        width: 150,
        height: 100,
        borderWidth: 1,
        borderColor: 'black',
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    spacesAlloted: {
        width: 150,
        height: 100,
        borderWidth: 1,
        borderColor: 'red',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    parkingSpaceBtn: {
        backgroundColor: 'green',
        borderRadius: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    carRegContainer: {
        height: 500,
        justifyContent: 'space-around',
        flexDirection: 'column',
        margin: 40,
        padding: 10
    },
    regBtnstyle: {
        flex: 1,
        height: 50,
        backgroundColor: 'green',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8
    },
    parkingInfo: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 3
    },
    regInput: {
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        margin: 5,
        padding: 5,
    }
})