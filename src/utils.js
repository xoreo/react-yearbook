const conf = {
  ip: 'localhost',
  port: 8081,
  protocol: 'http',
};

// authEndpoint returns an authorization endpoint to the API.
export const authEndpoint = (endpoint) => `/oauth/${endpoint}`;

// apiEndpoint returns an endpoint to the API.
export const apiEndpoint = (endpoint) => `/api/${endpoint}`;

// parseURL parses a url.
export const parseURL = () => {
  const url = window.location.href;
  const question = url.indexOf('?');
  let hash = url.indexOf('#');
  if (hash === -1 && question === -1) return {};
  if (hash === -1) hash = url.length;
  const query = question === -1 || hash === question + 1 ? url.substring(hash)
    : url.substring(question + 1, hash);
  const result = {};
  query.split('&').forEach((parts) => {
    if (!parts) return;
    const part = parts.split('+').join(' '); // replace every + with space, regexp-free version
    const eq = part.indexOf('=');
    let key = eq > -1 ? part.substr(0, eq) : part;
    const val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : '';
    const from = key.indexOf('[');
    if (from === -1) result[decodeURIComponent(key)] = val;
    else {
      const to = key.indexOf(']', from);
      const index = decodeURIComponent(key.substring(from + 1, to));
      key = decodeURIComponent(key.substring(0, from));
      if (!result[key]) result[key] = [];
      if (!index) result[key].push(val);
      else result[key][index] = val;
    }
  });
  return result;
};
