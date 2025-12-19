import Image from "next/image";

import css from "./ToolGallery.module.css";

type ToolProps = {
  images: string;
};
const ToolGallery = ({ images }: ToolProps) => {
  return (
    <Image
      className={css.toolImage}
      src={images}
      width={640}
      height={480}
      alt="Tool picture"
      loading="lazy"
    />
  );
};

export default ToolGallery;
