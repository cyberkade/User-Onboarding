import axios from 'axios';
import * as Yup from 'yup';
import {useState, useEffect} from 'react';
import User from './User'

const Form = () => {
    const [formData, setFormData] = useState({
        username: '',
        email:'',
        password:'',
        genre:'',
        agreedTOS: false,
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        genre:'',
        agreedTOS: '',
    });
    const [users, setUsers] = useState([]);

    const formSchema = Yup.object().shape({
        username: Yup
            .string()
            .trim()
            .required("Must include a username.")
            .min(3, "Username must be at least 3 characters long."),
        email: Yup
          .string()
          .trim()
          .email("Must be a valid email address.")
          .required("Must include email address."),
        password: Yup
          .string()
          .trim()
          .required("Password is Required")
          .min(6, "Passwords must be at least 6 characters long."),
        genre: Yup
        .string()
        .oneOf(['Indie Rock', 'Classic Rock', 'Death Metal','Hip-Hop/R&B', 'EDM/Dubstep/House', 'Pop', 'Country', 'Jazz', 'Disco'],"Preferred Music Genre is Required"),
        agreedTOS: Yup
          .boolean()
          .oneOf([true], "You must accept Terms and Conditions")
      });

      useEffect( () => {
        formSchema.isValid(formData).then((valid) => {
            setButtonDisabled(!valid);
        })
      }, [formData])

      const inputChange = e => {
          const {name, value, checked, type} = e.target
          const valueToUse = type === 'checkbox' ? checked : value;

          Yup
          .reach(formSchema, name)
          .validate(value)
          .then(() => {
              setErrors({
                  ...errors, [name]: ''
              })
          })
          .catch(err => {
              setErrors({
                  ...errors, [name]: err.errors[0]
              })
          })

          setFormData({
              ...formData, [name]: valueToUse
          })
        }

     const submit = (e) => {
         e.preventDefault();
         const newUser = {username: formData.username, email: formData.email, password: formData.password, genre: formData.genre, agreedTOS: formData.agreedTOS}
         axios.post('https://reqres.in/api/users', newUser)
         .then(res => {
             setUsers([...users, res.data]);
         })
         .catch(err => {
             console.log(err)
         })
         setFormData({
            username: '',
            email:'',
            password:'',
            agreedTOS: false,
        });
     }

    return (
        <>
        <h1>Join The Club!</h1>
        <form id='newUserForm' onSubmit={submit}>
            <label>
                Username
                <input onChange={inputChange} id='username' type='text' name='username' value={formData.username} placeholder='Enter a Username'></input>
            </label>
            {errors.username.length > 0 && <p className="errorMsg">{errors.username}</p>}
            <label>
                Email
                <input onChange={inputChange} id='email' type='email' name='email' value={formData.email} placeholder='Enter your Email'></input>
            </label>
            {errors.email.length > 0 && <p className="errorMsg">{errors.email}</p>}
            <label>
                Password
                <input onChange={inputChange} id='password' type='password' name='password' value={formData.password} placeholder='Enter a Secure Password'></input>
            </label>
            {errors.password.length > 0 && <p className="errorMsg">{errors.password}</p>}
            <label>
                Preferred Music Genre
                <select id="genre" onChange={inputChange} value={formData.genre} name='genre'>
                    <option>--select a genre--</option>
                    <option>Indie Rock</option>
                    <option>Classic Rock</option>
                    <option>Death Metal</option>
                    <option>Hip-Hop/R&B</option>
                    <option>EDM/Dubstep/House</option>
                    <option>Pop</option>
                    <option>Country</option>
                    <option>Jazz</option>
                    <option>Disco</option>
                </select>
            </label>
            <label>
                Terms and Conditions
                <input onChange={inputChange} id='tos' type='checkbox' name='agreedTOS' checked={formData.agreedTOS} ></input>
            </label>
            <button disabled={buttonDisabled} id='submit'>Submit!</button>
        </form>
        {users.length > 0 && <h2 className='userHeader'>Check Out The Club!</h2>}
        <div className='userCont'>
            {users.map( (user, index) => <User key={index} user={user} /> )}
        </div>
        </>
    )
}

export default Form;