import React, { Component } from 'react'
import Map from 'pigeon-maps'

import Marker from 'pigeon-marker'
import Overlay from 'pigeon-overlay'
import TweetEmbed from './TweetEmbed'
import Cluster from 'pigeon-cluster'

const MAPTILER_ACCESS_TOKEN = '7XKf5hhH4AJj5eCTMhtT'
const MAP_ID = 'basic'

function mapTilerProvider (x, y, z) {
  return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}.png?key=${MAPTILER_ACCESS_TOKEN}`
}


class ProtestMap extends Component {


  render(){

      const overlays = this.props.markers.map((tweet,idx) => {
        if (this.props.markerShow[idx])
          return (<Overlay key={Math.random()} anchor={tweet.loc} offset={[0, 0]}>
            <div className="overlay">
            <TweetEmbed link_to_tweet={tweet.url} />
            </div>
            </Overlay>)
      })


        return (
            <div className="mapWrapper">
                  <div className="buttonWrapper">
          {/* <input type="text" placeholder="lat,lng"/><br/>                  
                    <input type="text" placeholder="twitter link"/>
                    <br/>
                    <button className="btn btn-primary">Add event</button> */}
                    <a href="https://twitter.com/0xbanana"><img className="img-fluid" style={{height: "64px"}} src="https://media.tenor.com/images/09810950a6f4253604b28436264a5669/tenor.gif"/></a>
                  </div>
                 <Map provider={mapTilerProvider} center={[0,0]} zoom={5}>

                  <Cluster>
                {
                    this.props.markers.map((f,idx) => <Marker key={Math.random()} anchor={f['loc']} payload={idx} onClick={({ event, anchor, payload }) => {
                      console.log('click')
                      this.props.showMarker(payload)
          
            //           console.log(idx)
            //           let ts = this.state.markerShow
            // ts[payload] = !ts[payload]
            // this.setState({markerShow: ts })
            return(0)
                    }} />)
                }
                </Cluster>
                                {overlays}

    
  </Map>
            </div>
        );
  }
}

export default ProtestMap;
