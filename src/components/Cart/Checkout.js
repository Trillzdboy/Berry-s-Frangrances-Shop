import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isEmail = value => value.includes('@');

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        email: true,
        address: true,
        state: true,
    });

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const addressInputRef = useRef();
  const stateInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredState = stateInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredEmailIsValid = isEmail(enteredEmail);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredStateIsValid = !isEmpty(enteredState);

    setFormInputValidity({
        name: enteredNameIsValid,
        email: enteredEmailIsValid,
        address: enteredAddressIsValid,
        state: enteredStateIsValid,
    });

    const formIsValid = enteredNameIsValid && enteredEmailIsValid && enteredAddressIsValid && enteredStateIsValid;



    if (!formIsValid) {
        return;
    }

    // send request to server
    props.onConfirm({
        name: enteredName,
        email: enteredEmail,
        address: enteredAddress,
        state: enteredState,
    })
  };

  const nameControlClasses = `${classes.control} ${formInputValidity.name ? '' : classes.invalid}`
    const emailControlClasses = `${classes.control} ${formInputValidity.email ? '' : classes.invalid}`
    const addressControlClasses = `${classes.control} ${formInputValidity.address ? '' : classes.invalid}`
    const stateControlClasses = `${classes.control} ${formInputValidity.state ? '' : classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <span>Please enter a valid name</span>}
      </div>
      <div className={emailControlClasses}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" ref={emailInputRef} />
        {!formInputValidity.email && <span>Please enter a valid email</span>}
      </div>
      <div className={addressControlClasses}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!formInputValidity.address && <span>Please enter a valid address</span>}
      </div>
      <div className={stateControlClasses}>
        <label htmlFor="State">State</label>
        <input type="text" id="State" ref={stateInputRef} />
        {!formInputValidity.state && <span>Please enter a valid state</span>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
