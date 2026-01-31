const API_KEY = "AIzaSyCXUkWkuTWmCsEI15tGS-9qrmoDMf8Hqas";

export async function fetchBooks(category, index = 0, maxResults = 6) {
  const query = encodeURIComponent(`subject:${category}`);
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}&printType=books&startIndex=${index}&maxResults=${maxResults}&langRestrict=en`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Ошибка API");
    return await response.json();
  } catch (e) {
    console.error("Ошибка при получении книг:", e);
    return null;
  }
}
