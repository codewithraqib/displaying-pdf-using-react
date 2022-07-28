import React , {PureComponent} from "react";

import SinglePagePDFViewer from "./components/pdf/single-page";
import AllPagesPDFViewer from "./components/pdf/all-pages";
import { sampleBase64pdf } from "./sampleBase64pdf";
/* This is required only if the project file is located 
inside the app. Otherwise you can use the external link of the pdf file*/
import samplePDF from "./sample.pdf";
import "./styles.css";
import { apiCall } from "./apiCall";
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Worker, Viewer,SpecialZoomLevel, TextDirection, ProgressBar} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';

// Import styles
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';



const axios = require('axios');



// const defaultLayoutPluginInstance = defaultLayoutPlugin();
// const pageNavigationPluginInstance = pageNavigationPlugin({enableShortcuts: true});




export default class App extends PureComponent{


  constructor(props){
    super(props)


    this.state ={mediaUrl : null,epaper : null, totalPages: 0, currentPage: 0}

    this.getData()
  }


  getData = () => {
    apiCall({url: "https://epaper.srinagarreporter.in/admin/api/all-posts.php", 
    callback: res => {
      if(res && res.data && res.data.data){
        console.log("result from api is---", res.data)

        this.setState({mediaUrl : res.data.mediaUrl,epaper : res.data.data[0].EPaper })

      }
    }})
  }


  handlePageChange = (e) => {
    console.log("result from api is---",e)

    if(e.doc && e.doc._pdfInfo && e.doc._pdfInfo.numPages)
    this.setState({totalPages: e.doc._pdfInfo.numPages, currentPage: e.currentPage +1})
};




  // getLatestPost();

  render(){

    let url = "https://epaper.srinagarreporter.in/admin/admin/postimages/fe1433694661ecb11dcad43b4c3ae3ed.pdf"
     return (
      <div>

        <div className="App">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.1.266/build/pdf.worker.min.js">
            <Viewer fileUrl={samplePDF} defaultScale={SpecialZoomLevel.PageFit} 
            onPageChange={this.handlePageChange} 
            currentPage={this.state.currentPage}  
            theme={{
                direction: TextDirection.RightToLeft,
            }} 
            pageIndex={4}
            renderLoader={(percentages) => (
              <div style={{ width: '240px' }}>
                  <ProgressBar progress={Math.round(percentages)} />
              </div>
            )}
            plugins={[ pageNavigationPlugin]}
    />;

          </Worker>
        </div>


        <div style={styles.flex}>
          {/* <div style={styles.button}>
            <span >Prev</span>
          </div> */}

          <div>
            <span>{ "Page "+this.state.currentPage +"/"+this.state.totalPages}</span>
          </div>
          {/* <div style={styles.button}>
            <span >Next</span>
          </div> */}
        </div>
      </div>
    
  );

  }
 
}


const styles = {


  flex:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  button:{
    padding:10,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor:"blue",
    borderRadius: 8,
    color:"white",
    margin: 10
  }
}
