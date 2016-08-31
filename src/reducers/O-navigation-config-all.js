import * as TYPES from '../constans/O-navigation-actiontypes';

const defaultState = {
  configAllData: [],
  configAllDataState: 1,
};

export default function configAll(state = defaultState, action) {
  switch (action.type) {
    case TYPES.LOAD_CONFIG_ALL:
      return Object.assign({}, state, {
        configAllData: action.data.info,
        configAllDataState: 2,
      });
    case TYPES.EDIT_CONDIG_MENU_STATUS:
      return Object.assign({}, state, {
        configAllData: [
          ...state.configAllData
            .slice(0, state.configAllData.findIndex(
              (item) => item.menu_id === action.papram.menu_id)
            ),
          Object.assign(
            {}, state.configAllData.find(
              (item) => item.menu_id === action.papram.menu_id),
            {
              dataLoading: true,
            }
          ),
          ...state.configAllData
            .slice(state.configAllData.findIndex(
                (item) => item.menu_id === action.papram.menu_id) + 1
            ),
        ],
      });
    case TYPES.EDIT_CONDIG_MENU_STATUS_RESULT:
      return Object.assign({}, state, {
        configAllData: [
          ...state.configAllData
            .slice(0, state.configAllData.findIndex(
              (item) => item.menu_id === action.id)
            ),
          Object.assign(
            {}, state.configAllData.find(
              (item) => item.menu_id === action.id),
            {
              menu_status: action.status,
              dataLoading: false,
            }
          ),
          ...state.configAllData
            .slice(state.configAllData.findIndex(
                (item) => item.menu_id === action.id) + 1
            ),
        ],
      });
    default :
      return state;
  }
}

