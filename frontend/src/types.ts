import { ReactNode, SetStateAction } from "react"

export interface AssignmentCardProps {
  number: number
  description: string
  icon: ReactNode
  handleClick: (path: any) => void
}

export interface ResultCardProps {
  title: string
  content: ReactNode
  onCodeClick: () => void
  height?: string
  mt?: number
  startIcon?: ReactNode
}

export interface CodeDialogProps {
  openDialog: boolean
  dialogContent: string | null
  setOpenDialog: (value: SetStateAction<boolean>) => void
  setDialogContent: (value: SetStateAction<string | null>) => void
}

export interface AppBarProps {
  title: string
}

export interface Results {
  matrix: number[][]
  b1_matrix: number[]
  b2_matrix: number[]
  eigenvalues_A: number[]
  iterations: number
  determinant: number
  condition_number: number
  condition_number_hilbert: number
  solution_x1: number[]
  solution_x2: number[]
}
