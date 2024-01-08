import { createSlice } from "@reduxjs/toolkit";

const communityData = createSlice({
	name: "community",
	initialState: [],
	reducers: {
		communityDataSend: (state, action) => {
			return action.payload
		}
	}
})

export const { communityDataSend } = communityData.actions
export default communityData.reducer

