import React from 'react';
// import {render} from 'react-dom'
import {
  RaisedButton, Paper, Subheader, List, ListItem, TextField, Divider, Checkbox,
} from 'material-ui';
import css from '../css/nav-conter.css';
// import MenusDetails from './O-navigation-menus-details.jsx';


export default class Classification extends React.Component {
  static propTypes = {
    revCates: React.PropTypes.array,
  };
  loopList(count = []) {
    const items = [];
    for (let i = 0; i < count; i++) {
      count.map((item) => (
        items.push(
          <ListItem
            key={item.cate} initiallyOpen={false} primaryTogglesNestedList primaryText={item.cate}
            leftCheckbox={<Checkbox />}
          />
          )
      ));
    }
    console.log(items);
    return items;
  }
  // handleCateConf(children){
  //   this.props.dispatch();
  // }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <Paper zDepth={1} style={{ width: '20%', float: 'left' }}>

          <List style={{ width: '100%', textAlign: 'center', padding: '20 0' }}>
            <Subheader>一级分类</Subheader>
            <Divider />
            <List className={css.navLeftconter}>
              {
                this.props.revCates.map((item) => (
                  <ListItem
                    key={item} initiallyOpen={false} primaryTogglesNestedList primaryText={item}
                    nestedItems={this.loopList(item.children)}
                  />
                  ))
              }


              <ListItem
                key={"T-shirt"} initiallyOpen={false} primaryTogglesNestedList primaryText="T-shirt"
                leftCheckbox={<Checkbox />}
              />
              <ListItem
                key={"x-shirt"} initiallyOpen={false} primaryTogglesNestedList primaryText="x-shirt"
                nestedItems={[]}
                leftCheckbox={<Checkbox />}
              />
            </List>
            <RaisedButton label="配置到Menu" secondary backgroundColor="#000" labelColor="#fff" />
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
            <RaisedButton label="配置到Menu" secondary backgroundColor={'#000'} labelColor="#fff" />
          </List>
          <Divider style={{ height: '15px', width: '100%' }} />
          <List style={{ width: '100%', textAlign: 'center' }}>
            <h3 >DAILY NEW</h3>
            <RaisedButton label="配置到Menu" secondary backgroundColor={'#000'} labelColor="#fff" />
          </List>

        </Paper>
        {/*<MenusDetails />*/}
      </div>

    );
  }
}
