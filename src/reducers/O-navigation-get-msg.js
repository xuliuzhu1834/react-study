import * as TYPES from '../constans/O-navigation-actiontypes';

const defaultState = {
  revMenus: [],
  editMenuName: '',
  onchangeWebsite: 0,
  selected: '请配置站点',
  selectedMenu: '选择编辑菜单',
  selectedSite: '请选择站点',
  openAddDialog: false,
  openEditDialog: false,
  openDelMenuDialog: false,
  revCategorys: [],
  revCategorysDetails: {},
  cateDetailState: 1,
  cateState: 1,
  siteReg: false,
  snackbar: false,
  snackbarMsg: '',
};

// recurve 值为0时表示newProps不传递给子，id和自身id匹配时给自己
// revurve 值为1时表示newProps在id和自身id匹配时传递给子和自己
// recureve 值为2是表示newProps始终传递给子和自己
function replaceTreeItemProps(arr, id, newPropsFactory, recurve, idName = 'category_id') {
  return arr.map((item) => {
    if (item[idName] === id || recurve === 2) {
      if (recurve) {
        return Object.assign({}, item, newPropsFactory(item), {
          category_children: item.category_children ?
            replaceTreeItemProps(item.category_children, id, newPropsFactory, 2, idName) : [],
        });
      }
      return Object.assign({}, item, newPropsFactory(item));
    }
    return Object.assign({}, item, {
      category_children: item.category_children ?
        replaceTreeItemProps(item.category_children, id, newPropsFactory, recurve, idName) : [],
    });
  });
}

function filterChecked(arr = [], id) {
  return arr.reduce((sum, item) => {
    if (item.id === id) {
      return [...sum];
    }
    return [...sum, Object.assign({}, item, {
      category_children: filterChecked(item.category_children, id),
    })];
  }, []);
}

export default function getMsg(state = defaultState, action) {
  switch (action.type) {
    case TYPES.TOGGLE_SELECTED_ITEM:
      return Object.assign({}, state, {
        revCategorys: replaceTreeItemProps(state.revCategorys, action.id, () => ({
          checked: action.value,
        }), 1),
      });
    // get
    case TYPES.LOADED_CATEGORYS:
      return Object.assign({}, state, {
        revCategorys: action.data.info,
        cateState: 2,
      });
    case TYPES.INIT_CATEGORY_DETAILS:
      return Object.assign({}, state, {
        revCategorysDetails: {
          menu_id: state.selectedMenu,
          site_uid: state.selected,
          menu_name: state.revMenus.find((item) => item.menu_id === state.selectedMenu).menu_name,
          category_children: [],
        },
        cateDetailState: 2,
      });
    case TYPES.LOADED_CATEGORYS_DETAILS:
      return Object.assign({}, state, {
        revCategorysDetails: action.data.info,
        cateDetailState: 2,
      });
    case TYPES.ADD_NORMAL_CATERGORY:
      return Object.assign({}, state, {
        revCategorysDetails: Object.assign({}, state.revCategorysDetails, {
          category_children: [
            ...state.revCategorysDetails.category_children,
            ...action.value,
          ],
        }),
      });

    case TYPES.ADD_DIY_LINK:
      return Object.assign({}, state, {
        revCategorysDetails: Object.assign({}, state.revCategorysDetails, {
          category_children: [
            ...state.revCategorysDetails.category_children,
            {
              id: `temp${new Date().valueOf()}`,
              category_type: 2,
              category_title: action.name,
              category_raw_title: action.name,
              category_link: action.url,
              category_color: '1',
            },
          ],
        }
        ),
      });
    case TYPES.ADD_DALIYNEW:
      return Object.assign({}, state, {
        revCategorysDetails: Object.assign({}, state.revCategorysDetails, {
          category_children: [
            ...state.revCategorysDetails.category_children,
            {
              id: `temp${new Date().valueOf()}`,
              category_type: 3,
              category_title: 'Daliy New',
              category_raw_title: 'Daliy New',
            },
          ],
        }
        ),
      });
    case TYPES.LOADED_MENUS:
      return Object.assign({}, state, {
        revMenus: action.data.info,
      });
    case TYPES.EDIT_MENU_NAME_RESULT:
      return Object.assign({}, state, {
        revMenus: [
          ...state.revMenus
            .slice(0, state.revMenus.findIndex(
              (item) => item.menu_id === action.id)
            ),
          Object.assign(
            {}, state.revMenus.find(
              (item) => item.menu_id === action.id),
            { menu_name: state.editMenuName }
          ),
          ...state.revMenus
            .slice(state.revMenus.findIndex(
                (item) => item.menu_id === action.id) + 1
            ),
        ],
      });

    case TYPES.ADD_MENU_NAME:
      return Object.assign({}, state, {
        revMenus: [...state.revMenus, {
          menu_id: action.id,
          menu_name: action.value,
        }],
      });
    case TYPES.DELETE_MENU_NAME_RESULT:
      return Object.assign({}, state, {
        revMenus: [
          ...state.revMenus
            .slice(0,
              state.revMenus.findIndex((item) => item.menu_id === action.id)),
          ...state.revMenus
            .slice(
              state.revMenus.findIndex((item) => item.menu_id === action.id) + 1),
        ],
        snackbar: true,
        snackbarMsg: action.msg,
      });
    case TYPES.CATEGORYS_DETAILS_SAVE_RESULT:
      return Object.assign({}, state, {
        snackbar: true,
        snackbarMsg: action.msg,
      });
    case TYPES.GEN_DETAILS_DATA:
      return Object.assign({}, state, {
        revCategorysDetails: Object.assign({}, state.revCategorysDetails, {
          category_children: action.value,
        }
        ),
      });
    case TYPES.EDIT_EVERY_CATE:
      return Object.assign({}, state, {
        revCategorysDetails: Object.assign({},
          state.revCategorysDetails,
          {
            category_children: replaceTreeItemProps(state.revCategorysDetails.category_children,
              action.id, () => (action.data), 0, 'id'),
          }),
      });
    case TYPES.DEL_EVERY_CATE:
      return Object.assign({}, state, {
        revCategorysDetails: Object.assign({},
          state.revCategorysDetails,
          {
            category_children: filterChecked(
              state.revCategorysDetails.category_children,
              action.id
            ),
          }),
      });
    case TYPES.COMPELETE:
      return Object.assign({}, state, {
        [action.key]: action.value,
      });
    default:
      return state;
  }
}
