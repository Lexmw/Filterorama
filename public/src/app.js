import React from 'react';
import { render } from 'react-dom';
import OldPhoto from './uploadedPhoto'

export default class App extends React.Component {

// constructor(props) { //the constructor is here to set the initial state the components 
//     super(props)
//     this.state = {  
//       balance: '', 
//       rate: '',
//       term: 15,
//       output:''
//     }
//     this.HandleChange = this.HandleChange.bind(this);
//     this.MortgageCalc = this.MortgageCalc.bind(this);
//     this.ClickHandle = this.ClickHandle.bind(this);
// }

    render() {
        return(
        <div>

            <div className='scrolling-banner'>
                <h1>Filteroama Your favorite photoediting app!</h1>
            </div>

            <div id="PhotoContainer">
                <OldPhoto/>
                <div id="EditedPhotoContainer">
                    <div id="EditedPhoto"> Edited Photo </div>
                    <button id="downloadBTN" className="btn btn-info">Download Edited Photo</button>
                </div>
            </div>


            <div id='FilterContainer'>
                <div className="filterBoxes">Filter Choice 1</div>
                <div className="filterBoxes">Filter Choice</div>
                <div className="filterBoxes">Filter Choice</div>
            </div>

        </div>

        );
    };
}