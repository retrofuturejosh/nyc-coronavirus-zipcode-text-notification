import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MuiPhoneInput from 'material-ui-phone-number';
import validZipCodes from '../util/validZipCodes';
import { formatPhoneNumber, validateNumber, postNumber } from '../util/helpers';
import Notification from './Notification';
import Loading from './Loading';

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    margin: '1em',
  },
  inputContainerHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'row wrap',
  },
}));

export default function Subscribe() {
  let history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [borough, setBorough] = React.useState('Manhattan');
  const [zipCode, setZipCode] = React.useState('');
  const [phoneError, setPhoneError] = React.useState(false);
  const [zipCodeError, setZipCodeError] = React.useState(false);
  const [succesful, setSuccessful] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    history.push('/');
  };

  const handleSubscribe = async () => {
    const formattedNumber = formatPhoneNumber(phoneNumber);
    const isValidNumber = validateNumber(formattedNumber);
    setPhoneError(!isValidNumber);
    setZipCodeError(!zipCode);
    if (isValidNumber && zipCode) {
      setPhoneError(false);
      setZipCodeError(false);
      setOpen(false);
      setIsLoading(true);
      try {
        await postNumber(formatPhoneNumber(phoneNumber), zipCode, borough);
        setIsLoading(false);
        setSuccessful(true);
      } catch (err) {
        if (
          err.response.data.errorMessage ===
          'Phone number is already registered for zip code'
        ) {
          history.push('/alreadySubscribed');
        } else {
          history.push('/error');
        }
      }
    }
  };

  const handlePhoneInput = (value) => {
    setPhoneNumber(value);
  };
  const handleBorough = (event) => {
    setBorough(event.target.value);
  };
  const handleZipCode = (event, value) => {
    if (value) {
      setZipCode(value.zipCode);
      setZipCodeError(false);
    } else {
      setZipCode('');
    }
  };

  return (
    <div>
      {succesful ? (
        <Notification
          title="Success"
          dialog={`You have subscribed ${phoneNumber}. You should expect a text message confirming your subscription within the next few minutes. Daily updates will be sent at 10 AM EST regarding zip code ${zipCode}.`}
        />
      ) : null}
      {isLoading ? <Loading /> : null}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe for daily updates, please fill in the following
            details:
          </DialogContentText>
          <div className={classes.inputContainer}>
            <MuiPhoneInput
              htmlFor="component-error"
              className={classes.input}
              defaultCountry="us"
              onlyCountries={['us']}
              disableDropdown
              label="Phone Number"
              error={phoneError}
              style={{ maxWidth: '15em' }}
              onChange={handlePhoneInput}
            />
            <div className={classes.inputContainerHorizontal}>
              <Autocomplete
                className={classes.input}
                id="zipCode"
                options={validZipCodes}
                autoSelect
                autoHighlight
                style={{ width: '10em' }}
                getOptionLabel={(option) => option.zipCode}
                onChange={handleZipCode}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Zip Code"
                    variant="outlined"
                    error={zipCodeError}
                  />
                )}
              />
              <FormControl
                style={{ width: '10em' }}
                className={classes.input}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-age-native-simple">
                  Borough
                </InputLabel>
                <Select native onChange={handleBorough} label="Borough">
                  <option value={'Manhattan'}>Manhattan</option>
                  <option value={'Brooklyn'}>Brooklyn</option>
                  <option value={'Queens'}>Queens</option>
                  <option value={'Bronx'}>Bronx</option>
                  <option value={'Staten Island'}>Staten Island</option>
                </Select>
              </FormControl>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubscribe} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
