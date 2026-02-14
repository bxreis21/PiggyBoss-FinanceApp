import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function SimpleRadio({label, options, width, height}) {

    if(!options || options.length === 0) {
        options = ['option1']
    }

    return (
    <FormControl sx = {{ width: "100%", display: 'flex', justifyContent: 'space-around', alignItems: 'center',}}> 
        <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        sx = {{
           display: 'flex',
           justifyContent: 'space-around',
           alignItems: 'center',
           width : width || "100%",
           height : height || "100%",
          
          }}
        >
        {options.map((opt, index) => (
          <FormControlLabel key={index} value={opt} control={<Radio sx = {{ color: '#FF66C4', '&.Mui-checked': { color: '#9B59B6' }}} /> } label={opt} />
        ))}
        </RadioGroup>
    </FormControl>
  );
}