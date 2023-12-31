import './imageSlider.css';
import { Delete } from '@mui/icons-material';
const ImageCard = ({
  url,
  onClick,
  imageCardStyles,
}: {
  url: string;
  imageCardStyles?: string;
  onClick: () => void;
}) => {
  return (
    <div className={`inline-block `}>
      <img
        src={url}
        className={`cursor-pointer hover:scale-105 max-w-[200px] h-auto aspect-video overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out ${imageCardStyles}`}
        onClick={() => onClick()}
      />
    </div>
  );
};

const ImageSlider = ({
  className,
  imageCardStyles,
  panoramas = [],
  onClick,
  onDelete,
}: {
  className: string;
  imageCardStyles?: string;
  panoramas: any[];
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <div
      className={`flex  overflow-x-scroll pt-2 pb-1 hide-scroll-bar ${className}`}
    >
      <div className="flex gap-3  flex-nowrap  px-5   ">
        {/*  lg:ml-40 md:ml-20 ml-10  */}
        {/* justify-center w-full */}
        {panoramas &&
          panoramas.map((e) => (
            <div className="relative max-w-[200px]">
              <ImageCard
                key={e._id}
                imageCardStyles={imageCardStyles}
                url={e.url}
                onClick={() => onClick(e._id)}
              />

              {onDelete && (
                <Delete
                  className={
                    'text-[1rem] absolute right-2 top-2 cursor-pointer hover:text-blue-500'
                  }
                  sx={{ color: 'white' }}
                  onClick={() => onDelete(e._id)}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageSlider;
