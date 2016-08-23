import React from 'react';
// import {render} from 'react-dom'
import {
  RaisedButton, Paper, Subheader, List, ListItem, TextField, Divider, Checkbox,
  CircularProgress,
} from 'material-ui';

import {
  childrenChecked, childrenCheckedCancel,
  deselectWhenParentChecked, deselectWhenParentCheckedCalcel,
} from '../actions/O-navigation-action';
import css from '../css/nav-conter.css';
// import MenusDetails from './O-navigation-menus-details.jsx';


export default class Classification extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    revCates: React.PropTypes.array,
    childrenChecked: React.PropTypes.array,
    revData: React.PropTypes.array,
    selected: React.PropTypes.string,
    networkState: React.PropTypes.number,
    cancelCates: React.PropTypes.array,
    allChecked: React.PropTypes.bool,
  };

  loopList(count = [], parentChecked) {
    return count.map((item) => {
      const checkFlag = this.props.revCates.indexOf(item.id) > -1;
      const unCheckFlag = this.props.cancelCates.indexOf(item.id) > -1;
      const checked = parentChecked ? !unCheckFlag : checkFlag;
      return (
        <ListItem
          key={item.cate} initiallyOpen={false}
          primaryTogglesNestedList primaryText={item.cate}
          leftCheckbox={
            <Checkbox
              checked={checked}
              onCheck={(e, value) => {
                if (parentChecked) {
                  if (!value) return this.props.dispatch(deselectWhenParentChecked(item.id));
                  return this.props.dispatch(deselectWhenParentCheckedCalcel(item.id));
                }
                if (value) return this.props.dispatch(childrenChecked(item.id));
                return this.props.dispatch(childrenCheckedCancel(item.id));
              }}
            />
          }
          nestedItems={this.loopList(item.children, checked)}
        />
      );
    });
  }
  renderListItem() {
    const { allChecked, revData, selected } = this.props;
    const cates = revData.find((item) =>
      item.website === selected
    ) || [];
    return this.loopList(cates.cates, allChecked);
  }

  render() {
    if (this.props.networkState === 2) {
      return (
        <div style={{ width: '100%' }}>
          <Paper zDepth={1} style={{ width: '20%', float: 'left' }}>

            <List style={{ width: '100%', textAlign: 'center', padding: '20 0' }}>
              <Subheader>一级分类</Subheader>
              <Divider />
              <List className={css.navLeftconter}>
                {
                  this.renderListItem()
                }
              </List>
              <RaisedButton label="配置到Menu" primary />
            </List>

            <Divider style={{ height: '15px', width: '100%' }} />

            <List style={{ width: '100%', textAlign: 'center' }}>
              <h3 >链接自定义</h3>
              <TextField
                hintText="请配置URL"
              /><br />
              <br />
              <TextField hintText="请配置链接名称" />
              <br />
              <br />
              <RaisedButton label="配置到Menu" primary />
            </List>
            <Divider style={{ height: '15px', width: '100%' }} />
            <List style={{ width: '100%', textAlign: 'center' }}>
              <h3 >DAILY NEW</h3>
              <RaisedButton label="配置到Menu" primary />
            </List>

          </Paper>
          {/* <MenusDetails /> */}
        </div>

      );
    }
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
}

