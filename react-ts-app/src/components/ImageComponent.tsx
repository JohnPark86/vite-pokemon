type ImageProps = {
  src: string;
  altText: string;
  styleClass?: string;
};

export const ImageComponent: React.FC<ImageProps> = ({
  src,
  styleClass,
  altText,
}) => {
  return <img className={styleClass} src={src} alt={altText} />;
};
