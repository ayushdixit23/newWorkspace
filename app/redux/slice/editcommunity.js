import { createSlice } from "@reduxjs/toolkit";

const editcommunity = createSlice({
	name: "editcommunity",
	initialState: [],
	reducers: {
		editcom: (state, action) => {
			return action.payload
		}
	}
})

export const { editcom } = editcommunity.actions
export default editcommunity.reducer
