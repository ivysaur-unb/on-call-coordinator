import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { useContext } from "react";
import { UserContext } from '../App'


const Dropdown = function ({ dropdownlist, root, role = ['ANY'] }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = useContext(UserContext);

  if (!(Array.from(role).includes(user.role) || Array.from(role).includes('ANY'))) {
    return <></>
  }



  //console.log(user.role in role);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const arr = [];
  for (let i = 0; i < dropdownlist.length; i++) {

    const name = dropdownlist[i].name;
    const url = dropdownlist[i].url;
    const role = dropdownlist[i].role;
    if (role == undefined || role.includes('ANY') || role.includes(user.role)) {
      arr.push(<MenuItem onClick={handleClose}><a href={url} key={i}> {name}</a></MenuItem>)
    }
  }
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ArrowDropDownCircleIcon />}

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
