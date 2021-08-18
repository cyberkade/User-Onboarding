import axios from 'axios';
import * as yup from 'yup';
import {useState, useEffect} from 'react';

const Form = (props) => {
const [formData, setFormData] = useState({
    username: '',
    email:'',
    password:'',
    agreedTOS: false,
    buttonDisabled: true,
});

    return (
        <form>
            <label>
                Username
                <input id='username' type='text' name='username' placeholder='Enter a Username'></input>
            </label>
            <label>
                Email
                <input id='email' type='email' name='email' placeholder='Enter your Email'></input>
            </label>
            <label>
                Password
                <input id='password' type='password' name='password' placeholder='Enter a Secure Password'></input>
            </label>
            <label>
                Terms and Conditions
                <input id='tos' type='checkbox' name='agreedTOS'></input>
            </label>
            <button disabled={formData.buttonDisabled} >Submit</button>
        </form>
    )
}

export default Form;