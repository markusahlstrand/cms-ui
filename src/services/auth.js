// const authUrl = 'http://localhost:8787';
const authUrl = 'https://cloudworker-auth.sesamy-dev.workers.dev';

export async function login(email, password) {
  const response = await fetch(`${authUrl}/oauth/token`, {
    method: 'POST',
    body: JSON.stringify({
      grant_type: 'password',
      client_id: 'default',
      username: email,
      password,
    }),
    headers: {
      'content-type': 'application/json',
    },
  });
  const body = await response.json();

  return body;
}
