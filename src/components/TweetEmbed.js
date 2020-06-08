import React from 'react';
import ScriptTag from 'react-script-tag';


function TweetEmbed(props) {
    const url ="https://" + props.link_to_tweet + "?ref_src=twsrc%5Etfw"

    return (
        <div>
            <blockquote className="twitter-tweet">
      <a href={url}>&nbsp;</a>
      </blockquote>
      <ScriptTag async type="text/javascript" src="https://platform.twitter.com/widgets.js" charSet="utf-8" /> 
        </div>
    );
}

export default TweetEmbed;
