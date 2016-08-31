import React from 'react';
import
{
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
}
from 'material-ui/Table';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { fetchParams, compeleData } from '../actions/O-navigation-action';
import { SHOW_CONFIG_ALL, EDIT_CONDIG_MENU_STATUS } from '../constans/O-navigation-actiontypes';

const configPosition = {
  1: '顶部',
  2: '底部',
  4: '左侧边',
  8: '右上角侧边',
};
const menuStatus = ['待发布', '预览', '发布', '不可操作'];
export default class TableExampleComplex extends React.Component {
  static propTypes= {
    dispatch: React.PropTypes.func,
    configAll: React.PropTypes.object,
    getMsg: React.PropTypes.object,
    selectCates: React.PropTypes.object,
  };
  componentWillMount() {
    let selected = this.props.getMsg.selectedSite;
    if (this.props.getMsg.selectedSite === '请选择站点') {
      selected = 'www';
    }
    this.props.dispatch(fetchParams(SHOW_CONFIG_ALL, selected));
  }

  handleChange(_, __, value) {
    this.props.dispatch(compeleData('selectedSite', value));
    this.props.dispatch(fetchParams(SHOW_CONFIG_ALL, value));
  }

  handleChangeMenuStatus(menu) {
    if (menu.menu_status >= '3') return;
    let selected = this.props.getMsg.selectedSite;
    if (this.props.getMsg.selectedSite === '请选择站点') {
      selected = 'www';
    }
    this.props.dispatch(
      fetchParams(EDIT_CONDIG_MENU_STATUS,
        {
          menu_id: menu.menu_id,
          menu_name: menu.menu_name,
          menu_status: parseInt(menu.menu_status, 10) + 1,
          site_uid: selected,
        }
      ));
  }
  render() {
    if (this.props.configAll.configAllDataState === 2) {
      return (
        <div>
          <Table fixedHeader fixedFooter >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
              <TableRow>
                <TableHeaderColumn
                  colSpan="5"
                  style={{ textAlign: 'left', fontSize: 20, fontWeight: '700', color: '#000' }}
                >
                  <DropDownMenu
                    value={this.props.getMsg.selectedSite}
                    onChange={(event, index, value) => this.handleChange(event, index, value)}
                  >
                    <MenuItem key={"0_请选择站点"} value="请选择站点" primaryText="请选择站点" />
                    {
                      this.props.selectCates.revData.map((item) =>
                        <MenuItem
                          key={item.site_uid} value={item.site_uid}
                          primaryText={item.site_name}
                        />)
                    }
                  </DropDownMenu>
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn >站点</TableHeaderColumn>
                <TableHeaderColumn >位置</TableHeaderColumn>
                <TableHeaderColumn >菜单</TableHeaderColumn>
                <TableHeaderColumn >状态</TableHeaderColumn>
                <TableHeaderColumn >操作</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              showRowHover
            >
              {
                this.props.configAll.configAllData.map(
                  (row, index) => (
                    <TableRow key={index}>
                      <TableRowColumn>{row.site_name}</TableRowColumn>
                      <TableRowColumn>
                        {configPosition[row.position_id]}
                      </TableRowColumn>
                      <TableRowColumn>{row.menu_name}</TableRowColumn>
                      <TableRowColumn>
                        {menuStatus[parseInt(row.menu_status, 10) - 1]}
                      </TableRowColumn>
                      <TableRowColumn>
                        <RaisedButton
                          label={menuStatus[parseInt(row.menu_status, 10)] || '不可操作'}
                          secondary
                          disabled={row.dataLoading || parseInt(row.menu_status, 10) === 3}
                          onClick={() => this.handleChangeMenuStatus(row)}
                        />
                      </TableRowColumn>
                    </TableRow>
                  )
                )
              }
            </TableBody>
          </Table>
        </div>
      );
    }
    return null;
  }
}
