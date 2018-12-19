import React, { Component } from 'react'
import Board from './Board';
import './Game.css';

export default class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
            show: false
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const current = history[history.length-1];
        
        const isChecked = current.squares[i];
        const isEnd = this.calculateWinner(current.squares);

        if(isChecked || isEnd) {
            return;
        }

        const newSquares = current.squares.slice();
        newSquares[i] = this.state.xIsNext ? 'X' : 'O';

        const winner = this.calculateWinner(newSquares);
        const hasNullSquare = newSquares.includes(null);

        if (winner) {
            this.props.showModal("🎉  " + winner + "가 이겼습니다!");
        } else if (!winner && !hasNullSquare) {
            this.props.showModal("🧐 비겼습니다.");
        }

        this.setState({
            history: history.concat([{
                squares: newSquares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    calculateWinner(squares) {
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a,b,c] = lines[i];
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);

        const hasNullSquare = current.squares.includes(null);

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else if (!winner && !hasNullSquare) {
            status = "Draw";
        } else {
            status = "Next Player: " + (this.state.xIsNext ? 'X' : 'O');
        }

        const moves = history.map((step, move) => {
            const desc = move ? "Go to move #" + move : "Go to start";
            return (
                <li key={move}>
                    <button onClick={()=>this.jumpTo(move)}>{desc}</button>
                </li>
            );
        })

        return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
            </div>
            <div className="game-info">
                <h2>{status}</h2>
                <ol>{moves}</ol>
            </div>
        </div>
        )
    }
}
