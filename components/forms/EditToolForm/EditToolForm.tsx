'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-hot-toast';
import { toolSchema } from '@/lib/validations';
import { getCategories, updateTool } from '@/lib/api/clientApi';
import { Tool } from '@/types/Tool';
import { Category } from '@/types/Tool';
import styles from './EditToolForm.module.css';

interface EditToolFormProps {
  tool: Tool;
  onSuccess?: () => void;
}

interface FormValues {
  name: string;
  pricePerDay: number;
  category: string;
  description: string;
  rentalTerms: string;
  specifications: string;
}

export default function EditToolForm({ tool, onSuccess }: EditToolFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(tool.images || null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        toast.error('Не вдалося завантажити категорії');
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const initialValues: FormValues = {
    name: tool.name || '',
    pricePerDay: tool.pricePerDay || 0,
    category: '',
    description: tool.description || '',
    rentalTerms: tool.rentalTerms || '',
    specifications: tool.specifications
      ? Object.entries(tool.specifications).map(([k, v]) => `${k}: ${v}`).join('\n')
      : '',
  };

  const handleImageChange = (file: File | null) => {
    if (!file) return;

    if (!file.type.match(/^image\/(jpeg|png)$/)) {
      toast.error('Дозволені тільки JPG та PNG формати');
      return;
    }

    if (file.size > 1024 * 1024) {
      toast.error('Розмір файлу не повинен перевищувати 1MB');
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('pricePerDay', String(values.pricePerDay));
      formData.append('category', values.category);
      formData.append('description', values.description);
      formData.append('rentalTerms', values.rentalTerms);

      if (values.specifications) {
        formData.append('specifications', values.specifications);
      }

      if (imageFile) {
        formData.append('image', imageFile);
      }

      await updateTool(tool._id, formData);
      toast.success('Інструмент успішно оновлено!');

      if (onSuccess) {
        onSuccess();
      } else {
        router.push(`/tools/${tool._id}`);
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Помилка при оновленні інструменту');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoadingCategories) {
    return (
      <div className={styles.loading}>
        <span>Завантаження...</span>
      </div>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toolSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <div className={styles.formWrapper}>
          <Form className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Фото інструменту</label>
              <div className={styles.imageUpload}>
                {imagePreview ? (
                  <div className={styles.imagePreview}>
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className={styles.previewImage}
                    />
                  </div>
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                )}
                <button
                  type="button"
                  className={styles.uploadButton}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Завантажити фото
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  className={styles.hiddenInput}
                  onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Назва
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Введіть назву"
                className={`${styles.input} ${errors.name && touched.name ? styles.inputError : ''}`}
              />
              <ErrorMessage name="name" component="span" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="pricePerDay" className={styles.label}>
                Ціна/день
              </label>
              <Field
                type="number"
                id="pricePerDay"
                name="pricePerDay"
                placeholder="500"
                min="0"
                className={`${styles.input} ${errors.pricePerDay && touched.pricePerDay ? styles.inputError : ''}`}
              />
              <ErrorMessage name="pricePerDay" component="span" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="category" className={styles.label}>
                Категорія
              </label>
              <Field
                as="select"
                id="category"
                name="category"
                className={`${styles.select} ${errors.category && touched.category ? styles.inputError : ''}`}
              >
                <option value="">Категорія</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="category" component="span" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="rentalTerms" className={styles.label}>
                Умови оренди
              </label>
              <Field
                type="text"
                id="rentalTerms"
                name="rentalTerms"
                placeholder="Застава 8000 грн. Стакина та бак для води надаються окремо."
                className={`${styles.input} ${errors.rentalTerms && touched.rentalTerms ? styles.inputError : ''}`}
              />
              <ErrorMessage name="rentalTerms" component="span" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Опис
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                placeholder="Ваш опис"
                className={`${styles.textarea} ${errors.description && touched.description ? styles.inputError : ''}`}
              />
              <ErrorMessage name="description" component="span" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="specifications" className={styles.label}>
                Характеристики
              </label>
              <Field
                as="textarea"
                id="specifications"
                name="specifications"
                placeholder="Характеристики інструменту"
                className={`${styles.textarea} ${styles.textareaLarge} ${errors.specifications && touched.specifications ? styles.inputError : ''}`}
              />
              <ErrorMessage name="specifications" component="span" className={styles.error} />
            </div>
          </Form>

          <div className={styles.buttonsSection}>
            <button
              type="submit"
              form="tool-form"
              className={styles.submitButton}
              disabled={isSubmitting}
              onClick={() => {
                const form = document.querySelector('form');
                if (form) form.requestSubmit();
              }}
            >
              {isSubmitting ? 'Збереження...' : 'Зберегти'}
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Відмінити
            </button>
          </div>
        </div>
      )}
    </Formik>
  );
}
