import { createSlice } from "@reduxjs/toolkit";

const deleteSlice = createSlice({
	name: "delete",
	initialState: [],
	reducers: {
		Datafilter: (state, action) => {
         
		}
	}
})

export const { Datafilter } = deleteSlice.actions
export default deleteSlice.reducer
