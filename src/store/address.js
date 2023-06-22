import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {};

const addressSlice = createSlice({
    name:'address',
    initialState,
    reducres:{
        setAddress:(state,action) =>{
            return action.payload;
        }
    }
});

const { setAddress } = addressSlice.actions;
export {setAddress};
export default addressSlice.reducer;