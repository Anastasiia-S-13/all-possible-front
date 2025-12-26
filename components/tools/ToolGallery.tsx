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
      width={335}
      height={251}
      sizes="(max-width: 768px) 704px, 528px, (max-width: 1440px) 640px, 480px"
      alt="Tool picture"
      loading="lazy"
    />
  );
};

export default ToolGallery;
