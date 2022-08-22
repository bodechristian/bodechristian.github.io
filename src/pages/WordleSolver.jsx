import React from 'react';
import { solve } from '../functions/wordlesolver';
import RICIBs from 'react-individual-character-input-boxes';
import RowYellow from '../components/RowYellow';
import RowBlack from '../components/RowBlack';

class WordleSolver extends React.Component {
  constructor(props) {
    super(props)

    this.data = {
      greens: ["", "", "", "", ""],
      yellows: [],
      reds: "",
      solutions: "solutionasdfasfdasfdsfs",
    };
  }

  handleSubmit() {
    // update data
    console.log("submitted")
  }

  handleOutputString(str) {
    console.log(str);
  }

  render() {
    return (
      <div className='flex-center'>
        <div className="row bg-red w-75">
          <div className="col-xl-4 flex-center">
            <h3>Green</h3>
            <RICIBs amount={5} autoFocus handleOutputString={this.handleOutputString}
              inputRegExp={/^[a-zA-Z]$/}/>
          </div>
          <div className="col-xl-4 flex-center">
            <h3>Yellow</h3>
            <div className="flex-center">
              {[...Array(5).keys()].map(function(i) {
                  return <RowYellow number={i} key={i}></RowYellow>
              })}
            </div>
          </div>
          <div className="col-xl-4 flex-center">
            <h3>Black</h3>
            <RowBlack></RowBlack>
          </div>  
        </div>
        <button type="submit" onClick={this.handleSubmit} className="btn btn-secondary ml-auto mr-auto mt-3">Solve</button>
        <h5 className='mt-3'>Solutions:</h5>
        <p >{this.data.solutions}</p>  
      </div>
    );
  }
}
/*{solve(this.data.greens, this.data.yellows, this.data.reds)}*/
export default WordleSolver;