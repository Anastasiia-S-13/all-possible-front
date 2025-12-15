import Image from "next/image";

type ToolProps = {
  images: string[];
};
const ToolGallery = ({ images }: ToolProps) => {
  return <Image src={images[0]} width={640} height={480} alt="Tool picture" />;
};

export default ToolGallery;
