import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  
  // Get user state from Redux
  const user = useSelector((state) => state.auth.user);

  const handleShorten = async () => {
    try {
      const response = await axios.post("http://localhost:8001/url", { url }, { withCredentials: true });
      setShortUrl(`http://localhost:8001/url/${response.data.id}`);
    } catch (error) {
      alert("Error shortening URL");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* If user is logged in, show URL Shortener */}
      {user ? (
        <>
          <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
          <input
            type="text"
            placeholder="Enter URL"
            className="p-2 border rounded w-96"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="mt-2 bg-blue-500 text-white p-2 rounded" onClick={handleShorten}>
            Shorten URL
          </button>
          {shortUrl && (
            <p className="mt-4">
              Shortened URL: <a href={shortUrl} className="text-blue-500 underline">{shortUrl}</a>
            </p>
          )}
        </>
      ) : (
        // If user is NOT logged in, show an informational homepage
        <div className="text-center max-w-2xl">
          <h1 className="text-3xl font-bold mb-4">Welcome to URL Shortener</h1>
          <p className="text-lg text-gray-700">
            Easily shorten your long URLs into simple, shareable links. Sign up to start using our powerful and free URL shortening service.
          </p>
          <p className="text-lg text-gray-700 mt-4">
            🚀 Track clicks, analyze engagement, and manage your shortened links with ease.
          </p>
        </div>
      )}
    </div>
  );
}
