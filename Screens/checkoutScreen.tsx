import { View, Text,  StyleSheet, Button } from 'react-native'
import { useAppDispatch, useAppSelector } from '../Hooks/hooks'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenParamTypes } from '../App'
import { deAllocateParking } from '../Features/parkingSpace/parkingSpaceSlice'

const Checkout = () => {
    const { parkingSpotDetails } = useAppSelector((state) => state.ParkingSpace)
    const { startTime, endTime, carReg } = parkingSpotDetails
    const navigator = useNavigation<NativeStackNavigationProp<ScreenParamTypes, 'Checkout'>>()
    const dispatch = useAppDispatch()

    const calcTimeSpent = (hour1: number, hour2: number, minute1: number, minute2: number) => {
        let t1 = hour1 * 60 + minute1;
        let t2 = hour2 * 60 + minute2;
        let totalTime = t2 - t1 > 0 ? t2 - t1 : t1 - t2;
        return { hours: Math.floor(totalTime / 60), minutes: totalTime % 60 };
    }

    const timeSpent = calcTimeSpent(startTime.hours, endTime.hours, startTime.minutes, endTime.minutes)

    const calcAmount = (totalTime: number) => {
        if (totalTime < 2)
            return 10
        else {
            let extraTime = totalTime - 2
            return 10 + extraTime * 10
        }
    }

    let totalAmount = calcAmount(timeSpent.hours)

    return (
        <View style={styles.carinoutInfo}>
            <View style={styles.carRegister}>
                <Text style={{ fontSize: 18 }}>Car Registration : {carReg}</Text>
                <Text style={{ fontSize: 18 }}>Total Time: {timeSpent.hours} hr {timeSpent.minutes} mins</Text>
                <Text style={{ fontSize: 18 }}>Amount : {totalAmount}$</Text>
            </View>
                <Button
                    title='Payment Taken'
                    onPress={() => {
                        dispatch(deAllocateParking(totalAmount))
                        navigator.navigate('Parking')
                    }}
                />
        </View>

    )
}
const styles = StyleSheet.create({

    carinoutInfo: {
        margin: 10,
        padding: 15,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    carRegister: {
        borderWidth: 1.2,
        borderColor: 'black',
        borderRadius: 20,
        justifyContent: 'space-around',
        flexDirection: 'column',
        margin: 5,
        height: 200,
        padding: 8,
    },
})

export default Checkout