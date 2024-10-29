import { ChangeEvent, useCallback, useRef, useState } from "react";

export function useImageInput() {
  const ref = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>();
  const [hasError, setHasError] = useState(false);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setHasError(false);
    const imageString = URL.createObjectURL(file);
    setImage(imageString);
  }, []);

  const trigger = useCallback(() => ref.current?.click(), []);

  const validate = useCallback(() => setHasError(!image), [image]);

  return { ref, image, onChange, trigger, validate, hasError };
}
