import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const registerUser: any = createAsyncThunk(
        // action type string
        'user/register',
        // callback function
        async ({ username, email, password, fullname, address, age, phone_number_prefix, phone_number, avatar }:
            {username: string, email: string, password: string, fullname: string, address: string, age: number, phone_number_prefix: string, phone_number: number, avatar: string}, {rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
            headers: {
            'Content-Type': 'application/json',
        },
        }
        // make request to backend
        await axios.post(
            'http://localhost:8081/api/v1/auth/register',
            { username,
            email, 
            password,
            fullname,
            address,
            age,
            phone_number_prefix,
            phone_number,
            avatar 
            },
            config
        )
        } catch (error: any) {
        // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
        }
        }
    }
)


export const loginUser: any = createAsyncThunk(
    'user/login',
    async ({email, password}: {email: string, password: string}, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                'Content-Type': 'application/json',
            },
            }
            const response =  await axios.post(
                'http://localhost:8081/api/v1/auth/login',
                { email, password },
                config
            )
            return response.data
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)