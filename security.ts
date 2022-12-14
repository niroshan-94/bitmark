import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    isList: boolean,
    success: boolean,
    results: object
}

export default async function api(
  url: URL,
  content: object
) {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(content),
          });
        const data = await res.json();
        return data;
        //resp ={ isList: data.isList, success : data.success ,results: data.results }
    } catch (err) {
        console.log(err);
    }



}
