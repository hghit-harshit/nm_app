import { useState } from "react"
import { Typography, Box } from "@mui/material"
import { DataArray, Functions, Timeline } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import AssignmentCard from "../components/AssignmentCard"
import FullScreenLoadingOverlay from "../components/FullScreenLoadingOverlay"
import { StyledContainer } from "../styles/StyledContainer"

export default function Component() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleClick = (path: any) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate(path)
    }, 500)
  }

  const assignments = [
    {
      title: "Assignment 1",
      description: "Determines eigenvalues, determinant, uniqueness of a matrix.",
      icon: <DataArray sx={{ fontSize: 30 }} />,
      number: 1,
    },
    {
      title: "Assignment 2",
      description: "Determine roots and weights of Gauss-Legendre polynomial using eigenvalues.",
      icon: <Functions sx={{ fontSize: 30 }} />,
      number: 2,
    },
    {
      title: "Assignment 3",
      description: "Solve differential equations using numerical methods.",
      icon: <Timeline sx={{ fontSize: 30 }} />,
      number: 3,
    },
  ]

  return (
    <StyledContainer maxWidth="lg">
      <Box sx={{ mt: 8, mb: 6, textAlign: "center" }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontFamily: "Markazi Text",
            fontStyle: "normal",
            color: "#333",
            mb: 2,
            fontSize: "4.5rem",
            fontWeight: 400,
            letterSpacing: "2.5px",
          }}
        >
          Numerical Methods
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "Tomorrow",
            color: "#666",
            maxWidth: "800px",
            mx: "auto",
            mb: 6,
          }}
        >
          Welcome to our Matrix Solver project suite. These tools are designed
          to help students and professionals solve complex matrix problems
          efficiently. From calculating determinants to finding eigenvalues, our
          projects cover a wide range of matrix operations.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 4,
        }}
      >
        {assignments.map((assignment) => (
          <AssignmentCard
            key={assignment.title}
            description={assignment.description}
            icon={assignment.icon}
            handleClick={handleClick}
            number={assignment.number}
          />
        ))}
      </Box>

      {loading && <FullScreenLoadingOverlay />}

      <Box
        sx={{
          mt: 8,
          textAlign: "center",
          py: 2,
        }}
      >
        <Typography variant="body2" sx={{ color: "#666" }}>
          © {new Date().getFullYear()} Made with ❤️ by Team: name1, name2, name3, name4, name5, name6
        </Typography>
      </Box>
    </StyledContainer>
  )
}
