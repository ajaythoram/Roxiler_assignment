import axios from "axios";
import { useEffect, useState } from "react";

const Statatics = ({ month }) => {
  const [staticsData, setStaticsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/statics?month=${month}`);
        setStaticsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Set staticsData to a default value in case of an error
        setStaticsData({ totalSaleAmount: 0, totalSoldItems: 0, totalUnsoldAmount: 0 });
      }
    };

    fetchData();
  }, [month]);

  
  if (!staticsData) {
    // Return a loading state or some fallback UI while data is being fetched
    return <p>Loading...</p>;
  }
  return (
    <div id="statics">
        <h1>Monthly Statment</h1>
       <div className="lab">
       <h3>Total Sale Amount :</h3>
       <p>{staticsData.data.totalSaleAmount}</p>
       </div>
       <div className="lab">
       <h3>Total Sold Items :</h3>
       <p>{staticsData.data.totalSoldItems}</p>
       </div>
       <div className="lab">
       <h3>Total Unsold Items :</h3>
       <p>{staticsData.data.totalUnsoldItems}</p>
       </div>
    </div>
  );
};

export default Statatics;
