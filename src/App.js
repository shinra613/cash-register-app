import React, { useState } from "react";
import "./styles.css";

let currencies = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
let noteUsed = [];

export default function App() {
  //---------------------states------------------------------------

  const [bill, setbill] = useState({
    bamt: ""
  });

  const [cash, setcash] = useState({
    cash: ""
  });
  const [notes, setnotes] = useState([1]);

  const [show, setShow] = useState({ value: "none", finalAmt: "" });

  //------------------------input functions---------------------------

  const inputOne = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setbill({
      bamt: value
    });
  };

  const inputTwo = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setcash({
      cash: value
    });
  };

  //------------------------calculation function---------------------------

  const finalCalc = (value1, value2) => {
    let finalAmt = Math.abs(value2 - value1);
    let finalAmt2 = finalAmt;
    console.log(finalAmt);

    for (var i = 0; i < 10; i++) {
      if (finalAmt >= currencies[i]) {
        let newVal = Math.floor(finalAmt / currencies[i]);

        noteUsed[i] = newVal;

        finalAmt = finalAmt % currencies[i];
      }
    }

    for (i = 0; i < noteUsed.length; i++) {
      if (noteUsed[i] === undefined) {
        noteUsed[i] = "~";
      }
    }

    console.log(noteUsed);
    let test = "block";
    setnotes(noteUsed);
    setShow({ value: test, finalAmt: finalAmt2 });
    console.log(show);
  };

  //------------------------app render ---------------------------

  return (
    <div className="App">
      <div className="container-main">
        <h1>Cash Register</h1>
        <div className="container-general">
          <div className="resultTitle">Bill amount: </div>
          <input onChange={inputOne} name="bamt"></input>
        </div>

        <div className="container-general">
          <div className="resultTitle">Cash given : </div>
          <input onChange={inputTwo} name="cash"></input>
        </div>

        <button
          onClick={() => {
            finalCalc(bill.bamt, cash.cash);
          }}
        >
          submit
        </button>

        <div className="final" style={{ display: show.value }}>
          <div className="resultTitle">Amount to return: ₹{show.finalAmt}</div>
          <div className="resultTitle">Currency Denomination</div>
          <div className="container-general-2 ">
            <div className="container-result-1">
              {currencies.map((item) => {
                return <span keys={item}>{item}</span>;
              })}
            </div>

            <div className="container-result">
              {currencies.map(() => {
                return <span>:</span>;
              })}
            </div>

            <div className="container-result-2">
              {notes.map((item) => {
                return <span keys={item}>{item}</span>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
