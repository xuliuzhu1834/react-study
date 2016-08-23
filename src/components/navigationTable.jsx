import React from 'react';
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import style from '../css/nav-conter.css';

const tableData = [
  {
    sites: 'shein-www',
    position: 'header',
    name: 'menu0',
    status: '启用',
    selected: true,
  },
  {
    sites: 'shein-ar',
    position: 'header',
    name: 'menu1',
    status: '停用',
  },
  {
    sites: 'shein-au',
    position: 'header',
    name: 'menu2',
    status: '启用',
    selected: true,
  },
  {
    sites: 'shein-de',
    position: 'header',
    name: 'menu3',
    status: '停用',
  },
  {
    sites: 'shein-fr',
    position: 'header',
    name: 'menu_春季',
    status: '启用',
  },
  {
    sites: 'shein-es',
    position: 'header',
    name: 'menu_秋季',
    status: '停用',
  },
  {
    sites: 'shein-us',
    position: 'header',
    name: 'menu_冬装',
    status: '启用',
  },
];

export default class TableExampleComplex extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
      height: '300px',
    };
  }

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({ height: event.target.value });
  };

  statusToggle() {
    alert(tableData.map.value);
  }

  render() {
    return (
      <div>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
        >
          <TableHeader >
            <TableRow>
              <TableHeaderColumn
                colSpan="5"
                style={{ textAlign: 'left', fontSize: 20, fontWeight: '700', color: '#000' }}
              >
                配置页面
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn >ID</TableHeaderColumn>
              <TableHeaderColumn >站点</TableHeaderColumn>
              <TableHeaderColumn >位置</TableHeaderColumn>
              <TableHeaderColumn >菜单</TableHeaderColumn>
              <TableHeaderColumn >状态</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {tableData.map((row, index) => (
              <TableRow key={index} selected={row.selected}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{row.sites}</TableRowColumn>
                <TableRowColumn>{row.position}</TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton
                    label={row.status}
                    secondary
                    onClick={() => this.statusToggle()}
                  />
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={style.tablePreviewBg}>
          <RaisedButton label="预览" className={style.tablePreview} />
          <RaisedButton label="生效" className={style.tablePreview} />
        </div>
      </div>
    );
  }
}
