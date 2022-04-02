import React from 'react';
import logo from './bomb.svg';
import flag from './target.svg';
import bomb from './fired.svg';
import './App.css';

class Field extends React.Component {
    render() {
        let rows = [];
        for (let i = 0; i < this.props.rows; i++) {
            rows.push(<Row key={i} totalColumns={this.props.columns} row={i} field={this.props.field}/>)
        }
        return (
            <div className="field" onContextMenu={(e) => e.preventDefault()}>
                {rows}
            </div>
        );
    }
}

class Row extends React.Component {
    render() {
        const aRow = [];
        for (let i = 0; i < this.props.totalColumns; i++) {
            aRow.push(<Cell key={i} column={i} row={this.props.row} field={this.props.field} />)
        }
        return (
            <div className="row">
                {aRow}
            </div>
        );
    }
}

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isBomb: props.field[props.row][props.column] === 1,
          status: 0   // 0=default, 1=opened, 2=flagged
        };
        this.openCell = this.openCell.bind(this);
        this.flagCell = this.flagCell.bind(this);
    }

    openCell(e) {
        e.preventDefault();
        this.setState({
            status: 1
        });
    }

    flagCell(e) {
        e.preventDefault();

        this.setState({
            status: this.state.status === 0 ? 2 : 0,
        });
    }

    render() {
        switch (this.state.status) {
            case (1):
                if (this.state.isBomb) {
                    return (
                        <div className="cell bomb">
                            <img src={bomb} alt="Bomb"/>
                        </div>
                    );
                }
                return (
                    <div className="cell opened"/>
                );
            case (2):
                return (
                    <div onClick={this.openCell} onContextMenu={this.flagCell} className="cell flagged">
                        <img src={flag} alt="Flagged cell"/>
                    </div>
                );
            default:
                return (
                    <div onClick={this.openCell} onContextMenu={this.flagCell} className="cell"/>
                );
        }
    }
}

class ControlPanel extends React.Component {
    render() {
        return (
            <div className="control-panel">
                <div className="header">
                    <p>Minesweeper</p>
                    <img src={logo} className="app-logo" alt="logo"/>
                </div>
                <div className="menubar">
                    <FlagsCounter/>
                    <ResetButton/>
                    <Timer/>
                </div>
            </div>
        );
    }
}

class FlagsCounter extends React.Component {
    render() {
        return (
            <div className="counter">
                <p>💣</p>
                <p>10</p>
            </div>
        );
    }
}

class ResetButton extends React.Component {
    render() {
        return (
            <div className="reset-button">
                <p>Reset</p>
            </div>
        );
    }
}

class Timer extends React.Component {
    render() {
        return (
            <div className="timer">
                <p>0:00</p>
            </div>
        );
    }
}


export default class App extends React.Component{
    constructor(props) {
        super(props);

        const ROW = 9;
        const COL = 8;
        const MINES = 10;

        let fieldArr = App.createField(ROW, COL, MINES);

        this.state = {
          remainingMines: MINES,
          field: fieldArr
        };
    }

    static randomizer(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static createField(row, column, mines)  {
        let field = Array(row).fill()
            .map(() => Array(column).fill(0));
        App.fillField(mines, field);
        return field;
    }

    static fillField(mineCount, fieldArr) {
        while (mineCount > 0) {
            let row = App.randomizer(1, fieldArr.length-1);
            let column = App.randomizer(1, fieldArr[0].length-1);

            if (fieldArr[row][column] === 0) {
                fieldArr[row][column] = 1;
                mineCount--;
            }
        }
    }

    render() {
        return (
            <div className="app">
                <div className="board">
                    <ControlPanel/>
                    <Field rows="9" columns="8" field={this.state.field}/>
                </div>
            </div>
        );
    }
}
