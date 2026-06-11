export type ChomzyAgentRole = 'librarian' | 'archivist' | 'editor';

export type ImportJobStatus =
  | 'pending'
  | 'inspecting'
  | 'preview_ready'
  | 'importing'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface NovelMetadata {
  title: string;
  author?: string;
  description?: string;
  totalChapters?: number;
  language?: string;
}

export interface ChapterDraft {
  chapterNumber: number;
  title: string;
  content: string;
  originalIndex?: number;
}

export interface DiaryEntryDraft {
  date: Date;
  title?: string;
  content: string;
  tags?: string[];
}

export interface AgentWarning {
  code: string;
  message: string;
  severity: 'info' | 'warning' | 'error';
}

export interface ImportJob {
  id: string;
  sourcePath: string;
  status: ImportJobStatus;
  metadata?: NovelMetadata;
  chapters: ChapterDraft[];
  warnings: AgentWarning[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChomzyAgentState {
  currentRole: ChomzyAgentRole;
  activeJobId?: string;
  lastInteraction?: Date;
}

export interface AgentActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  warnings?: AgentWarning[];
}
