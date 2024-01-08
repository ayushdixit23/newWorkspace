import { createSlice } from "@reduxjs/toolkit";

const userData = createSlice({
	name: "userData",
	initialState: {
		// data: null,
		loading: false,
		path: "",
		actualData: null,
		collectionId: null,
		productid: null,
		// communityid: null
	},
	reducers: {
		// getData: (state, action) => {
		// 	state.data = action.payload;
		// },
		changelaoding: (state, action) => {
			const { loading, path, data } = action.payload;
			state.loading = loading
			state.path = path
			if (data) {
				state.data.push(data)
			}
		},
		sendData: (state, action) => {
			state.actualData = action.payload
		},
		collection: (state, action) => {
			state.collectionId = action.payload

		},
		product: (state, action) => {
			state.productid = action.payload
		},
		// communityforid: (state, action) => {
		// 	state.communityid = action.payload
		// }
	},
});

export const {
	// getData,
	changelaoding, sendData, collection, product, communityforid } = userData.actions;
export default userData.reducer;