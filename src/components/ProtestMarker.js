import React, {useState} from 'react';
import Marker from 'pigeon-marker'
import Overlay from 'pigeon-overlay'
import TweetEmbed from './TweetEmbed';

function ProtestMarker(props) {
    const [o, setO] = useState(0)
    console.log('ProtestMarker:' + props.loc[0])
    return (
        <React.Fragment>
            <Marker anchor={props.loc} payload={1} onClick={({ event, anchor, payload }) => {
          setO(!o);
    }} />
  { Boolean(o) && 
    <Overlay anchor={props.loc} offset={[0, 0]}>
    <div className="overlay">
    <TweetEmbed link_to_tweet={props.link_to_tweet} />
    </div>
    </Overlay>
    
     }
     </React.Fragment>
    );
}

export default ProtestMarker;