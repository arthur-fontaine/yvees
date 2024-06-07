import React from "react";
import { useSignIn } from '@clerk/clerk-react';
import { Button, } from "ui";


export function Form() {
const { isLoaded, signIn, setActive } = useSignIn();
const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }
}
    return (
        <>
      <h1>Sign in</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Enter email address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            type="email"
            value={email}
          />
        </div>
        <div>
          <label htmlFor="password">Enter password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type="password"
            value={password}
          />
        </div>
        <Button variant={"secondary"} >Sign in</Button>
      </form>
    </>
  );
}