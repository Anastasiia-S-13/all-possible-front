import Image from "next/image";

type ToolProps = {
  images: string;
};
const ToolGallery = ({ images }: ToolProps) => {
  return (
    <Image
      src={images}
      width={640}
      height={480}
      alt="Tool picture"
      loading="lazy"
    />
  );
};

export default ToolGallery;
