import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

 const Mail = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_r3f5pdh', 'template_2ylrk2k', form.current, 'E4aw1o8lZ5pNSizJO')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="name" />
      <label>Email</label>
      <input type="email" name="email" />
      {/* <label>Message</label>
      <textarea name="message" /> */}
      <input type="submit" value="Send" />
    </form>
  );
};
export default Mail