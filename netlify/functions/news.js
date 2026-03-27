exports.handler = async function (event, context) {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key not configured" }),
    };
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=helium+gas+energy&sortBy=publishedAt&language=en&pageSize=6&apiKey=${apiKey}`
    );
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch news" }),
    };
  }
};
