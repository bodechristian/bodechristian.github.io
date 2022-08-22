import React from 'react';
import ChessTile from './ChessTile';

import bl from '../assets/pieces/Chess_blt60.png';
import bd from '../assets/pieces/Chess_bdt60.png';
import kl from '../assets/pieces/Chess_klt60.png';
import kd from '../assets/pieces/Chess_kdt60.png';
import nl from '../assets/pieces/Chess_nlt60.png';
import nd from '../assets/pieces/Chess_ndt60.png';
import pl from '../assets/pieces/Chess_plt60.png';
import pd from '../assets/pieces/Chess_pdt60.png';
import ql from '../assets/pieces/Chess_qlt60.png';
import qd from '../assets/pieces/Chess_qdt60.png';
import rl from '../assets/pieces/Chess_rlt60.png';
import rd from '../assets/pieces/Chess_rdt60.png';

class ChessBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
            selected: "",
            whitesTurn: true,
        }
    }

    render() {
        var tiles = [];
        for(var i = 0; i<64; i++) {
            var temp_piece = "";
            switch(i) {
                case 0:
                case 7:
                    temp_piece = rd;
                    break;
                case 1:
                case 6:
                    temp_piece = nd;
                    break;
                case 2:
                case 5:
                    temp_piece = bd;
                    break;
                case 3: 
                    temp_piece = qd;
                    break;
                case 4:
                    temp_piece = kd;
                    break;
                case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15:
                    temp_piece = pd;
                    break;
                case 56:
                case 63:
                    temp_piece = rl;
                    break;
                case 57:
                case 62:
                    temp_piece = nl;
                    break;
                case 58:
                case 61:
                    temp_piece = bl;
                    break;
                case 59: 
                    temp_piece = ql;
                    break;
                case 60:
                    temp_piece = kl;
                    break;
                case 48: case 49: case 50: case 51: case 52: case 53: case 54: case 55:
                    temp_piece = pl;
                    break;
            }
            tiles.push(<ChessTile key={i} piece={temp_piece}></ChessTile>)
        }
        return (
            <div className='board'>
                {tiles}
            </div>
        );
    }
}

export default ChessBoard;
