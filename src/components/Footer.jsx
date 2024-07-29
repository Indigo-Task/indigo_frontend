import { Box, Link, List, ListItem, Typography, useTheme } from '@mui/material'
import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Footer = () => {
  const themes = useTheme()
  return (
    <Box width='100%' style={{ height: '200px', display: 'flex', alignItems: 'center', backgroundColor: 'white', zIndex: 10, justifyContent: 'space-around', fontFamily: 'sans-serif', padding: '20px'}}>
        <Box>
            <Typography fontSize={30} color={'#004098'}>GoStats</Typography>
            <Typography fontSize={16} color={'#004098'}>Tracking flights made easy!!!</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
            <GitHubIcon sx={{ height: '40px', width: '40px' , color: "#004098"}} />
            <LinkedInIcon sx={{ height: '40px', width: '40px', color: "#004098"}} />
            </Box>

        </Box>
        <Box>
            <List>
                <ListItem><Link to="#" >Contact Support</Link></ListItem>
                <ListItem><Link to="#" >Terms And Conditions</Link></ListItem>
                <ListItem><Link to="#" >User Manual</Link></ListItem>
            </List>
        </Box>
    </Box>
  )
}

export default Footer