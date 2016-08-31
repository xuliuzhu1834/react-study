import React from 'react';
import { ToolbarGroup } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import DropDownMenu from 'material-ui/DropDownMenu';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import Add from 'material-ui/svg-icons/content/add';
import Create from 'material-ui/svg-icons/content/create';
import { orange500 } from 'material-ui/styles/colors';

import * as types from '../constans/O-navigation-actiontypes';
import { compeleData, fetchParams, addMenuName } from '../actions/O-navigation-action';

export default class Toptoolbar extends React.Component {
  componentWillMount() {
    this.props.dispatch({ type: types.SHOW_WESITE });
  }

  handleChange(event, index, value) {
    this.props.dispatch(compeleData('selected', value));
    if (value !== '请配置站点') {
      this.props.dispatch(compeleData('siteReg', false));
    }
    this.props.dispatch(fetchParams(types.SHOW_MENUS, value));
    this.props.dispatch(fetchParams(types.SHOW_CATEGORYS, value));
  }

  handleMenuChange(event, index, value) {
    if (this.props.getMsg.selected === '请配置站点') {
      this.props.dispatch(compeleData('siteReg', true));
      return;
    }
    this.props.dispatch(compeleData('selectedMenu', value));
    if (value.indexOf('temp') > -1) {
      this.props.dispatch({ type: types.INIT_CATEGORY_DETAILS });
    } else {
      this.props.dispatch(fetchParams(types.SHOW_CATEGORYS_DETAILS, value));
    }
  }
  handleEditMenuName() {
    if (this.props.getMsg.selectedMenu.indexOf('temp') > -1) return;
    this.props.dispatch(fetchParams(types.EDIT_MENU_NAME,
      { menu_id: this.props.getMsg.selectedMenu,
        menu_name: this.props.getMsg.editMenuName,
        menu_status: this.props.getMsg.revMenus.find(
          (item) => item.menu_id === this.props.getMsg.selectedMenu).menu_status,
      }));
    this.handleOpenDialog('openEditDialog', false);
  }
  handledeleteMenu() {
    if (this.props.getMsg.selectedMenu.indexOf('temp') > -1) return;
    this.props.dispatch(fetchParams(types.DELETE_MENU_NAME,
      { menu_id: this.props.getMsg.selectedMenu,
        menu_name: this.props.getMsg.editMenuName,
        menu_status: 4,
      }));
    this.handleOpenDialog('openDelMenuDialog', false);
  }
  handleAddMenuName() {
    const tempId = `temp${new Date().valueOf()}`;
    this.props.dispatch(addMenuName(this.props.getMsg.editMenuName, tempId));
    this.handleOpenDialog('openAddDialog', false);
    this.props.dispatch(compeleData('selectedMenu', tempId));
    this.props.dispatch({ type: types.INIT_CATEGORY_DETAILS });
  }
  handleOpenDialog(dialog, value) {
    this.props.dispatch(compeleData(dialog, value));
  }
  render() {
    if (this.props.selectCates.networkState === 2) {
      return (
        <Paper zDepth={0}>
          <ToolbarGroup firstChild style={{ width: '100%' }}>
            <DropDownMenu
              value={this.props.getMsg.selected}
              onChange={(event, index, value) => this.handleChange(event, index, value)}
            >
              <MenuItem key={"0_请配置站点"} value="请配置站点" primaryText="请配置站点" />
              {
                this.props.selectCates.revData.map((item) =>
                  <MenuItem
                    key={item.site_uid} value={item.site_uid}
                    primaryText={item.site_name}
                  />)
              }
            </DropDownMenu>
            <ToolbarGroup firstChild style={{ width: '60%', marginLeft: '15%' }}>
              <SelectField
                value={this.props.getMsg.selectedMenu} underlineShow
                onChange={(event, index, value) => this.handleMenuChange(event, index, value)}
                errorText={this.props.getMsg.siteReg && '请先选择站点'}
              >
                <MenuItem key={"0_选择编辑菜单"} value="选择编辑菜单" primaryText="选择编辑菜单" />
                {
                  this.props.getMsg.revMenus.map((item) =>
                    <MenuItem
                      key={item.menu_id}
                      value={item.menu_id} primaryText={item.menu_name}
                    />
                  )
                }
              </SelectField>

              <div>
                <FlatButton
                  label="添加菜单" primary style={{ maxWidth: '250px' }} icon={<Add />}
                  onClick={() => this.handleOpenDialog('openAddDialog', true)}
                />
                <Dialog
                  title="添加菜单" id={'add_menu_dialog'}
                  actions={[
                    <FlatButton
                      label="取消" primary
                      onClick={() => this.handleOpenDialog('openAddDialog', false)}
                    />,
                    <FlatButton
                      label="确定" primary keyboardFocused
                      onClick={() => this.handleAddMenuName()}
                    />,
                  ]}
                  modal={false}
                  open={this.props.getMsg.openAddDialog}
                  onRequestClose={() => this.handleOpenDialog('openAddDialog', false)}
                >
                  <TextField
                    id={'add_menu'} underlineStyle={{ orange500 }} fullWidth
                    defaultValue={''}
                    onChange={(e, value) => this.props.dispatch(
                      compeleData('editMenuName', value)
                    )}
                  />
                </Dialog>
              </div>
              <div>
                <FlatButton
                  label="修改名称" primary style={{ maxWidth: '250px' }}
                  onClick={() => this.handleOpenDialog('openEditDialog', true)} icon={<Create />}
                />
                <Dialog
                  title="修改菜单名称" id={'edit_menu_dialog'}
                  actions={[
                    <FlatButton
                      label="取消" primary
                      onClick={() => this.handleOpenDialog('openEditDialog', false)}
                    />,
                    <FlatButton
                      label="确定" primary keyboardFocused
                      onClick={() => this.handleEditMenuName()}
                    />]}
                  modal={false}
                  open={this.props.getMsg.openEditDialog}
                  onRequestClose={() => this.handleOpenDialog('openEditDialog', false)}
                >
                  <TextField
                    id={this.props.getMsg.selectedMenu} underlineStyle={{ orange500 }}
                    fullWidth onChange={(e, value) => this.props.dispatch(
                      compeleData('editMenuName', value)
                  )}
                  />
                </Dialog>
              </div>
              <div>
                <FlatButton
                  label="删除" secondary style={{ maxWidth: '250px' }}
                  onClick={() => this.handleOpenDialog('openDelMenuDialog', true)}
                />
                <Dialog
                  title={'确认删除此项吗？'}
                  id={'delete_menu_dialog'}
                  actions={[
                    <FlatButton
                      label="取消" primary
                      onClick={() => this.handleOpenDialog('openDelMenuDialog', false)}
                    />,
                    <FlatButton
                      label="确定" primary keyboardFocused
                      onClick={() => this.handledeleteMenu()}
                    />,
                  ]}
                  modal={false}
                  open={this.props.getMsg.openDelMenuDialog}
                  onRequestClose={() => this.handleOpenDialog('openAddDialog', false)}
                />
              </div>
              <div>
                <FlatButton label="预览" disabled style={{ maxWidth: '250px' }} />
              </div>

            </ToolbarGroup>
          </ToolbarGroup>
        </Paper>
      );
    }
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
}
Toptoolbar.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  getMsg: React.PropTypes.object,
  selectCates: React.PropTypes.object,
};

