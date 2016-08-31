import React from 'react';
// import {render} from 'react-dom'
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import isEqual from 'lodash/isEqual';
import {
  toggleChecked, addNomalCate,
} from '../actions/O-navigation-action';
import MenuDetails from './O-navigation-menus-details.jsx';
import ClassfictionBottom from './O-navigation-classfiction-bottom.jsx';
import css from '../css/nav-conter.css';

function filterChecked(arr = []) {
  return arr.reduce((sum, item) => {
    if (item.checked) {
      return [...sum, Object.assign({}, item, {
        id: `temp${new Date().valueOf()}${Math.random()}`,
        category_children: filterChecked(item.category_children),
      })];
    }
    return [...sum, ...filterChecked(item.category_children)];
  }, []);
}

class OptListItem extends ListItem {
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextProps['data-allProps'], this.props['data-allProps']) ||
      !isEqual(nextState.open, this.state.open);
  }
}

export default class Classification extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    selectCates: React.PropTypes.object,
    getMsg: React.PropTypes.object,
  };

  loopList(count = []) {
    return count.map((item) => (
      <OptListItem
        data-allProps={item}
        key={item.category_id} primaryTogglesNestedList
        initiallyOpen={false}
        primaryText={item.category_title}
        leftCheckbox={
          <Checkbox
            checked={item.checked || false}
            onCheck={(_, value) => this.props.dispatch(toggleChecked(item.category_id, value))}
          />
        }
        nestedItems={this.loopList(item.category_children)}
      />
      )
    );
  }
  handleConfigToMenu() {
    const { revCategorys } = this.props.getMsg;
    this.props.dispatch(addNomalCate(filterChecked(revCategorys)));
  }
  renderListItem() {
    const { allChecked } = this.props.selectCates;
    const { revCategorys } = this.props.getMsg;
    return this.loopList(revCategorys, allChecked);
  }

  render() {
    if (this.props.getMsg.cateState === 2) {
      return (
        <div style={{ width: '100%' }}>
          <Paper zDepth={1} style={{ width: '20%', float: 'left', marginBottom: '20px' }}>

            <List style={{ width: '100%', textAlign: 'center', padding: '20px 0' }}>
              <Divider />
              <List className={css.navLeftconter}>
                {this.renderListItem()}
              </List>
              <RaisedButton
                label="配置到Menu" primary
                onClick={() => this.handleConfigToMenu()}
              />
            </List>
            <Divider style={{ height: '15px', width: '100%' }} />
            <ClassfictionBottom {...this.props} />
          </Paper>
          <div style={{ width: '78%', float: 'right' }}>
            <MenuDetails {...this.props} />
          </div>
        </div>

      );
    }
    return (
      <div>
        <Paper zDepth={1} style={{ width: '20%', float: 'left' }}>

          <List style={{ width: '100%', textAlign: 'center', padding: '20 0' }}>
            <Divider />

            <RaisedButton label="配置到Menu" primary />
          </List>
          <ClassfictionBottom {...this.props} />
        </Paper>
        <div style={{ width: '70%', float: 'right' }}>
          <MenuDetails {...this.props} />
        </div>
      </div>
    );
  }
}

