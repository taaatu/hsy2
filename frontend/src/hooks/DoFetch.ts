import { BASE_URL } from '../variables/Constants';

const doFetch = async (
  endPoint: string,
  method: string,
  body?: object,
  token?: string
) => {
  try {
    const options: any = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        // 'x-access-token': token || '',
      },
      Authentication: `Bearer ${token}`,
      body: JSON.stringify(body),
    };
    const response = await fetch(BASE_URL + endPoint, options);
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message);
    }
    return json;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { doFetch };
