import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchPayment = async(carParkingDetails:any) =>{
    try{
        const res = await axios.post(`https://httpstat.us/200/${carParkingDetails}`)
        alert('Payment Successfull')
    }
    catch (err){
        console.warn(err)
    }
}
type InitialStateTypes = {
    noOfParkingSpace:number;
    parkingSpaces:parkingSpaceTypes[];
    parkingSpotDetails:parkingSpaceTypes;
}

export type parkingSpaceTypes = {
    id:number;
    occupied:boolean;
    carReg:string;
    startTime:{hours:number; minutes:number};
    endTime:{hours:number; minutes:number};
}


const initialState: InitialStateTypes = {
    noOfParkingSpace:0,
    parkingSpaces:[],
    parkingSpotDetails: {
        id:0,
        carReg:'',
        occupied:false,
        startTime:{hours:0,minutes:0},
        endTime:{hours:0,minutes:0}
    },
}

const ParkingSpaceSlice = createSlice({
    name:'ParkingSpace',
    initialState,
    reducers:{
        addParkingSpace(state,action:{payload:number}){
            state.noOfParkingSpace=action.payload
            state.parkingSpaces=[]
            let objectSpace = {
                id:0,
                occupied:false,
                carReg:'',
                startTime:{hours:0,minutes:0},
                endTime:{hours:0,minutes:0},
            }
            for (let i =0 ; i<state.noOfParkingSpace;i++){
                objectSpace.id = i
                state.parkingSpaces = [...state.parkingSpaces,objectSpace]
            }
        },

        allocateParking(state,action:{payload:{startTime:{hours:number , minutes:number},carReg:any}}){
                        let availableSpaces = state.parkingSpaces.filter((i)=>i.occupied === false)
                        if(availableSpaces.length !== 0){
                            let value = availableSpaces[0].id
                        state.parkingSpaces[value] = {...action.payload,
                            id:value,
                            endTime:{hours:0,minutes:0},    
                            occupied:true,
                    }}else alert('No parking Space Available')
        },
        fetchParkingSpotDetails(state,action){
            var time = new Date()
            state.parkingSpotDetails = {...action.payload , endTime:{hours:time.getHours(),minutes:time.getMinutes()}}
        },

        deAllocateParking(state,action){
                        let value:number = state.parkingSpotDetails.id
                        fetchPayment({carRegistration:state.parkingSpotDetails.carReg,charge:action.payload})
                        state.parkingSpaces[value] = {
                                id:state.parkingSpotDetails.id,
                                occupied:false,
                                carReg:'',
                                startTime:{hours:0,minutes:0},
                                endTime:{hours:0,minutes:0},
                            }
        }
    }
})

export default ParkingSpaceSlice.reducer
export const {addParkingSpace , allocateParking , fetchParkingSpotDetails , deAllocateParking} = ParkingSpaceSlice.actions