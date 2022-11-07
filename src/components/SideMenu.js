import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer, Avatar, List, ListItem } from '@mui/material';
import { ListItemText, ListItemAvatar } from '@mui/material';
import { Payment } from '@mui/icons-material';

const SideMenu = ({ main, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer {...props}>
      <List>
        <ListItem
          sx={{ textTransform: 'uppercase' }}
          selected={location.pathname === '/payments'}
          onClick={() => navigate('/payments')}
          button
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Payment />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            sx={{ display: { xs: 'none', md: 'block' } }}
            secondary='Payments'
          />
        </ListItem>
      </List>
    </Drawer>
  )
};

export default SideMenu;
