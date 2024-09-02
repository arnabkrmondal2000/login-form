import React, {useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import './Form.css'


interface FormState {
    name: string;
    mobile:string;
    email: string;
    password: string
}
const Form = () => {
    const [formData, setFormData] = useState<FormState>({
        name:'',
        mobile:'',
        email:'',
        password:''
    })

    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
        if(validInput(formData)){
        try {
            const loginData = await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
            console.log("login Successful", loginData); 
            setFormData({
                name: '',
                mobile: '',
                email: '',
                password: '',
            });
            setIsSubmit(true);
        } catch (error) {
            console.log(error)
        }
     }
    }


    const isEmailValid = (email: string): boolean => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    const mobileValidator = (mobile: string): boolean => {
        const mobileNumber = /^[0-9]{10}$/;
        return mobileNumber.test(mobile);
    }
    const validInput = (data: FormState) => {
        console.log("input data =====>", data);

        if(data.name === '') {  
            alert('user name naver empty');
            return false;
        }

        if(!mobileValidator(data.mobile)) {
            alert('mobile number must be 10 digit');
            return false;
        }

        if(!isEmailValid(data.email)) {
            alert('Provide a valid email id');
            return false;
        }  
        ;
        if(data.password.length <= 6) {
           //console.log("lengt====>",data.password.length);           
           alert('Password always grater than 6 letter');
           return false;
        }
        console.log("lengt====>",data.password.length);
        return true;    
    }

    return (
        <>
            {isSubmit ? <p>Congrats! Form is submitted</p> : <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name='name' value={formData.name} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Mobile:
                    <input type="text" name='mobile' value={formData.mobile} onChange={handleChange}/>
                </label>
                <br/>
                <label>
                    Email:
                    <input type="text" name='email' value={formData.email} onChange={handleChange}/>
                </label>
                <br />
                <label>
                    Password:
                    <input type="text" name='password' value={formData.password}onChange={handleChange}/>
                </label>
                <br/>
                <button>Submit</button>
            </form>}
        </>
    )
}

export default Form;