"use client";

import { createContext, useContext } from "react";
import { uploadCourseImage } from "@/app/services/courseService";

// ── Context ───────────────────────────────────────────────────

type CourseEditorContextValue = {
  courseId: string;
  /**
   * Sube un archivo de imagen al storage y devuelve la URL pública.
   * Si el courseId está vacío (modo offline/prototipo) devuelve data URL.
   */
  uploadImage: (file: File) => Promise<string>;
};

export const CourseEditorContext = createContext<CourseEditorContextValue>({
  courseId: "",
  uploadImage: async (file: File) => readAsDataUrl(file),
});

// ── Provider ──────────────────────────────────────────────────

export function CourseEditorProvider({
  courseId,
  children,
}: {
  courseId: string;
  children: React.ReactNode;
}) {
  async function uploadImage(file: File): Promise<string> {
    if (!courseId) {
      // Fallback a base64 si todavía no hay ID de curso en la DB
      return readAsDataUrl(file);
    }
    return uploadCourseImage(courseId, file);
  }

  return (
    <CourseEditorContext.Provider value={{ courseId, uploadImage }}>
      {children}
    </CourseEditorContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────

export function useCourseEditor() {
  return useContext(CourseEditorContext);
}

// ── Helpers ───────────────────────────────────────────────────

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
