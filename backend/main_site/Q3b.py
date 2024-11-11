import numpy as np
import matplotlib.pyplot as plt
from .equilibria import thomas_algorithm


import numpy as np
import matplotlib.pyplot as plt

def solve_bvp(P, a, b, u_a, u_b, h):
    """
    Solve the boundary value problem (BVP) for the equation u''(y) = P
    with boundary conditions u(a) = u_a and u(b) = u_b.
    
    Parameters:
    P (float): The constant value for the right-hand side of the equation (negative value used).
    a (float): The starting point of the interval.
    b (float): The ending point of the interval.
    u_a (float): The known value at the start of the interval (u(a)).
    u_b (float): The known value at the end of the interval (u(b)).
    h (float): The step size for discretization.

    Returns:
    y_values (numpy array): The y values at which the solution is computed.
    u_values (numpy array): The computed values of the solution u at each y.
    """
    # Step 1: Determine the number of points (N)
    N = int((b - a) / h) + 1  # Total number of points
    y_values = np.linspace(a, b, N)  # Discretized y values
    
    # Step 2: Initialize the coefficient matrix A and right-hand side vector rhs for the N-2 interior points
    # A is an (N-2) x (N-2) tridiagonal matrix and rhs is a vector of size N-2
    A = np.zeros((N-2, N-2))
    rhs = np.zeros(N-2)

    # Step 3: Populate the tridiagonal matrix A and the RHS vector
    for i in range(1, N-1):
        # Fill main diagonal with -2, sub-diagonal and super-diagonal with 1
        A[i-1, i-1] = -2  # Coefficient of u_i
        if i > 1:
            A[i-1, i-2] = 1  # Coefficient of u_{i-1}
        if i < N-2:
            A[i-1, i] = 1  # Coefficient of u_{i+1}
        
        # Set RHS for each interior point to -P * h^2
        rhs[i-1] = -P * h**2

    # Step 4: Adjust the RHS vector to account for the boundary conditions at u(a) and u(b)
    rhs[0] -= u_a  # Adjust for the first boundary condition (u(a))
    rhs[-1] -= u_b  # Adjust for the last boundary condition (u(b))

    # Step 5: Use Thomas algorithm (for tridiagonal matrices) to solve A * u_internal = rhs
    u_internal = thomas_algorithm(A, rhs)

    # Step 6: Combine the boundary values with the solution for internal points
    u_values = np.zeros(N)  # Initialize the solution vector for all points
    u_values[0] = u_a  # Boundary condition at y = a
    u_values[1:N-1] = u_internal  # Solution for interior points
    u_values[-1] = u_b  # Boundary condition at y = b

    return y_values, u_values




