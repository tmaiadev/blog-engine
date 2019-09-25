import React, { useState } from 'react';
import Cookies from 'js-cookie';
import App from '../../components/app';
import Input from '../../components/input';
import Button from '../../components/button';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmiting] = useState(false);
  const disabledSubmition = !form.email || !form.password || submitting;

  async function onSubmit(evt) {
    evt.preventDefault();

    setSubmiting(true);
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify(form),
        'Content-Type': 'application/json',
      });
      const { token } = await response.json();
      Cookies.set('token', token);
      window.location.href = "/admin";
    } catch (e) {
      alert('Wrong username or password!');
      setSubmiting(false);
    }
  }

  function onInputChange ({
    target: {
      name,
      value
    }
  }) {
    const newState = { ...form };
    newState[name] = value;
    setForm(newState);
  }

  return (
    <App>
      <div className="login-page">
        <div className="login-page__wrapper">
          <form
            className="login-page__form"
            method="post"
            action="/admin/login"
            onSubmit={onSubmit}
          >
            <h1 className="login-page__title">LOGIN</h1>
            <Input
              type="email"
              id="email"
              name="email"
              label="E-mail"
              autoFocus
              required
              onChange={onInputChange}
            />
            <Input
              type="password"
              id="password"
              name="password"
              label="Password"
              required
              onChange={onInputChange}
            />
            <div
              className="login-page__submit-wrapper"
            >
              <Button
                type="submit"
                disabled={disabledSubmition}
              >
                {submitting
                  ? 'Loading...'
                  : 'Log In'}
              </Button>
            </div>
          </form>
        </div>
        <style jsx>
          {`
          .login-page__wrapper {
            padding: 16px;
            background-color: #FFF;
          }

          .login-page__title {
            margin: 0px;
          }

          .login-page__form {
            display: grid;
            grid-gap: 16px;
          }

          .login-page__submit-wrapper {
            text-align: right;
          }

          @media (min-width: 768px) {
            .login-page {
              display: flex;
              align-items: center;
              justify-content: center;
              position: absolute;
              top: 0px;
              left: 0px;
              width: 100%;
              height: 100%;
              background-color: #CCC;
            }

            .login-page__wrapper {
              box-shadow: 0px 3px 4px rgba(0, 0, 0, .3);
              border-radius: 4px;
              width: 320px;
              padding: 32px;
            }
          }
        `}
        </style>
      </div>
    </App>
  );
}

export default Login;
