import React, {Component} from 'react';
import Axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import ProtestMap from './components/ProtestMap';
class App extends Component {

  constructor(params) {
    super(params)
  this.state = {
    API: "https://3ae6913169f7.ngrok.io",
    markers: [],
    markerShow: []
  }    
  this.showMarker =this.showMarker.bind(this)
  }

  showMarker(idx){
    console.log('app: ',idx)
    let ar = this.state.markerShow
    ar[idx] = !ar[idx]
    this.setState({markerShow: ar})
  }


componentDidMount() {
  Axios.get(this.state.API + '/get/markers')
    .then((resp)=>{
      console.log(resp.data)
      const markers = resp.data.map((mark)=>{
        let loc = mark.geo.slice(1,-1).split(',')
        loc[0] = parseFloat(loc[0])
        loc[1] = parseFloat(loc[1])
        return ( { loc: [loc[0], loc[1]] , url: mark.url } )
      })

      const markerShow = markers.map(()=>{return false})
      this.setState({markers: markers, markerShow: markerShow})
    })
}
render(){
  return (
    <div className="wrapper">
      <ProtestMap showMarker={this.showMarker} markers={this.state.markers} markerShow={this.state.markerShow}/>
    </div>
    );
}

}
export default App;
