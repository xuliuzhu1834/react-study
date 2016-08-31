import React from 'react';
import List from 'material-ui/List';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import { compeleDIYData, addDiyLink } from '../actions/O-navigation-action';
import { ADD_DALIYNEW } from '../constans/O-navigation-actiontypes';

export default class ClassfictionBottom extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    classfiction: React.PropTypes.object,
  };
  handleconfigDiyMenu() {
    this.props.dispatch(
      addDiyLink(this.props.classfiction.diyLinkUrl,
        this.props.classfiction.diyLinkName));
  }
  render() {
    return (
      <div>
        <List style={{ width: '100%', textAlign: 'center' }}>
          链接自定义
          <TextField
            hintText="请配置URL"
            onChange={(e, value) =>
              this.props.dispatch(compeleDIYData('diyLinkUrl', value))}
          />
          <TextField
            hintText={'请配置链接名称'}
            onChange={(e, value) =>
              this.props.dispatch(compeleDIYData('diyLinkName', value))}
          />
          <RaisedButton
            label="配置到Menu" primary
            onClick={() => this.handleconfigDiyMenu()}
          />
        </List>
        <Divider style={{ height: '15px', width: '100%' }} />
        <List style={{ width: '100%', textAlign: 'center' }}>
          <h3 >DAILY NEW</h3>
          <RaisedButton
            label="配置到Menu" primary
            onClick={() => this.props.dispatch({ type: ADD_DALIYNEW })}
          />
        </List>
      </div>
    );
  }
}
