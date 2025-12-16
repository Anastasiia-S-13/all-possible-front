"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import css from "./AvatarPicker.module.css";

type Props = {
  toolPhotoUrl?: string;
  onChangePhoto: (file: File | null) => void;
};

const AvatarPicker = ({ toolPhotoUrl, onChangePhoto }: Props) => {
  const [previewUrl, setPreviewUrl] = useState(""); // стан превью зображееннння
  const [error, setError] = useState(""); // Стан помилки вибору зображеення

  // додаємо у стан пропс який повертає бекенд у вигляді url
  useEffect(() => {
    setPreviewUrl(toolPhotoUrl || "");
  }, [toolPhotoUrl]);

  // обробнник зміни файлу
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("file", file);

    // обмеженння за розміром та типом
    if (file) {
      // Перевіряємо тип файлу
      if (!file.type.startsWith("image/")) {
        setError("Only images");
        return;
      }

      // Перевіряємо розмір файлу (максимум 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Max file size 5MB");
        return;
      }

      // прев'ю обраного файлу

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChangePhoto(file); // передаємо файл у батьківський компонент
    }
  };

  // функція видалеення та перезавантаження фото
  const handleRemove = () => {
    onChangePhoto(null);
    setPreviewUrl("");
  };

  return (
    <div>
      <div className={css.picker}>
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Preview"
            width={300}
            height={300}
            className={css.avatar}
          />
        )}
        <label
          className={previewUrl ? `${css.wrapper} ${css.reload}` : css.wrapper}
        >
          📷 Choose photo
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={css.input}
          />
        </label>
        {previewUrl && (
          <button className={css.remove} onClick={handleRemove}>
            ❌
          </button>
        )}
      </div>
      {error && <p className={css.error}>{error}</p>}
    </div>
  );
};

export default AvatarPicker;
