import { API_URL, TIMEOUT_SECONDS } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const wait = function (s) {
  return new Promise(function (resolve) {
    setTimeout(resolve, s * 1000);
  });
};

export const AJAX = async function (url = API_URL, uploadData = undefined) {
  try {
    const fetchConfig = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const response = await Promise.race([
      fetchConfig,
      timeout(TIMEOUT_SECONDS),
    ]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};
