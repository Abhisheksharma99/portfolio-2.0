"use client"

import { create } from "zustand"

export interface File {
  id: number
  name: string
  type: string
  size: number
  url: string
  uploadDate: string
}

interface FileStore {
  files: File[]
  addFile: (file: File) => void
  deleteFile: (id: number) => void
  initializeFiles: () => void
}

// Initial file data (empty, as files will be uploaded by the user)
const initialFiles: File[] = []

export const useFileStore = create<FileStore>((set) => ({
  files: [],

  addFile: (file) =>
    set((state) => {
      const newFiles = [...state.files, file]
      localStorage.setItem("portfolioFiles", JSON.stringify(newFiles))
      return { files: newFiles }
    }),

  deleteFile: (id) =>
    set((state) => {
      const newFiles = state.files.filter((file) => file.id !== id)
      localStorage.setItem("portfolioFiles", JSON.stringify(newFiles))
      return { files: newFiles }
    }),

  initializeFiles: () =>
    set(() => {
      // Try to get files from localStorage
      const storedFiles = localStorage.getItem("portfolioFiles")
      if (storedFiles) {
        return { files: JSON.parse(storedFiles) }
      }

      // If no files in localStorage, use initial data (empty array) and store it
      localStorage.setItem("portfolioFiles", JSON.stringify(initialFiles))
      return { files: initialFiles }
    }),
}))
