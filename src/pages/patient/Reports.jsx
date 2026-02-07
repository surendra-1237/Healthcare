import React from "react";
import ChartComponent from "../../components/ChartComponent";

const Reports = () => {
  const download = () => {
    // quick download via print; for production use a proper PDF generator
    window.print();
  };

  return (
    <div style={{maxWidth:900, margin:"20px auto", padding:20}}>
      <h2>Health Reports</h2>
      <div style={{marginTop:20}}>
        <h3>Daily / Weekly / Monthly Trends</h3>
        <ChartComponent />
      </div>

      <div style={{marginTop:20}}>
        <h3>Abnormal Values</h3>
        <p>Abnormal values will be highlighted here.</p>
      </div>

      <button onClick={download} style={{padding:10, backgroundColor:"#0a4275", color:"white", border:"none", borderRadius:6, cursor:"pointer"}}>Download Report (Print)</button>
    </div>
  );
};

export default Reports;
