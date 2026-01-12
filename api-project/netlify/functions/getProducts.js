import fetch from "node-fetch";

export async function handler(event) {
  const { id } = event.queryStringParameters || {};

  try {
    const url = id
      ? `https://makeup-api.herokuapp.com/api/v1/products/${id}.json`
      : "https://makeup-api.herokuapp.com/api/v1/products.json";

    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
