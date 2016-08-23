import React, { Component } from 'react';
import { RaisedButton, Paper } from 'material-ui';

const style = {
  margin: 12,
};
export default class NavigationEditToggle extends Component {
  showPreview() {
    document.getElementById('navigationEdit').style.display = 'none';
    document.getElementById('navigationTable').style.display = 'block';
  }

  showPreview2() {
    document.getElementById('navigationTable').style.display = 'none';
    document.getElementById('navigationEdit').style.display = 'block';
  }
  render() {
    return (
      <Paper zDepth={5}>
        <RaisedButton
          style={style}
          label="配置页面"
          onClick={() => this.showPreview()}
        />
        <RaisedButton
          style={style}
          label="编辑菜单"
          onClick={() => this.showPreview2()}
        />
      </Paper>
    );
  }
}
