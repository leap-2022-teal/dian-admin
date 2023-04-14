export async function fetcher(path: string) {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`);
  const data = await req.json();
  return data;
}
