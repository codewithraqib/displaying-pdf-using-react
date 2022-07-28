import React , {PureComponent} from "react";

import SinglePagePDFViewer from "./components/pdf/single-page";
import AllPagesPDFViewer from "./components/pdf/all-pages";
import { sampleBase64pdf } from "./sampleBase64pdf";
/* This is required only if the project file is located 
inside the app. Otherwise you can use the external link of the pdf file*/
import samplePDF from "./sample.pdf";
import "./styles.css";
import { apiCall } from "./apiCall";



const axios = require('axios');



export default class App extends React.PureComponent{


  constructor(props){
    super(props)


    this.state ={mediaUrl : null,epaper : null}

    this.getData()
  }


  getData = () => {
    apiCall({url: "https://epaper.srinagarreporter.in/admin/api/all-posts.php", 
    callback: res => {
      if(res && res.data && res.data.data){
        console.log("result from api is---", res.data.data[0].EPaper)

        this.setState({mediaUrl : res.data.mediaUrl,epaper : res.data.data[0].EPaper })

      }
    }})
  }




  // getLatestPost();

  render(){
     return (
    <div className="App">
      {/* <h4>Single Page</h4> */}

      <div className="header">
        <div className="logo-container">
          <img src="./img/logo2.png" />
        </div>

        <div className="website-title">
          <span> Epaper | Srinagar Reporter</span>
        </div>
      </div>
      {/* <SinglePagePDFViewer pdf={samplePDF} /> */}
      {/* <SinglePagePDFViewer pdf={{URL: {url: 'https://www.kashmiruniversity.net/events/6455.pdf' }} } /> */}

      {this.state.epaper && 
      <SinglePagePDFViewer pdf={this.state.mediaUrl+this.state.epaper} />}

      {/* <hr /> */}

      {/* <h4>All Pages</h4>
      <div className="all-page-container">
        <AllPagesPDFViewer pdf={samplePDF} />
      </div>

      <hr />

      <h4>Base 64 Single Page</h4>
      <SinglePagePDFViewer pdf={sampleBase64pdf} />

      <hr /> */}
    </div>
  );

  }
 
}
