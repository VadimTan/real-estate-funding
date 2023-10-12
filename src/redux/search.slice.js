import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	propertyList: [],
	filteredProperties: [],
	searchTerm: '',
	isLoading: true,
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		storeProperties: (state, action) => {
			state.propertyList = action.payload;
			state.filteredProperties = action.payload;
			state.isLoading = action.payload.length ? false : true;
		},
		searchByName: (state, action) => {
			const filteredProperties = state.propertyList.filter((property) =>
				property.name.toLowerCase().includes(action.payload.toLowerCase())
			);
			return {
				...state,
				filteredProperties:
					action.payload.length > 0
						? filteredProperties
						: [...state.propertyList],
			};
		},
	},
});

export const { storeProperties, searchByName } = searchSlice.actions;
export default searchSlice.reducer;
