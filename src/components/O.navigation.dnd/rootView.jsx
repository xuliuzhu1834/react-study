//根组件
import React ,{Component}from "react";
import update from"react/lib/update";
import HTML5Backend from "react-dnd-html5-backend";
import Card from"./dndView.jsx";
import {DragDropContext} from"react-dnd";
import {List,ListItem} from "material-ui/List";

@DragDropContext(HTML5Backend)
export default class  extends Component {
    constructor(props) {
        super(props);
        this.moveCard = (...args)=> this.__moveCard(...args);
        this.insertCard = (...args)=>this.__insertCard(...args);
        this.state = {
            cards: [
                {
                    id: 0, text: "刀",level:1,items:[
                        {
                            id:"0-2-1",text:"铁刀",level:2,items:[{
                                id: "0-3-1", text: "粗糙的铁刀", level: 3
                            },{
                                id: "0-3-2", text: "精致的铁刀", level: 3
                            },{
                                id: "0-3-3", text: "完美的铁刀", level: 3
                            }]
                        },{
                            id:"0-2-2",text:"银刀",level:2,items:[{
                                id:"0-3",text:"大刀",level:3

                            }]
                        },{
                            id:"0-2-3",text:"金刀",level:2
                        }]

                },
                {id: 1, text: "剑",level:1},
                {id: 2, text: "枪",level:1},
                {id: 3, text: "弓",level:1},
                {id: 4, text: "杖",level:1}
                ]
        };
    }

    __moveCard(dragIndex, hoverIndex) {
        const {cards} = this.state;
        const dragCard = cards[dragIndex];
        this.setState(update(this.state, {
                cards: {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard]
                    ]
                }
            }
        ));

    }
    __insertCard(dragId,hoverId){
        const {cards} =this.state;
        const dragCard = cards[dragId];
        const hoverCard = cards[hoverId];
        if(hoverCard.items){
            cards[hoverId] =  hoverCard.items.push(dragCard)
        }else{
            cards[hoverId].items = dragCard;
        }
        console.log(cards);
        this.setState(cards);
    }
    render() {
        const {cards} =this.state;
        return (
            <List>
                {
                    cards.map((card, i)=> {

                        return (
                            <Card key={card.id} index={i} id={card.id} text={card.text} moveCard={this.moveCard} insertCard={this.insertCard} nestedItem={card.items}/>

                        )
                    })
                }
            </List>
        )
    }
};
