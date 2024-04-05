'use server';

import { redirect } from 'next/navigation';

/**
 * This function handles the signup process.
 * It takes form data as input, constructs a payload with the necessary details,
 * and sends a POST request to the signup URL.
 * If the response is not OK, it returns the status and error body.
 * If the response is OK, it returns the response data.
 *
 * @param {FormData} formData - The form data from the signup form.
 * @return {Object} The response data or an error object with status and body.
 */
export async function handleSignup(formData: FormData) {
  const baseUrl = process.env.NEXT_PUBLIC_API_HOST;
  const signupUrl = `${baseUrl}/auth/signup`;

  const payload = {
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
  };

  const response = await fetch(signupUrl, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      tags: ['signup'],
    },
  });

  if (!response.ok) {
    const errorBody = await response.json();
    return {
      status: response.status,
      body: errorBody,
    };
  }

  redirect('/login');
}
