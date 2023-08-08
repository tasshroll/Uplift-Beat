export default async () => {
  console.log("GET NEWS")
  const res = await fetch('/api/news');
  return res.json();
}
