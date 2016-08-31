import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import style from '../css/nav-conter.css';

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
      <Paper zDepth={5} className={style.tablePreviewBg}>
        <RaisedButton
          secondary className={style.tablePreview}
          label="配置页面"
          onClick={() => this.showPreview()}
        />
        <RaisedButton
          primary className={style.tablePreview}
          label="编辑菜单"
          onClick={() => this.showPreview2()}
        />
      </Paper>
    );
  }
}
