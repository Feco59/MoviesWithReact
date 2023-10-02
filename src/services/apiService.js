const url = `https://crudcrud.com/api/${import.meta.env.VITE_CRUDCRUD}/movies`;

const apiService = {
  GET: async path => {
    const options = {
      method: 'GET',
    };
    
    return sendRequest(url + path, options);
  },
  POST: async (path, body) => {
    const options = {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify(body),
    };
    return sendRequest(url + path, options);
  },
  DELETE: async (path, body) => {
    const options = {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'DELETE',
      mode: "cors",
      body: JSON.stringify(body),
    };
    return sendRequestWithoutResponseBody(url + path, options);
  },
  PUT: async (path, body) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*"
      },
      method: 'PUT',
      body: JSON.stringify(body),
    };
    return sendRequestWithoutResponseBody(url + path, options);
  },
};

const sendRequestWithoutResponseBody = async (url, options) => {
  try {
    await fetch(url, options);
  } catch (err) {
    console.log(err);
  }
}

const sendRequest = async (url, options) => {
  try {
    const response = await fetch(url, options);
   
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export default apiService