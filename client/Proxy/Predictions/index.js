import fetch from 'isomorphic-fetch';

export default (req, res) => {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  headers.append('Auth-Token', req.headers['auth-token']);

  const options = {
    method: 'GET',
    headers: headers,
  };

  fetch('http://localhost:9000/predictions', options)
    .then( res => res.json() )
    .then(
        (response) => {
          if (response.error) {
            return res.status(400).send(response); // Bad Request
          }
          res.status(201).send(response) // Created
        },
        (error) => {
          res.status(520).send(error) // Unknown Error
        }
    );
};
