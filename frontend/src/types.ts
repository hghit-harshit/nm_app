import { Dispatch, ReactNode, SetStateAction } from "react"

export interface AssignmentCardProps {
    number: number
    description: string
    icon: ReactNode
    handleClick: (path: any) => void
}