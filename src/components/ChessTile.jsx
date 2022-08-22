import React from 'react';



class ChessTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            piece: props.piece,
        }
    }

    render() {
        return (
            <div className="tile flex-center">
                <img src={this.state.piece} alt="piece" />
            </div>
        );
    }
}

export default ChessTile;
