const Table = ({ tableData }) => {
  
    // Check if tableData is an object and it has a data property before mapping over it
    if (!tableData || !Array.isArray(tableData.data)) {
      console.error("tableData.data is not an array:", tableData);
      return null; // or return an error message or loading spinner
    }
  
    // Check if tableData.data has at least one item before mapping over it
    if (tableData.data.length === 0) {
      return (
        <div>
          <p>No data available</p>
        </div>
      );
    }
  
    return (
      <table id="tab">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {tableData.data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td><img src={item.image} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  export default Table