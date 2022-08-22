import React from 'react';

class RowBlack extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            text: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(str) {
        if(str.target.value.match("^[a-zA-Z]*$")!=null) {
            this.setState({text: [...new Set(str.target.value.toLowerCase())].join('')})
        }
        
    }

    render() {
        return(
            <input type="text" className='' maxLength="25" id="reds" value={this.state.text} onChange={this.handleChange}/>
        )
    }
}

export default RowBlack;