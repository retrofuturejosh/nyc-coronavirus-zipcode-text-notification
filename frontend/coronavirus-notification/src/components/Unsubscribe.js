import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import MuiPhoneInput from 'material-ui-phone-number';
import {
  formatPhoneNumber,
  validateNumber,
  deleteNumber,
} from '../util/helpers';
import Notification from './Notification';
import Loading from './Loading';

export default function Unsubscribe() {
  let history = useHistory();
  const [open, setOpen] = React.useState(true);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [phoneError, setPhoneError] = React.useState(false);
  const [successful, setSuccessful] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    history.push('/');
  };

  const handlePhoneInput = (value) => {
    setPhoneNumber(value);
  };

  const handleUnsubscribe = async (value) => {
    const formattedNumber = formatPhoneNumber(phoneNumber);
    const isValidNumber = validateNumber(formattedNumber);
    setPhoneError(!isValidNumber);
    if (isValidNumber) {
      setIsLoading(true);
      console.log('SENDING API REQUEST');
      try {
        await deleteNumber(formatPhoneNumber(phoneNumber));
        setSuccessful(true);
        setIsLoading(false);
        setOpen(false);
      } catch (err) {
        if (
          err.response.data.errorMessage === 'Phone number is not subscribed'
        ) {
          history.push('/notSubscribed');
        } else {
          history.push('/error');
        }
      }
    }
  };

  return (
    <div>
      {successful ? (
        <Notification
          title="Success"
          dialog={`You have unsubscribed ${phoneNumber}. You will no longer receive daily updates.`}
        />
      ) : null}
      {isLoading ? <Loading /> : null}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Unsubscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To unsubscribe from this service, please enter your phone number.
          </DialogContentText>
          <MuiPhoneInput
            htmlFor="component-error"
            defaultCountry="us"
            onlyCountries={['us']}
            disableDropdown
            label="Phone Number"
            error={phoneError}
            style={{ maxWidth: '15em' }}
            onChange={handlePhoneInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUnsubscribe} color="primary">
            Unsubscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
