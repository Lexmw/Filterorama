import React from 'react';
import { render } from 'react-dom';

export default class OldPhoto extends React.Component {

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
                <div id="uploadedPhoto">Uploaded Photo
                    {/* <form action="/fileupload">
                        <input type="file" id="myFile" name="filename"/>
                        <input type="submit"/>
                    </form> */}
                        <form action="/" encType="multipart/form-data" method="post">
                            <input type="file" name="file-to-upload"/>
                            <input type="submit" value="Upload"/>
                        </form> 
                </div>
        </div>  
        );
    };
}