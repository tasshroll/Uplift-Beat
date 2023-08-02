import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

const LoginForm = () => {

};

const loginForm = document.querySelector("#login");
const signupForm = document.querySelector("#signup");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.querySelector("#login-email").value;
  const password = document.querySelector("#login-password").value;
  const data = {
    email,
    password,
  };

  fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const rePassword = document.querySelector("#re-password").value;
  const phoneNumber = document.querySelector("#phone-number").value;

  const data = {
    name,
    email,
    password,
    rePassword,
    phoneNumber,
  };

  fetch("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});