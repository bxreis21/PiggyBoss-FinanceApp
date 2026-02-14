import React, { useState } from 'react';
import { Tabs, Tab, Box, colors } from '@mui/material';

export default function SelectTabs({ options = [], onSelect, def = "all", styles, indicator = true }) {

  const [selectedIndex, setSelectedIndex] = useState(def);

  const handleChange = (event, newIndex) => {
    setSelectedIndex(newIndex);
    onSelect?.(options[newIndex]);
  };

  return (
    <Box sx={{ width: '100%', display: "flex", justifyContent: "center", alignItems: "center", ...styles }}>
      <Tabs
        value={selectedIndex}
        onChange={handleChange}
        textColor="inherit" 
        scrollButtons="auto"
        variant="scrollable"
        slotProps={{
          indicator: {
            sx: {
              backgroundColor: indicator ? '#f1109b' : "transparent"
            }
          }
        }}
      > 
        
        {options.map((opt, idx) => (
          <Tab
            key={idx}
            label={opt}
            sx={{
              color: indicator ? "#FF66C4" : "#F5F5F5",
              '&.Mui-selected': {
                color:'#FF66C4',
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  )
}