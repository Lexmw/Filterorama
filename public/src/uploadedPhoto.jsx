import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

export default class OldPhoto extends React.Component {

constructor(props) { //the constructor is here to set the initial state the components 
    super(props)
    this.state = {  
      photos:[]
    }

    this.uploadHandler = this.uploadHandler.bind(this);
//     this.MortgageCalc = this.MortgageCalc.bind(this);
//     this.ClickHandle = this.ClickHandle.bind(this);
}

// I need to write a function that can capture the req.file.path to update the file name of the image and swap out the uplaod form with the image.
    uploadHandler(event) {
        const data = new FormData();
    data.append('file', event.target.files[0]);

    axios.post('http://localhost:8080/upload', data)
      .then((res) => {
          console.log('This is the response' + res + 'THis is the data:' + data);
        this.setState({ photos: [res.data, ...this.state.photos] });
      });
    }
//the next function should populate the img on the edited side

//I need a function that can update the img filter on the click of a button. THis should be an onClick that will Change the styling

//I need a function that can handle the download button on click. It should allow us to dowload the image on click.

    render() {
        return(
        <div>
                <div id="uploadedPhoto">Uploaded Photo
                        <form method="POST" action="/" encType="multipart/form-data">
                            <div>
                                <label>Select your profile picture:</label>
                                <input type="file" name="profile_pic" />
                            </div>
                            <div>
                                <input type="submit" name="btn_upload_profile_pic" value="Upload"/>
                                <input type="file" name="file" onChange={this.uploadHandler}/>
                                {this.state.photos.map(photo => (<img src={`http://localhost:8080/${photo.filename}`} /> ))}
                            </div>
                            {/* <img src={require(`req.file.filepath`)}></img> */}
                        </form>

                </div>
        </div>  
        );
    };
}