import React from 'react';
import { solve } from '../functions/wordlesolver';
import RowYellow from '../components/RowYellow';

class WordleSolver extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      greens: ["", "", "", "", ""],
      yellows: [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
      ],
      yellow_letters: ["", "", "", "", ""],
      reds: "",
      solutions: "",
    };

    this.handleChangeReds = this.handleChangeReds.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleYellow = this.handleYellow.bind(this);
    this.handleYellowCB = this.handleYellowCB.bind(this);
    this.handleGreen = this.handleGreen.bind(this);
  }

  handleSubmit() {
    // bring yellows into form of [["a", 1], [...], ...]
    var lst = []
    for(let i = 0; i < 5; i++) {
      for(let j = 0; j < 5; j++) {
        if(this.state.yellows[i][j] === true) {
          lst.push([this.state.yellow_letters[i], j]);
        }
      }
    }
    console.log(lst);
    var str = solve(this.state.greens, lst, this.state.reds);
    console.log(this.state);
    this.setState({solutions: str})
  }

  handleChangeReds(str) {
    if(str.target.value.match("^[a-zA-Z]*$")!=null) {
        this.setState({reds: [...new Set(str.target.value.toLowerCase())].join('')});
    }
  }  

  handleYellow(e) {
    var temp = this.state.yellow_letters;
    
    if(e.target.value.match("^[a-zA-Z]*$")!=null) {
      temp[e.target.getAttribute("position")] = e.target.value.toLowerCase();
      this.setState({yellow_letters: temp});
    }
  }

  handleYellowCB(nb, i) {
    console.log(`${nb} ${i}`);
    const updatedCheckedState = this.state.yellows[nb].map((item, index) =>
      index === i ? !item : item
    );  
    const temp = this.state.yellows;
    temp[nb] = updatedCheckedState;
    this.setState({yellows: temp});
  }

  handleGreen(e) {
    var temp = this.state.greens;
    
    if(e.target.value.match("^[a-zA-Z]*$")!=null) {
      temp[e.target.getAttribute("position")] = e.target.value.toLowerCase();
      this.setState({greens: temp});
    }
  }

  render() {
    return (
      <div className='flex-center'>
        <div className="row bg-red w-75">
          <div className="col-xl-4 flex-center">
            <h3>Green</h3>
              <div>
                {[...Array(5).keys()].map(function(i) {
                      return <input type="text" maxLength="1" name={`green${i}`} key={i} position={i} value={this.state.greens[i]} onChange={this.handleGreen} className="ivAnOY"/>
                  }, this)}
              </div>
          </div>
          <div className="col-xl-4 flex-center">
            <h3>Yellow</h3>
            <div className="flex-center">
              {[...Array(5).keys()].map(function(i) {
                  return <RowYellow number={i} handle={this.handleYellow} handleCB={this.handleYellowCB} letters={this.state.yellow_letters} key={i}></RowYellow>
              }, this)}
            </div>
          </div>
          <div className="col-xl-4 flex-center">
            <h3>Black</h3>
            <input type="text" className='' maxLength="25" id="reds" value={this.state.reds} onChange={this.handleChangeReds}/>
          </div>  
        </div>
        <button type="submit" onClick={this.handleSubmit} className="btn btn-secondary ml-auto mr-auto mt-3">Solve</button>
        <h5 className='mt-3'>Solutions:</h5>
        <p >{this.state.solutions}</p>  
      </div>
    );
  }
}
export default WordleSolver;