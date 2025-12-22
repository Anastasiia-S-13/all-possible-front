// app/(site)/profile/[userId]/edit/AvatarUpload.tsx

'use client';

import styles from './EditProfile.module.css';

interface AvatarUploadProps {
  previewUrl?: string;
  onChange: (file: File) => void;
}

export default function AvatarUpload({
  previewUrl,
  onChange,
}: AvatarUploadProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onChange(file);
  };

  return (
    <div className={styles.formGroup}>
      <label htmlFor="avatar">Аватар</label>

      {previewUrl && (
        <div className={styles.avatarWrapper}>
          <img
            src={previewUrl}
            alt="Avatar preview"
            className={styles.avatarPreview}
          />
        </div>
      )}

      <input
        id="avatar"
        type="file"
        accept="image/*"
        className={styles.input}
        onChange={handleChange}
      />
    </div>
  );
}
