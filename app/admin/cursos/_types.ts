// ─────────────────────────────────────────────────────────────
// TIPOS DEL EDITOR DE CURSOS
// Estructura completa: Course → Chapter → Slide → Block
// ─────────────────────────────────────────────────────────────

export type BlockType =
  | "heading"
  | "paragraph"
  | "image"
  | "cards"
  | "callout"
  | "divider"
  | "quiz";

// ── Bloques individuales ─────────────────────────────────────

export type HeadingBlock = {
  id: string;
  type: "heading";
  text: string;
  level: 1 | 2 | 3;
};

export type ParagraphBlock = {
  id: string;
  type: "paragraph";
  text: string;
};

export type ImageBlock = {
  id: string;
  type: "image";
  url: string; // base64 data URL (frontend) → remote URL (producción)
  alt: string;
  caption: string;
  size: "small" | "medium" | "large" | "full";
  align: "left" | "center" | "right";
};

export type CardItem = {
  id: string;
  /** Emoji OR imagen — solo uno a la vez */
  emoji: string;
  imageUrl: string; // data URL o vacío
  useImage: boolean; // true = mostrar imagen, false = mostrar emoji
  title: string;
  description: string;
};

export type CardsBlock = {
  id: string;
  type: "cards";
  columns: 2 | 3 | 4;
  items: CardItem[];
};

export type CalloutVariant = "info" | "tip" | "warning" | "important";

export type CalloutBlock = {
  id: string;
  type: "callout";
  variant: CalloutVariant;
  title: string;
  text: string;
};

export type DividerBlock = {
  id: string;
  type: "divider";
};

export type QuizOption = {
  id: string;
  text: string;
  correct: boolean;
};

export type QuizQuestion = {
  id: string;
  text: string;
  explanation: string;
  options: QuizOption[];
};

export type QuizBlock = {
  id: string;
  type: "quiz";
  questions: QuizQuestion[];
};

export type Block =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | CardsBlock
  | CalloutBlock
  | DividerBlock
  | QuizBlock;

// ── Diapositivas ─────────────────────────────────────────────

export type Slide = {
  id: string;
  title: string;
  blocks: Block[];
  /** Imagen de portada de la diapo (aparece detrás del título) */
  coverImageUrl: string;
};

// ── Capítulos ─────────────────────────────────────────────────
// Cada capítulo agrupa diapositivas y actúa como checkpoint.
// El usuario debe completar todas las diapos del capítulo antes
// de avanzar al siguiente.

export type Chapter = {
  id: string;
  title: string;
  description: string;
  slides: Slide[];
};

// ── Curso ─────────────────────────────────────────────────────

export type CourseStatus = "draft" | "published";

export type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  passing_score: number; // 0–100
  estimated_minutes: number;
  signature_url: string;
  status: CourseStatus;
  chapters: Chapter[]; // estructura principal
  created_at: string;
  updated_at: string;
};

// ── Helpers ───────────────────────────────────────────────────

export function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function makeEmptySlide(): Slide {
  return {
    id: makeId(),
    title: "Nueva diapositiva",
    blocks: [],
    coverImageUrl: "",
  };
}

export function makeQuizSlide(): Slide {
  return {
    id: makeId(),
    title: "Evaluación",
    blocks: [makeBlock("quiz")],
    coverImageUrl: "",
  };
}

export function makeEmptyChapter(index = 1): Chapter {
  return {
    id: makeId(),
    title: `Capítulo ${index}`,
    description: "",
    slides: [makeEmptySlide()],
  };
}

export function makeEmptyCourse(): Course {
  const now = new Date().toISOString();
  return {
    id: makeId(),
    title: "Nuevo curso",
    description: "",
    category: "",
    passing_score: 80,
    signature_url: "",
    estimated_minutes: 30,
    status: "draft",
    chapters: [
      {
        id: makeId(),
        title: "Introducción",
        description: "",
        slides: [makeEmptySlide()],
      },
    ],
    created_at: now,
    updated_at: now,
  };
}

export function makeBlock(type: BlockType): Block {
  const id = makeId();
  switch (type) {
    case "heading":
      return { id, type: "heading", text: "Título", level: 2 };
    case "paragraph":
      return { id, type: "paragraph", text: "Escribí el contenido acá..." };
    case "image":
      return {
        id,
        type: "image",
        url: "",
        alt: "",
        caption: "",
        size: "medium",
        align: "center",
      };
    case "cards":
      return {
        id,
        type: "cards",
        columns: 3,
        items: [
          {
            id: makeId(),
            emoji: "✅",
            imageUrl: "",
            useImage: false,
            title: "Punto clave",
            description: "Descripción del punto.",
          },
          {
            id: makeId(),
            emoji: "📌",
            imageUrl: "",
            useImage: false,
            title: "Punto clave",
            description: "Descripción del punto.",
          },
          {
            id: makeId(),
            emoji: "💡",
            imageUrl: "",
            useImage: false,
            title: "Punto clave",
            description: "Descripción del punto.",
          },
        ],
      };
    case "callout":
      return {
        id,
        type: "callout",
        variant: "info",
        title: "Importante",
        text: "Texto destacado.",
      };
    case "divider":
      return { id, type: "divider" };
    case "quiz":
      return {
        id,
        type: "quiz",
        questions: [
          {
            id: makeId(),
            text: "Escribí la pregunta aquí",
            explanation: "",
            options: [
              { id: makeId(), text: "Opción A", correct: true },
              { id: makeId(), text: "Opción B", correct: false },
              { id: makeId(), text: "Opción C", correct: false },
            ],
          },
        ],
      };
  }
}

// ── Utilidades de navegación ──────────────────────────────────

export type ActiveLocation = {
  chapterId: string;
  slideId: string;
};

export function findSlide(
  course: Course,
  chapterId: string,
  slideId: string,
): Slide | null {
  return (
    course.chapters
      .find((c) => c.id === chapterId)
      ?.slides.find((s) => s.id === slideId) ?? null
  );
}

export function findChapter(course: Course, chapterId: string): Chapter | null {
  return course.chapters.find((c) => c.id === chapterId) ?? null;
}

/** Índice global de diapositivas (para barra de progreso) */
export function flatSlideIndex(
  course: Course,
  chapterId: string,
  slideId: string,
): number {
  let idx = 0;
  for (const ch of course.chapters) {
    for (const sl of ch.slides) {
      if (ch.id === chapterId && sl.id === slideId) return idx;
      idx++;
    }
  }
  return idx;
}

export function totalSlides(course: Course): number {
  return course.chapters.reduce((acc, c) => acc + c.slides.length, 0);
}
