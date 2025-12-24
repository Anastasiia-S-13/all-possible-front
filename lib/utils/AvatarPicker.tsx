"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import css from "./AvatarPicker.module.css";

type Props = {
  toolPhotoUrl?: string;
  onChangePhoto: (file: File | null) => void;
};

const AvatarPicker = ({ toolPhotoUrl, onChangePhoto }: Props) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setPreviewUrl(toolPhotoUrl || "");
  }, [toolPhotoUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    onChangePhoto(file);
  };

  const handleRemove = () => {
    onChangePhoto(null);
    setPreviewUrl("");
  };

  const triggerFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={css.avatarPicker}>
      <legend className={css.legend}>Фото інструменту</legend>
      <div className={css.picker}>
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Preview"
            width={300}
            height={300}
            className={css.avatar}
          />
        ) : (
          <Image
            onClick={triggerFileDialog}
            src={previewUrl || "/image/PlaceholderImage-Desktop.svg"}
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
          onChange={handleFileChange}
          className={css.hiddenInput}
          title="Upload image"
        />

        {previewUrl && (
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
