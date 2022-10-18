import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';


const Dropdown = function ({dropdownlist, root} ) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const arr = [];
  for (let i = 0; i < dropdownlist.length; i++){
    
    const name = dropdownlist[i].name;
    const url = dropdownlist[i].url;
    arr.push(<MenuItem onClick={handleClose}><a href={url}> {name}</a></MenuItem>)
  }
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ArrowDropDownCircleIcon/>} 
      >
        {root}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {arr}
      </Menu>


    </div>
  );


}

   
export default Dropdown;
