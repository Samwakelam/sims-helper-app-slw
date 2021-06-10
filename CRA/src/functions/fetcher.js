const fetcher = async (url, method, body) => {
  // console.log('fetcher function running');
  // console.log('props =', url, method, body);
  const params = {
    method: method,
    heraders: {},
  }

  if (body) {
    params.body = JSON.stringify(body);
    params.headers['Content-Type'] = 'application/json';
  }

  try {
    const fetchData = await fetch(url, params);
    // console.log('fetchData =', fetchData);
    const response = await fetchData.json();
    // console.log('response =', response);
    return response;

  } catch (err) {
    console.error('Error with fetcher function:', err);
    return err;
  }
}

export default fetcher;