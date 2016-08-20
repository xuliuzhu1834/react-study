import React,
{
  Component, PropTypes,
} from 'react';
import { findDOMNode } from 'react-dom';
import {
  DragSource as drageSource,
  DropTarget as dropTarget,
} from 'react-dnd';
import { ListItem, Divider } from 'material-ui';
import { blue500 } from 'material-ui/styles/colors';

import { TYPES } from './types';

const dragSourceSpec = {
  /*
   props 组件当前的 props
   monitor 是一个 DragSourceMonitor 实例，用来查询当前 drag state 的信息。
   component 表示当前组件，可以省略。
   */
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
  // endDrag(props,monitor,component){
  //
  // },
  // canDrag(props,monitor){
  //
  // },
  // isDragging(props,monitor){
  //
  // }

};

const dragAndDropCollect = {
// 返回一个 object，这个 object 可以会注入到组件的 props 中。
  /*
   connect 一个 DragSourceConnector/DropTargetConnector 实例，
   可以用 connect.dragSource()/connect.dropTarget() 来封装我们的组件。

   monitor 一个 DragSourceMonitor/DropTargetMonitor 实例，用来查询当前拖拽的信息。
   * */
  dropTargetCon(connect) {
    return { connectDropTarget: connect.dropTarget() };
  },
  dragSourceCon(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    };
  },

};


// 被拖动的组件
// class Blocks extends Component{
//
// }
const dropTargetSpec = {
  /*
   * props 组件当前的 props
   * monitor 是一个 DropTargetMonitor 实例，用来查询当前 drag state 的信息。
   * component 表示当前组件，可以省略。
   * */

  drop(props, monitor, component){
    console.log(monitor.getItem());
  },

  hover(props, monitor, component){
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    if (dragIndex === hoverIndex) {
      return;
    }
    // 确定目标在窗口中得位置
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    // 获取垂直的中间位置
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 4;

    // 确定鼠标位置
    const clientOffset = monitor.getClientOffset();
    // 获取顶部像素
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    console.log((dragIndex > hoverIndex ) + ":" + (hoverMiddleY > hoverClientY));

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      // props.moveCard(dragIndex,hoverIndex);
      return;

    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      // props.moveCard(dragIndex,hoverIndex);
      return;
    }
    props.moveCard(dragIndex, hoverIndex);
    // Note: we're mutating the monitor item here!
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;

  },

  // canDrop(props,monitor){}

};

// 接受拖动组件

@dropTarget(TYPES.CARD,
  dropTargetSpec,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver,
    canDrop: monitor.canDrop,
  }))
@drageSource(TYPES.CARD,
  dragSourceSpec,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))
export default class extends Component {
  static propType = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired,
    insertCard: PropTypes.func.isRequired,
    nestedItem: PropTypes.array.isRequired,
    canDrop: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired,
  };

  render() {
    const {text, connectDropTarget, connectDragSource, isDragging, canDrop, isOver,}=this.props;
    const opacity = isDragging ? 0.5 : 1;
    const isActive = canDrop && isOver;
    let backgroungColor = "";
    if (isActive) {
      backgroungColor = blue500;
    }
    return connectDragSource(
      connectDropTarget(
        <div >
          <ListItem primaryText={text} style={{opacity, backgroungColor}}/>
          <Divider style={{height: "10px"}}/>

        </div>
      )
    )
  }

}
// Card.propTypes = {
//
// };
