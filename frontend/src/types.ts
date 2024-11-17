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

export interface NodesWeightsTableProps {
  data: GaussLegendreResults | LangrangeResults | null
  type: 'gl' | 'l'
  setOpenModal: (value: SetStateAction<boolean>) => void
  handleCodeButtonClick: (content: string) => void
  setOpenDialog: (value: SetStateAction<boolean>) => void
}

export interface PlotProps {
  data: GaussLegendreResults | LangrangeResults | null
  type: 'gl' | 'l'
  handleCodeButtonClick: (content: string) => void
  setOpenDialog: (value: SetStateAction<boolean>) => void
}

export interface MatrixModalProps {
  openModal: boolean
  setOpenModal: (value: SetStateAction<boolean>) => void
  langrangeData: LangrangeResults | null
  handleCodeButtonClick: (content: string) => void
  setOpenDialog: (value: SetStateAction<boolean>) => void
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

export interface GaussLegendreResults {
  nodes: number[]
  weights: number[]
  plot_url: string
}

export interface LangrangeResults {
  nodes: number[]
  weights: number[]
  plot_url: string
  matrix: number[][]
}

export interface EquationInput {
  P: number
  u0: number
  uEnd: number
}

export interface GraphData {
  explicit: string
  implicit: string
  finite_difference: string
  analytical: string
  graph5: string
}
