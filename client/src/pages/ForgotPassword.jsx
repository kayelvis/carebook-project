import React from 'react'

function ForgotPassword() {
  return (
    <form action="" className="form card">
      <h1>Reset your password</h1>
      <label className="field">
        Enter Your Email
        <input type="email" required value={""} />
        <button className="btn">Send reset link</button>
      </label>
    </form>
  )
}

export default ForgotPassword