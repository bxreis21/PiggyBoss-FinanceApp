import { Card, CardContent, Typography, List, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import styles from "./SelectBox.module.css"

export default function SelectBox({ label, options, titlebuttonlabel, titlebuttoncallback, selectcallback, cardstyle, itemstyle }) {
  const [selected, setSelected] = useState(0);

  return (
    <Card
      sx={{
        backgroundColor : "#16102f",
        borderRadius : "15px",
        color: 'white',
        ...cardstyle
      }}>
      <CardContent style={{ height: "100%"}}>
        <Typography variant="h6" gutterBottom 
          style ={{
            marginBottom: "20px", 
            display: "flex",
            justifyContent: "space-between",
            alignItemsc: "center"
          }}
        > 
          {label}
          <button
            onClick={titlebuttoncallback}
            className={styles["title-button-label"]}
          >
            {titlebuttonlabel}
          </button>
        </Typography>
        <div className = {styles["list"]}>
          {options.map((option, index) => (
                <ListItemButton
                key={index}
                selected={selected === index}
                onClick={() => {setSelected(index); selectcallback(option)} }
                sx={{
                  borderRadius: "10px",
                  '&:hover': {
                    backgroundColor: '#f1109b',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#f1109b',
                  },
                  marginTop : "2%"
                }}
                >
              <ListItemText primary={option} />
            </ListItemButton>
          ))}
        </div>
      </CardContent>
    </Card>
  ); 
};
