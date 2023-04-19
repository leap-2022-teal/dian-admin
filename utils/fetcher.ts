export async function fetcherGet(path: string) {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`);
  const data = await req.json();
  return data;
}

export const fetcherPost = async (path: string, data: any) => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return req;
};

export const fetcherDelete = async (path: string) => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  return req;
};

export async function fetcherPut(path: string, data: any) {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  return req;
}

export const fetcherPostFile = async (path: string, data: any) => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
    method: 'POST',
    body: data,
   
  })
  const jsonData = await req.json();
  return jsonData

  // return ;
};
