import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import { fetchParams, compeleCateData, msgDataChange } from '../actions/O-navigation-action';
import {
  EDIT_EVERY_CATE, CATE_IMG_UPLOAD, DEL_EVERY_CATE,
} from '../constans/O-navigation-actiontypes';

import style from '../css/nav-conter.css';

const styles = {
  radioButton: {
    display: 'inline-block',
    width: 95,
    textAlign: 'left',
  },
  radioInput: {
    marginRight: 0,
  },
};

const DialogExampleSimple = (props) => {
  const {
    dispatch,
  } = props;
  if (!props.open) return null;
  const actions = [
    <FlatButton
      label={'删除菜单'}
      primary
      onTouchTap={() => {
        dispatch({
          type: DEL_EVERY_CATE,
          id: props.items.id,
        });
        dispatch(compeleCateData('open', false));
      }}
    />,
    <FlatButton
      label={'确定'}
      primary
      keyboardFocused
      onTouchTap={() => {
        if (props.nameValue === '') return;
        dispatch({
          type: EDIT_EVERY_CATE,
          data: {
            category_title: props.nameValue,
            category_color: props.color,
            category_image: props.imageMsgs,
          },
          id: props.items.id,
        });
        dispatch(compeleCateData('open', false));
      }}
    />,
    <FlatButton
      label={'取消'}
      primary
      onTouchTap={() => dispatch(compeleCateData('open', false))}
    />,
  ];

  const showPreview = (source, index) => {
    const file = source.files[0];
    if (!file) return;
    if (window.FileReader) {
      const fr = new FileReader();
      fr.onloadend = (e) => {
        dispatch(fetchParams(CATE_IMG_UPLOAD, {
          thumb: e.target.result,
          index,
        }));
      };
      fr.readAsDataURL(file);
    }
  };
  return (
    <div className={style.oneCategoryEditBg}>
      <Dialog
        actions={actions}
        modal
        open={props.open}
        onRequestClose={() => dispatch(compeleCateData('open', false))}
        bodyClassName={style.bodyStyleBg}
      >
        <div className={style.categoryNamabg}>
          <input
            type="text" className={style.categoryNama}
            value={props.nameValue}
            placeholder={props.items.category_title}
            onChange={(e) => dispatch(compeleCateData('nameValue', e.target.value))}
          />
          <span className={style.categoryOriginal}>
              原始名称:{props.items.category_raw_title}
          </span>
        </div>
        <div>
          {
            props.level === 1 ? Array(2).fill(0).map((_, index) => (
              <div className={style.fileInputcon} key={index}>
                <div className={style.fileInputleft}>
                  {
                    props.imageMsgs[index].target ? <img
                      src={props.imageMsgs[index].target} role="presentation"
                      height={200}
                    /> : null
                  }
                </div>
                <input
                  type="text" className={style.fileInputurl}
                  value={props.imageMsgs[index].imgUrl}
                  onChange={(event) =>
                    dispatch(msgDataChange(index, 'imgUrl', event.target.value))}
                  placeholder={'图片链接'}
                />
                <input
                  type="text" className={style.fileImgAlt}
                  value={props.imageMsgs[index].alt}
                  onChange={(event) =>
                    dispatch(msgDataChange(index, 'alt', event.target.value))}
                  placeholder={'图片描述'}
                />
                <bottom className={style.fileInputBg} type={'button'}>上传图片</bottom>
                <input
                  className={style.fileInput} type="file" name={'file'}
                  onChange={(e) => showPreview(e.target, index)}
                />
              </div>
            )) : null
          }
        </div>
        <RadioButtonGroup
          name={'shipSpeed'}
          defaultSelected={'1'}
          className={style.radioButton}
          onChange={(e, value) => dispatch(compeleCateData('color', value))}
        >
          <RadioButton
            value={'1'}
            label={'黑色'}
            style={styles.radioButton}
            inputStyle={styles.radioInput}
          />
          <RadioButton
            value={'2'}
            label={'红色'}
            style={styles.radioButton}
          />
        </RadioButtonGroup>
      </Dialog>
    </div>
  );
};

DialogExampleSimple.propTypes = {
  level: PropTypes.number,
  dispatch: PropTypes.func,
  items: PropTypes.object,
  open: PropTypes.bool,
  nameValue: PropTypes.string,
  imageMsgs: React.PropTypes.array,
};

export default DialogExampleSimple;

