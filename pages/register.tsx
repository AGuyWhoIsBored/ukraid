import { NextPage } from "next";
import { signIn } from 'next-auth/react';

const Register: NextPage = () => {
  return <h1>REGISTER PAGE!!</h1>;
};

const onFormSubmit = async (e: Event) => {
  e.preventDefault();
  //Getting value from useRef()
  const user = userRef.current.value;
  const email = emailRef.current.value;
  const password = passwordRef.current.value;
  //Validation
  if (!email || !email.includes('@') || !password) {
      alert('Invalid details');
      return;
  }
  //POST form values
  const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          user: user,
          email: email,
          password: password,
      }),
  });
  //Await for data for any desirable next steps
  const data = await res.json();
  console.log(data);
};


export default Register;
