import React from 'react';
import { Paper, List, ListItem } from 'material-ui';

const MenusDetails = (menusDetails) => {
  const handleClick = (value) => {
    console.log(value);
  };
  return (
    <Paper
      style={{ width: '78%', height: '600px', float: 'left', marginLeft: '2%' }}
    >
      <List style={{ width: '100%', textAlign: 'center', position: 'relative' }}>
        {
          menusDetails.map((item) =>
            <ListItem primaryText={item} onClick={(e) => handleClick(e.target.value)} />
          )
        }
      </List>
    </Paper>
  );
};
export default MenusDetails;
