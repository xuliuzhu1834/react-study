import React from 'react';
// import {render} from 'react-dom'

import {
  ToolbarGroup, MenuItem, SelectField,
  DropDownMenu, Paper, TextField, Dialog,
  FlatButton,
} from 'material-ui';
import Add from 'material-ui/svg-icons/content/add';
import Create from 'material-ui/svg-icons/content/create';
import { orange500 } from 'material-ui/styles/colors';

import * as types from '../constans/O-navigation-actiontypes';
import { compeleData, onchangeMenus } from '../actions/O-navigation-action';


export default class Toptoolbar extends React.Component {
  componentWillMount() {
    this.props.dispatch({ type: types.SHOW_WESITE });
  }

  handleChange(event, index, value) {
    this.props.dispatch(compeleData('selected', value));
    const rootData = this.props.revData;
    rootData.map((item) => {
      if (item.website === value) {
        this.props.dispatch(onchangeMenus(item.menus));
        this.props.dispatch(compeleData('revCates', item.cactes));
      }
    });
  }

  handleMenuChange(event, index, value) {
    this.props.dispatch(compeleData('selectedMenu', value));
  }

  handleCompelete() {
    // 生效按钮
    console.log(`${this.props.selected} and ${this.props.selectedMenu}`);
  }

  handleOpenDialog(dialog, value) {
    this.props.dispatch(compeleData(dialog, value));
  }

  handleEditName(value) {
    this.handleOpenDialog('openEditDialog', false);
  }

  render() {
    if (this.props.networkState === 2) {
      return (
        <Paper zDepth={0}>
          <ToolbarGroup firstChild style={{ width: '100%' }}>
            <DropDownMenu
              value={this.props.selected}
              onChange={(event, index, value) => this.handleChange(event, index, value)}
            >
              <MenuItem key={"0_请配置站点"} value="请配置站点" primaryText="请配置站点" />
              {
                this.props.revWebsites.map((item, i) =>
                  <MenuItem key={`${i + 1}_${item}`} value={item} primaryText={item} />)
              }


            </DropDownMenu>
            <ToolbarGroup firstChild style={{ width: '60%', marginLeft: '15%' }}>
              <SelectField
                value={this.props.selectedMenu} underlineShow
                onChange={(event, index, value) => this.handleMenuChange(event, index, value)}
              >
                <MenuItem key={"0_选择编辑菜单"} value="选择编辑菜单" primaryText="选择编辑菜单" />
                {
                  this.props.revMenus.map((item, i) =>
                    <MenuItem key={`${i + 1}_${item}`} value={item} primaryText={item} />
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
                      onClick={() => this.handleOpenDialog('openAddDialog', false)}
                    />,
                  ]}
                  modal={false}
                  open={this.props.openAddDialog}
                  onRequestClose={() => this.handleOpenDialog('openAddDialog', false)}
                >
                  <TextField
                    id={'add_menu'} underlineStyle={{ orange500 }} fullWidth
                    defaultValue={''}
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
                      onClick={() => this.handleEditName()}
                    />]}
                  modal={false}
                  open={this.props.openEditDialog}
                  onRequestClose={() => this.handleOpenDialog('openEditDialog', false)}
                >
                  <TextField
                    id={this.props.selectedMenu} underlineStyle={{ orange500 }}
                    defaultValue={this.props.selectedMenu} fullWidth
                  />
                </Dialog>
              </div>
              <div>
                <FlatButton
                  label="生效" primary
                  style={{ maxWidth: '250px' }}
                  onClick={() => this.handleCompelete()}
                />
              </div>
              <div>
                <FlatButton label="删除" secondary style={{ maxWidth: '250px' }} />
              </div>
              <div>
                <FlatButton label="预览" disabled style={{ maxWidth: '250px' }} />
              </div>

            </ToolbarGroup>
          </ToolbarGroup>
        </Paper>
      );
    }
    return null;
  }
}
Toptoolbar.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  revData: React.PropTypes.array,
  selected: React.PropTypes.string,
  selectedMenu: React.PropTypes.string,
  networkState: React.PropTypes.number,
  revWebsites: React.PropTypes.array,
  revMenus: React.PropTypes.array,
  openAddDialog: React.PropTypes.bool,
  openEditDialog: React.PropTypes.bool,
};

