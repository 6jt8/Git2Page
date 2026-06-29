import { useState, Fragment, useEffect } from 'react';

const LazyImage = ({
  placeholder,
  src,
  alt,
  ...rest
}: {
  placeholder: React.ReactElement;
  src: string;
  alt: string;
  [key: string]: unknown;
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const imageToLoad = new Image();
    imageToLoad.src = src;

    imageToLoad.onload = () => {
      setLoading(false);
    };

    return () => {
      imageToLoad.onload = null;
    };
  }, [src]);

  return (
    <Fragment>
      {loading ? (
        placeholder
      ) : (
        <img src={src} alt={alt} loading="lazy" {...rest} />
      )}
    </Fragment>
  );
};

export default LazyImage;
