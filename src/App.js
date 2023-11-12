import { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Components/table";
import Statatics from "./Components/Statatics";
import CustomIcons from "./Components/Pagination";
import BarChart from "./Components/Chart";
import PieChart from "./Components/PieChart";
function App() {
  const [tableData, setTableData] = useState([]);
  const [text, setText] = useState("");
  const [month, setMonth] = useState("");
  let [page,setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/transaction?month=${month}&page=${page}`);
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Set tableData to an empty array in case of an error
        setTableData([]);
      }
    };

    fetchData();
  }, [text, month,page]); // Add text and month as dependencies

 const onPageChange = (newPage) =>{
  setPage(newPage);
 }

  return (
    <div className="App">
      <h1>Transaction Dashboard</h1>
      <div id="header">
        <input
          type="text"
          placeholder="Search Transaction"
          onChange={(e) => setText(e.target.value)}
        />

        <select id="dropdown" onChange={(e) => setMonth(e.target.value)}>
          <option value="">...select month</option>
          <option value="1">Jan</option>
          <option value="2">Feb</option>
          <option value="3">Mar</option>
          <option value="4">Apr</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">Aug</option>
          <option value="9">Sep</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
        </select>
      </div>

      <Table tableData={tableData} />
      <CustomIcons onPageChange={onPageChange}/>
      <Statatics month={month} />
       
       <div id="bar">
       <BarChart month={month} />
       </div>
     
     <div id="pie"> 
     <PieChart month={month} />
     </div>
     
    </div>
  );
}

export default App;
