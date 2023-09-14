import React, { useEffect, useMemo, useState, useRef } from 'react';
import View360, {
  ControlBar,
  EquirectProjection,
  LoadingSpinner,
} from '@egjs/react-view360';
import '@egjs/react-view360/css/view360.min.css';
import Arrows from '../../components/Hotpots/Arrows/Arrows';
import Button from '../../components/Common/Button';
import AdjustIcon from '@mui/icons-material/Adjust';
import '@egjs/react-view360/css/view360.min.css';
import '@egjs/view360/css/loading-spinner.min.css';
import def from './bedroom.jpeg';

const V360 = ({ image }) => {
  const [position, setPosition] = useState({
    yaw: 110,
    pitch: -30,
  });
  console.log(def);

  const [sofaInfo, setSofaInfo] = useState(false);
  const [hotspots, setHotspot] = useState([]) as any;
  const [state, setState] = useState([]) as any;
  const [p, setP] = useState(def);
  const imgUrl = new URL('./bedroom.jpeg', import.meta.url).href;

  const plugin = useMemo(() => {
    return new ControlBar({ fullscreenButton: true });
  }, []);
  const spinner = useMemo(() => {
    return new LoadingSpinner();
  }, []);

  const projection = useMemo(
    () =>
      new EquirectProjection({
        src: p,
      }),
    [p]
  );

  const viewRef = useRef();
  console.log(p);
  // Refresh Hotspots for hotspot changes
  useEffect(() => {
    if (viewRef.current) {
      viewRef.current?.hotspot?.refresh();
      viewRef.current?.hotspot?.render(viewRef.current?.camera);
    }
  }, [hotspots]);

  return (
    imgUrl && (
      <View360
        plugins={[plugin, spinner]}
        ref={viewRef}
        className="is-16by9 "
        projection={projection}
        hotspot={{
          zoom: true,
        }}
      >
        <div className="absolute w-fit h-fit flex items-center justify-center  top-1/2 left-1/2  translate-x-[-50%] translate-y-[-50%]">
          <AdjustIcon />
        </div>

        <Button
          text="set Marker"
          className="absolute top-1 left-1 bg-white"
          onClick={() => {
            setHotspot((prev: any) => [
              <Arrows
                yaw={viewRef.current?.camera?.yaw}
                pitch={viewRef.current?.camera?.pitch}
              />,
              ...prev,
            ]);
          }}
        />

        <div className="view360-hotspots">
          <Arrows
            yaw={'0'}
            pitch={'0'}
            onClick={() => {
              setP(new URL('./panorama.jpg', import.meta.url).href);
            }}
          />

          <Arrows
            yaw={'20'}
            pitch={'0'}
            onClick={() => {
              setP(new URL('./bedroom.jpeg', import.meta.url).href);
            }}
            scale={2}
          />

          {hotspots}
          <div
            className="view360-hotspot text-red-400 "
            data-yaw={position.yaw}
            data-pitch={position.pitch}
          >
            <span
              onClick={() => setSofaInfo((prev) => !prev)}
              className="p-5 bg-black rounded-full"
            >
              Ikea sofa
            </span>
            {sofaInfo && (
              <span className="p-5 bg-white">price: $500 color: Beige</span>
            )}
          </div>
        </div>
      </View360>
    )
  );
};

export default V360;
