import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function SimpleCard({ title, value, card_style, card_content_style  }) {
  return (
    <Card sx={{ 
      minWidth: 200, 
      borderRadius: 2, 
      boxShadow: 3, 
      bgcolor : "#16102f", 
      ...card_style
    }}>
      <CardContent  align="center" sx={{
        height : "100%",
        display : "flex",
        flexDirection : "column",
        justifyContent : "flexStart",
        padding : "3% 0 0 5%",
        ...card_content_style
      }}>
        <Typography variant="h8" component="div" gutterBottom sx={{ color: "#f5f5f5", paddingBottom: "2%" }} align='left'>
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ color: "#f5f5f5" }} align='left'>
          $ {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
