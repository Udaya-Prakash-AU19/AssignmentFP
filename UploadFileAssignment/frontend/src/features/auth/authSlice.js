import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// const currentUser = JSON.stringify(localStorage.getItem('currentUser'))
const currentUser = localStorage.getItem('currentUser')

const initialState = {
    user: currentUser ? currentUser : null,
    myFiles: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const registerAsyncThunk = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try{

        return await authService.resgisterMidware(user)

    } catch(err) {

        const messageFromRegister = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(messageFromRegister)

    }
})

export const loginAsyncThunk = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try{

        return await authService.loginMidware(user)

    } catch(err) {
        
        const messageFromLogin = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(messageFromLogin)

    }
})

export const fileUploadAsyncThunk = createAsyncThunk('auth/fileUpload', async (myFile, thunkAPI) => {
    try{

        return await authService.fileUploadMidware(myFile)
    
    } catch(err) {

        const messageFromFileUpload = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
        return thunkAPI.rejectWithValue(messageFromFileUpload)

    }
})

export const authSlice = createSlice({
    name: 'authName',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerAsyncThunk.pending, (state) => {
            state.user = null
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
        })
        builder.addCase(registerAsyncThunk.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.message = 'Registered successfully'
        })
        builder.addCase(registerAsyncThunk.rejected, (state, action) => {
            state.user = null
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.message = action.payload
        })

        builder.addCase(loginAsyncThunk.pending, (state) => {
            state.user = null
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
            state.message = 'loading'
        })
        builder.addCase(loginAsyncThunk.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.message = 'Login success!'
        })
        builder.addCase(loginAsyncThunk.rejected, (state, action) => {
            state.user = null
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })

        builder.addCase(fileUploadAsyncThunk.pending, (state) => {
            // state.user = null
            state.myFiles = null
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
            state.message = 'uploading file(s)'
        })
        builder.addCase(fileUploadAsyncThunk.fulfilled, (state, action) => {
            state.myFiles = action.payload
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.message = 'File(s) uploaded successfully!'
        })
        builder.addCase(fileUploadAsyncThunk.rejected, (state, action) => {
            state.myFiles = null
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })
    }
})


export default authSlice.reducer

export const { reset } = authSlice.actions