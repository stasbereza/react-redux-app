import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect} from 'react-router-dom';
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles
} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SignUpForm from './SignUpForm';
import ItemsList from './ItemsList';
import { fetchItems } from './redux/actions';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Lato', 'Playfair Display', 'sans-serif'].join(', ')
  }
});
const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    maxWidth: 1024,
    minHeight: 1024,
    backgroundColor: '#ECF6FE'
  }
}));

const App = ({ fetchItems }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchItems();
  });

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.container} maxWidth="lg">
        <Switch>
          <Route path="/signup" component={SignUpForm} />
          <Route path="/users" component={ItemsList} />
          <Redirect to="signup" />
        </Switch>
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = state => ({
  authenticated: state.signedUp
});

export default connect(mapStateToProps, { fetchItems })(App);
