import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ItemCard from './ItemCard';

const useStyles = makeStyles(theme => ({
  gridList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 960
  }
}));

const ItemsList = props => {
  const classes = useStyles();

  return (
    <Grid container spacing={1} className={classes.gridList}>
      {props.items.map(item => (
        <Grid item key={item.id}>
          <ItemCard {...item} />
        </Grid>
      ))}
    </Grid>
  );
};

const mapStateToProps = state => ({
  items: state.items
});

export default connect(mapStateToProps)(ItemsList);
