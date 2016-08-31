import React from 'react';
import { ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Tree } from 'tea-ui';
import style from '../css/nav-conter.css';
import NavConterEdit from './nav-conter.jsx';
import {
  fetchParams, genCateDetailData,
  compeleCateData, initCateEditData,
} from '../actions/O-navigation-action';
import { CATEGORYS_DETAILS_SAVE } from '../constans/O-navigation-actiontypes';

export default class MenuDetails extends React.Component {
  static propTypes={
    dispatch: React.PropTypes.func,
    getMsg: React.PropTypes.object,
    classfiction: React.PropTypes.object,
    navConter: React.PropTypes.object,
  };
  loopLists(count = []) {
    return count.map((item) => (
      <ListItem
        key={`${item.id}_list_${item.id}`}
        primaryTogglesNestedList
        initiallyOpen={false}
        secondaryText={`原始名称：${item.category_raw_title}`}
        primaryText={item.category_title}
        nestedItems={this.loopLists(item.category_children)}
      />
      )
    );
  }
  handleSave() {
    this.props.dispatch(
      fetchParams(CATEGORYS_DETAILS_SAVE, this.props.getMsg.revCategorysDetails)
    );
  }
  renderListItems() {
    const { revCategorysDetails } = this.props.getMsg;
    return this.loopLists(revCategorysDetails.category_children);
  }
  render() {
    if (this.props.getMsg.cateDetailState === 2) {
      return (
        <Paper className={style.categoryEditBg}>
          <div className={style.categoryEdit}>
            <Tree
              dataSource={this.props.getMsg.revCategorysDetails.category_children}
              render={(args, level) =>
                <div className={style.categoryBorder}>
                  {args.category_title}
                  <span title={level} className={style.categoryprimitive}>
                    {args.category_raw_title} / level:{level}
                  </span>
                  <RaisedButton
                    label={'编辑'} primary className={style.oneCategoryEdit}
                    onTouchTap={() => {
                      this.props.dispatch(initCateEditData(args));
                      this.props.dispatch(compeleCateData('open', true));
                      this.props.dispatch(compeleCateData('items', args));
                      this.props.dispatch(compeleCateData('level', level));
                    }}
                  />
                </div>}
              dataShouldChange={
                (type, source, targetParent) => { console.log(targetParent); return true; }
              }
              dataSourceDidChange={(arg) => this.props.dispatch(genCateDetailData(arg))}
              styles={{
                border: '1px solid #E5E5E5',
                backgroundColor: '#FAFAFA',
                color: '#000',
                height: 36,
                lineHeight: '36px',
                padding: '5px 8px',
                position: 'relative',
              }}
              alias={{ children: 'category_children' }}
              paddingUnit={50}
            />
          </div>
          <RaisedButton
            label="保存" primary
            className={style.categorySave}
            onClick={(e) => this.handleSave(e)}
          />
          <NavConterEdit {...this.props.navConter} dispatch={this.props.dispatch} />
        </Paper>
      );
    }
    return null;
  }
}
