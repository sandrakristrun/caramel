import axios from "axios";
import { getBest3 } from './formFunction';

// Action Type
const GET_THREE_CITIES = "GET_THREE_CITIES";

// Action Creator
const getThreeCities = (threeCities) => ({
  type: GET_THREE_CITIES,
  threeCities,
});

// Thunks
export const fetchThreeCities = (selection) => {
  return async (dispatch) => {
    try {
      const cityArray = [];

      for(let i = 0; i < selection.length; i++){
        let [model, param] = selection[i].split('-')
        console.log(model, param)
        const { data } = await axios.get(`/api/cities/preferences/${model}?param=${param}`)
        console.log(data)
        cityArray.push(data)
      }
      console.log(cityArray)

      let bestCities = getBest3(cityArray);
      console.log('BEST', bestCities)
      //find the data on the best 3 cities from cityArray
      let result = [];

      for(let i = 0; i < bestCities.length; i++){
        for(let j = 0; j < cityArray[0].length; j++){
          let cityData = cityArray[0][j];
          let bestCityId = bestCities[i][0];

          if(cityData.cityId === bestCityId){
            result.push(cityData)
          }
        }
      }
      dispatch(getThreeCities(result));
    } catch (err) {
      console.log(err);
    }
  };
};

// Sub-Reducer
const initialState = [];

export default function threeCitiesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_THREE_CITIES:
      return action.threeCities;
    default:
      return state;
  }
}
