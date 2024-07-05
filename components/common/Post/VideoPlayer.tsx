import { IAttachment } from '@/app/globalContext/types';
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ image }: { image: { Attachment: IAttachment } }) => {
  //   const playerRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {
    if (image && image.Attachment && image.Attachment.file_path) {
      setVideoSrc(image.Attachment.file_path);
    } else {
      setVideoSrc(
        'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
      );
    }
  }, [image]);

  return (
    <div className="mt-4 md:mt-0">
      <ReactPlayer
        title="video"
        // playerRef={playerRef}
        url={videoSrc}
        autoPlay={false}
        controls={true}
        width="100%"
        height="auto"
      />
    </div>
  );
};

export default VideoPlayer;
