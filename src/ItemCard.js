import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  Typography
} from '@material-ui/core';
import { updateItemStatus } from './redux/actions';

const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative',
    display: 'flex',
    width: 920,
    height: 300
  },
  avatar: {
    width: 162,
    height: 162,
    alignSelf: 'center',
    margin: theme.spacing(4),
    padding: theme.spacing(2)
  },
  title: {
    marginBottom: 44,
    fontSize: 30,
    letterSpacing: 0.75,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#909090'
  },
  pos: {
    fontSize: 30,
    letterSpacing: 0.75,
    color: '#747474'
  },
  ind: {
    marginBottom: theme.spacing(2),
    fontSize: 30,
    letterSpacing: 0.75,
    color: '#747474'
  },
  label: {
    fonSize: 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0.4,
    color: '#747474'
  }
}));

const ItemCard = ({
  id,
  name,
  position,
  industry,
  onVacation,
  updateItemStatus
}) => {
  const classes = useStyles();

  const [state, setState] = useState({
    isChecked: false
  });

  useEffect(() => {
    if (onVacation) {
      setState({
        isChecked: true
      });
    }
  }, [onVacation]);

  const handleChange = name => event => {
    const checked = event.target.checked;

    setState({ ...state, [name]: checked });

    updateItemStatus({ id: id, onVacation: !state.isChecked });
  };

  return (
    <Card item className={classes.card}>
      <Avatar src="" alt={name} className={classes.avatar}>
        Avatar
      </Avatar>
      <CardContent className={classes.content}>
        <Typography className={classes.title}>{name}</Typography>
        <Typography className={classes.pos}>{position}</Typography>
        <Typography className={classes.ind}>{industry}</Typography>
        <FormControlLabel
          className={classes.label}
          control={
            <Switch
              checked={state.isChecked}
              onChange={handleChange('isChecked')}
              value="isChecked"
              className={classes.switch}
              color="primary"
            />
          }
          label="On Vacation"
        />
      </CardContent>
    </Card>
  );
};

export default connect(null, { updateItemStatus })(ItemCard);
