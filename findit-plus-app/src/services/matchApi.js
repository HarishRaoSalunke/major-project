const API = "http://172.18.82.76:5000/api/lost";

export const getItemMatches = async (itemId) => {
  const res = await fetch(`${API}/matches/${itemId}`);
  const data = await res.json();
  return data;
};

export const getMyLostPosts = async (userId) => {
  const res = await fetch(`${API}/my-lost/${userId}`);
  const data = await res.json();
  return data;
};

export const getMyFoundPosts = async (userId) => {
  const res = await fetch(`${API}/my-found/${userId}`);
  const data = await res.json();
  return data;
};
