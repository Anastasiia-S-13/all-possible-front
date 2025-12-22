"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import css from "./AvatarPicker.module.css";

interface AvatarPickerProps {
  value?: string | null;
  onChange: (file: File) => void;
}
const AvatarPicker = ({ value, onChange }: AvatarPickerProps) => {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only images");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Max file size 5MB");
      return;
    }
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file);
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // useEffect(() => {
  //   setPreviewUrl(toolPhotoUrl || "");
  // }, [toolPhotoUrl]);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];

  //   if (!file) return;

  //   if (!file.type.startsWith("image/")) {
  //     setError("Only images");
  //     return;
  //   }

  //   if (file.size > 5 * 1024 * 1024) {
  //     setError("Max file size 5MB");
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setPreviewUrl(reader.result as string);
  //   };
  //   reader.readAsDataURL(file);

  //   onChangePhoto(file);
  // };

  const handleRemove = () => {
    // onChangePhoto(null);
    setPreview("");
  };

  const triggerFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={css.avatarPicker}>
      <legend className={css.legend}>Фото інструменту</legend>
      <div className={css.picker}>
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            width={300}
            height={300}
            className={css.avatar}
          />
        ) : (
          <Image
            onClick={triggerFileDialog}
            src={preview || "/images/PlaceholderImage-Desktop.svg"}
            alt="Placeholder"
            width={865}
            height={576}
            className={css.avatar}
          />
        )}

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleChange}
          className={css.hiddenInput}
          title="Upload image"
        />

        {preview && (
          <button className={css.remove} onClick={handleRemove}>
            ❌
          </button>
        )}
      </div>

      <button className={css.uploadBtn} onClick={triggerFileDialog}>
        Завантажити фото
      </button>

      {error && <p className={css.error}>{error}</p>}
    </div>
  );
};

export default AvatarPicker;
