import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AnalyticsPage() {
  const { shortId } = useParams();
  const [clicks, setClicks] = useState(0); 

  useEffect(() => {
    axios.get(`http://localhost:8001/url/analytics/${shortId}`, { withCredentials: true })
      .then((res) => setClicks(res.data.totalClicks))
      .catch(() => setClicks(0));
  }, [shortId]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">URL Analytics</h1>
      <p>Total Clicks: {clicks}</p>
    </div>
  );
}
