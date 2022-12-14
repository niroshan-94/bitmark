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
    } catch (err) {
        console.log(err);
    }



}
