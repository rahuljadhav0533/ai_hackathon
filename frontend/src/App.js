import React, { useState } from "react";
import axios from "axios";

function App() {
  const [websiteName, setWebsiteName] = useState("");
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allResults, setAllResults] = useState([]);

  const enrichCompany = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:5000/enrich",
        {
          url: url,
          website_name: websiteName,
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Error while enriching company");
    }

    setLoading(false);
  };

  const getResults = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/results"
      );

      setAllResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Company Enrichment</h1>

      <input
        type="text"
        placeholder="Website Name"
        value={websiteName}
        onChange={(e) => setWebsiteName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Enter Company URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={enrichCompany}>
        Enrich
      </button>

      <br />
      <br />

      {loading ? <p>Loading...</p> : null}

      {result ? (
        <div style={{ border: "1px solid gray", padding: "10px" }}>
          <h2>{result.company_name}</h2>

          <p>Website: {result.website_name}</p>

          <p>Address: {result.address}</p>

          <p>Mobile: {result.mobile_number}</p>

          <p>Core Service: {result.core_service}</p>

          <p>Target Customer: {result.target_customer}</p>

          <p>Pain Point: {result.probable_pain_point}</p>

          <p>Outreach: {result.outreach_opener}</p>
        </div>
      ) : null}

      <br />

      <button onClick={getResults}>
        Show All Results
      </button>

      <br />
      <br />

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Service</th>
          </tr>
        </thead>

        <tbody>
          {allResults.map((item, index) => (
            <tr key={index}>
              <td>{item[0]}</td>
              <td>{item[2]}</td>
              <td>{item[6]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;