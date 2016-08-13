import React from "react";
import {render} from "react-dom";
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import DropDownMenu from "material-ui/DropDownMenu";
const style={
  toolBar:{
      backgroundColor:"#FFF",
  },
    toolBar_select:{
      border:"none"
    }
};
export class Toptoolbar  extends React.Component {
    constructor(props){
        super(props);
        this.state={
            value:0,
            menuId:"menu_1",
        };
    }
    handleChange (event, index, value) {
        console.log(value);
        this.setState(Object.assign({},()=>state,{value}));
    }
    render() {
        return (
            <Toolbar style={style.toolBar}>
                <ToolbarGroup firstChild={true} style={{width:"100%"}}>
                    <DropDownMenu value={this.state.value}  onChange={(event, index, value)=>this.handleChange(event,index,value)}>
                        <MenuItem value={0} primaryText="请配置站点"/>
                        <MenuItem value={1} primaryText="SHEIN PC EN"/>
                        <MenuItem value={2} primaryText="SHEIN PC DE"/>
                        <MenuItem value={3} primaryText="SHEIN PC FR"/>
                        <MenuItem value={4} primaryText="SHEIN PC ES"/>

                    </DropDownMenu>
                    <ToolbarGroup firstChild={true} style={{width:"70%"}}>
                <SelectField menuId={this.state.menuId} underlineShow={false} style={{backgroundColor:"#fff"}}
                             onChange={(event, index, value)=>this.handleChange(event,index,value)}>
                    <MenuItem menuId={"menu_1"} primaryText="菜单一"/>
                    <MenuItem menuId={"menu_2"} primaryText="菜单二 PC EN"/>
                    <MenuItem menuId={"menu_3"} primaryText="菜单三 PC DE"/>
                    <MenuItem menuId={"menu_4"} primaryText="菜单四 PC FR"/>
                    <MenuItem menuId={"menu_5"} primaryText="菜单五 PC ES"/>
                </SelectField>
                    <RaisedButton label="修改名称" style={{maxWidth:"250px"}}></RaisedButton>
                    <RaisedButton label="生效" primary={true} style={{maxWidth:"250px"}}></RaisedButton>
                    <RaisedButton label="预览" disabled={true} style={{maxWidth:"250px"}}></RaisedButton>
                    <RaisedButton label="删除" secondary={true} style={{maxWidth:"250px"}}></RaisedButton>
                        </ToolbarGroup>
                </ToolbarGroup>
            </Toolbar>
        )
    }
}
