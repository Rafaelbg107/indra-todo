import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ApiState<T> {
	data: T | null
	isLoading: boolean
	error: string | null
	errorCode: number | null
}

const initialState: ApiState<any> = {
	data: [],
	isLoading: false,
	error: null,
	errorCode: null
}

export const apiSlice = createSlice({
	name: 'api',
	initialState,
	reducers: {
		makeRequest: (state) => {
			state.isLoading = true,
			state.errorCode = null,
			state.error = null
		},
		successRequest: <T>(state: ApiState<T>, action: PayloadAction<T>) => {
			state.isLoading = false,
			state.data = action.payload,
			state.error = null,
			state.errorCode = null
		},
		errorRequest: (state, action: PayloadAction<{error: string, errorCode: number}>) => {
			state.isLoading = false,
			state.error = action.payload.error,
			state.errorCode = action.payload.errorCode
		},
		setData: <T>(state: ApiState<T>, action: PayloadAction<T>) => {
			state.data = action.payload
		}
	}
})

export const { makeRequest, successRequest, errorRequest, setData } = apiSlice.actions

export default apiSlice.reducer