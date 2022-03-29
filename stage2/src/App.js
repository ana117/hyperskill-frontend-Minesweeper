import React from 'react';
import logo from './bomb.svg';
import './App.css';

function Field(props) {
    let rows = [];
    for (let i=0; i<props.rows; i++) {
        rows.push(<Row columns={props.columns}/>)
    }
    return (
        <div className="field">
            {rows}
        </div>
    );
}

function Row(props) {
    const aRow = [];
    for (let i=0; i<props.columns; i++) {
        aRow.push(<Cell/>)
    }
    return (
        <div className="row">
            {aRow}
        </div>
    );
}

function Cell() {
    return (
        <div className="cell"/>
    );
}

function ControlPanel() {
    return (
        <div className="control-panel">
            <div className="header">
                <p>Minesweeper</p>
                <img src={logo} className="app-logo" alt="logo" />
            </div>
            <div className="menubar">
                <FlagsCounter/>
                <ResetButton/>
                <Timer/>
            </div>
        </div>
    );
}

function FlagsCounter() {
    return (
        <div className="counter">
            {/*<img src={logo} className="counter-bomb" alt="bomb counter"/>*/}
            <p>💣</p>
            <p>10</p>
        </div>
    );
}
function ResetButton() {
    return (
        <div className="reset-button">
            <p>Reset</p>
        </div>
    );
}
function Timer() {
    return (
        <div className="timer">
            <p>0:00</p>
        </div>
    );
}

function App() {
  return (
    <div className="app">
        <div className="board">
            <ControlPanel/>
            <Field rows="9" columns="8"/>
        </div>
    </div>
  );
}

export default App;
