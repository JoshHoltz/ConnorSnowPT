export async function insertDataToDB(url, formElement) {
  const data = Object.fromEntries(new FormData(formElement).entries());

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  return { ok: res.ok, result };
}