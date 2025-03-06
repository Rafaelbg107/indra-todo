import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ApiState<T> {
	data: T | null
	isLoading: boolean
	error: string | null
	isError: boolean
}

const initialState: ApiState<any> = {
	data: [],
	isLoading: false,
	error: null,
	isError: false
}

export const apiSlice = createSlice({
	name: 'api',
	initialState,
	reducers: {
		makeRequest: (state) => {
			state.isLoading = true,
			state.isError = false,
			state.error = null
		},
		successRequest: <T>(state: ApiState<T>, action: PayloadAction<T>) => {
			state.isLoading = false,
			state.data = action.payload,
			state.error = null,
			state.isError = false
		},
		errorRequest: (state, action: PayloadAction<string>) => {
			state.isLoading = false,
			state.error = action.payload,
			state.isError = true
		},
		setData: <T>(state: ApiState<T>, action: PayloadAction<T>) => {
			state.data = action.payload
		}
	}
})

export const { makeRequest, successRequest, errorRequest, setData } = apiSlice.actions

export default apiSlice.reducer