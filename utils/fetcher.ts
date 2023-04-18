export async function fetcher(path: string) {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`);
  const data = await req.json();
  return data;
}

export const fetcherPost = async (path: string, data: any) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};
