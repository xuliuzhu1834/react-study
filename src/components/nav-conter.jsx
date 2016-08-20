import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ImageAddToPhotos from 'material-ui/svg-icons/image/add-to-photos';

import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
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
const RadioButtonExampleSimple = () => (
  <RadioButtonGroup
    name={'shipSpeed'}
    defaultSelected={'not_light'}
    className={style.radioButton}
  >
    <RadioButton
      value={'light'}
      label={'黑色'}
      style={styles.radioButton}
      inputStyle={styles.radioInput}
    />
    <RadioButton
      value={'not_light'}
      label={'红色'}
      style={styles.radioButton}
    />
  </RadioButtonGroup>
);

const IconButtonExampleSimple = () => (
  <div className={style.fileIcon}>
    <ImageAddToPhotos />
  </div>
);

export default class DialogExampleSimple extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, imgSrc: '' };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  showPreview(source) {
    const file = source.files[0];
    if (window.FileReader) {
      const fr = new FileReader();
      fr.onloadend = (e) => {
        this.setState({
          imgSrc: e.target.result,
        });
      };
      fr.readAsDataURL(file);
    }
  }

  handleinputChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const actions = [
      <FlatButton
        label={'删除菜单'}
        primary
        onTouchTap={() => this.handleClose()}
      />,
      <FlatButton
        label={'确定'}
        primary
        keyboardFocused
        onTouchTap={() => this.handleClose()}
      />,
      <FlatButton
        label={'取消'}
        primary
        onTouchTap={() => this.handleClose()}
      />,
    ];

    return (
      <div style={{ position: 'absolute', right: 10, top: 5 }}>
        <RaisedButton label={'编辑'} onTouchTap={() => this.handleOpen()} />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={() => this.handleClose()}
          bodyClassName={style.bodyStyleBg}
        >
          <div className={style.categoryNamabg}>
            <input
              type={'text'} className={style.categoryNama}
              value={this.state.value} defaultValue={'dress'}
              onChange={(event) => this.handleinputChange(event)}
            />
            <span className={style.categoryOriginal}> 原始名称</span>
          </div>
          <input
            type={'text'} className={style.fileInputurl}
            value={this.state.value}
            defaultValue={'http://www.shein.com/SheIn-Exclusives-vc-3305.html'}
            onChange={(event) => this.handleinputChange(event)}
          />
          <div className={style.fileInputcon}>
            < IconButtonExampleSimple />
            <img
              id={'portrait'} src={this.state.imgSrc} role={'presentation'} width={50} height={50}
              style={{ display: this.state.imgSrc ? 'inline-block' : 'none' }}
            />
            <bottom className={style.fileInputBg} type={'button'}>上传图片</bottom>
            <input
              className={style.fileInput} type={'file'} name={'file'}
              onChange={(e) => this.showPreview(e.target)}
            />
          </div>
          <input
            type={'text'} className={style.fileInputurl}
            value={this.state.value}
            defaultValue={'http://www.shein.com/SheIn-Exclusives-vc-3305.html'}
            onChange={(event) => this.handleinputChange(event)}
          />
          <div className={style.fileInputcon}>
            < IconButtonExampleSimple />
            <img
              id={'portrait'} src={this.state.imgSrc} role={'presentation'} width={50} height={50}
              style={{ display: this.state.imgSrc ? 'inline-block' : 'none' }}
            />
            <bottom className={style.fileInputBg} type={'button'}>上传图片</bottom>
            <input
              className={style.fileInput} type={'file'} name={'file'}
              onChange={(e) => this.showPreview(e.target)}
            />
          </div>
          < RadioButtonExampleSimple />

        </Dialog>
      </div>
    );
  }
}
