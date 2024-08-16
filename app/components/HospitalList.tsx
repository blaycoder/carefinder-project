import { Hospital } from '../types';
import { List, ListItem, ListItemText } from '@mui/material';

interface Props {
  hospitals: Hospital[];
}

const HospitalList = ({ hospitals }: Props) => {
  return (
    <List>
      {hospitals.map((hospital) => (
        <ListItem key={hospital.id}>
          {" "}
          <ListItemText
            primary={hospital.name}
            secondary={hospital.address}
          />{" "}
        </ListItem>
      ))}{" "}
    </List>
  );
};

export default HospitalList;