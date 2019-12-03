import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  InputLabel,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { signUp } from './redux/actions';

const useStyles = makeStyles(theme => {
  return {
    form: {
      position: 'absolute',
      top: '10%',
      left: '25%',
      width: 470,
      height: 790,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding: theme.spacing(4),
      background: '#fff'
    },
    heading: {
      marginLeft: theme.spacing(1),
      fontFamily: 'Playfair Display',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 25,
      color: '#161616',
      lineHeight: '33px'
    },
    textFieldsBlock: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },
    textField: {
      width: 212,
      height: 47,
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(1)
    },
    textField1: {
      width: '100%',
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1)
    },
    formControlSelect: {
      width: 212,
      margin: theme.spacing(1),
      marginTop: theme.spacing(2)
    },
    formControlTextField: {
      margin: theme.spacing(1)
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    helperText: {
      minHeight: 0
    },
    formControlCheckboxes: {
      marginLeft: theme.spacing(1)
    }
  };
});

const INITIAL_VALUES_STATE = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  amount: '',
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
  showPassword: false,
  showConfirmPassword: false
};

const INITIAL_CHECKBOXES_STATE = {
  check1: false,
  check2: false
};

const SignUpForm = props => {
  const classes = useStyles();

  const [values, setValues] = useState({
    ...INITIAL_VALUES_STATE
  });

  const [check, setCheckboxes] = useState({
    ...INITIAL_CHECKBOXES_STATE
  });

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  // useEffect(() => {
  //   resetFormState();
  // })

  useEffect(() => {
    checkAuthentication();
  });

  const checkAuthentication = () => {
    const { authenticated, history } = props;

    if (authenticated) {
      history.push('/users');
    }
  };
  const handleChange = prop => event => {
    const value = event.target.value;

    setValues({ ...values, [prop]: value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleCheckboxChange = prop => event => {
    const checked = event.target.checked;

    setCheckboxes({ ...check, [prop]: checked });
  };

  const handleSubmit = event => {
    event.preventDefault();

    const { signUp } = props;
    const {
      firstName,
      lastName,
      phoneNumber,
      amount,
      email,
      confirmEmail,
      password,
      confirmPassword
    } = values;

    signUp({
      firstName,
      lastName,
      phoneNumber,
      amount,
      email,
      confirmEmail,
      password,
      confirmPassword
    });

    resetFormState();
  };

  const resetFormState = () => {
    const { error } = props;

    if (!error) {
      setValues({ ...INITIAL_VALUES_STATE });
      setCheckboxes({ ...INITIAL_CHECKBOXES_STATE });
    }
  };

  const setError = field => {
    if (field === 'firstName') {
      return 'First Name must contain at least 2 and max 12 chars!';
    }

    if (field === 'lastName') {
      return 'Last Name must contain at least 2 and max 12 chars!';
    }

    if (field === 'amount') {
      return 'Please, select the amount!';
    }

    if (field === 'password') {
      return 'Password must contain at least 8 chars!';
    }

    if (field === 'confirmEmail') {
      return 'Email Addresses are not equal!';
    }

    if (field === 'confirmPassword') {
      return 'Passwords are not equal!';
    }

    return null;
  };

  return (
    <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
      <Typography className={classes.heading} variant="h1" component="h3">
        Sign up
      </Typography>
      <div className={classes.textFieldsBlock}>
        <TextField
          required
          error={props.error !== null && props.error === setError('firstName')}
          id="first-name"
          label="First Name"
          value={values.firstName}
          helperText={
            props.error === setError('firstName') && setError('firstName')
          }
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={handleChange('firstName')}
        />
        <TextField
          required
          error={props.error !== null && props.error === setError('lastName')}
          id="last-name"
          label="Last Name"
          value={values.lastName}
          helperText={
            props.error === setError('lastName') && setError('lastName')
          }
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={handleChange('lastName')}
        />
        <TextField
          required
          error={null}
          id="phone-number"
          label="Phone Number"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={handleChange('phoneNumber')}
        />
        <FormControl
          required
          variant="outlined"
          error={props.error !== null && props.error === setError('amount')}
          className={classes.formControlSelect}>
          <InputLabel ref={inputLabel} id="select-outlined-label">
            Amount to invest
          </InputLabel>
          <Select
            labelId="select-outlined-label"
            id="select-outlined"
            value={values.amount}
            labelWidth={labelWidth}
            onChange={handleChange('amount')}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText className={classes.helperText}>
            {props.error === setError('amount') && setError('amount')}
          </FormHelperText>
        </FormControl>
      </div>
      <TextField
        required
        id="email"
        label="Email Address"
        value={values.email}
        className={classes.textField1}
        margin="normal"
        variant="outlined"
        onChange={handleChange('email')}
      />
      <TextField
        required
        error={props.error !== null && props.error === setError('confirmEmail')}
        id="outlined-confirm-email"
        label="Confirm Email Address"
        className={classes.textField1}
        helperText={
          props.error === setError('confirmEmail') && setError('confirmEmail')
        }
        margin="normal"
        variant="outlined"
        onChange={handleChange('confirmEmail')}
      />
      <FormControl
        required
        fullWidth
        className={classes.formControlTextField}
        variant="outlined">
        <InputLabel htmlFor="password" ref={inputLabel}>
          Password
        </InputLabel>
        <OutlinedInput
          id="password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end">
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={80}
        />
      </FormControl>
      <FormControl
        required
        fullWidth
        error={
          props.error !== null && props.error === setError('confirmPassword')
        }
        className={classes.formControlTextField}
        variant="outlined">
        <InputLabel htmlFor="confirm-password" ref={inputLabel}>
          Confirm Password
        </InputLabel>
        <OutlinedInput
          id="confirm-password"
          type={values.showConfirmPassword ? 'text' : 'password'}
          value={values.confirmPassword}
          onChange={handleChange('confirmPassword')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end">
                {values.showConfirmPassword ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={labelWidth}
        />
        <FormHelperText className={classes.helperText}>
          {props.error === setError('confirmPassword') &&
            setError('confirmPassword')}
        </FormHelperText>
      </FormControl>
      <FormControl
        className={classes.formControlCheckboxes}
        component="fieldset">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                required
                checked={check.check1}
                color="primary"
                onChange={handleCheckboxChange('check1')}
              />
            }
            label="I certify that I am 18 years of age or older, and
I agree to the Terms of Service and Privacy Policy."
            labelPlacement="end"
          />
          <FormControlLabel
            control={
              <Checkbox
                required
                checked={check.check2}
                color="primary"
                onChange={handleCheckboxChange('check2')}
              />
            }
            label="I would like to receive important information and periodic
news updates."
            labelPlacement="end"
          />
        </FormGroup>
      </FormControl>
      <Button type="submit" color="primary" variant="contained">
        create account
      </Button>
    </form>
  );
};

const mapStateToProps = state => ({
  authenticated: state.signedUp,
  error: state.error
});

export default connect(mapStateToProps, { signUp })(SignUpForm);
