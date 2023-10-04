import { BASE_URL, TOKEN } from '../variables/Constants';

const doFetch = async (endPoint: string, method: string, body?: object) => {
  try {
    const options: any = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
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
