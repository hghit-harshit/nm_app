import numpy as np
from .equilibria import *
import matplotlib.pyplot as plt
import matplotlib
from sympy import Rational
matplotlib.use('Agg')

# Utility functions for polynomial operations
def multiply_by_x(poly):
    """Multiplies a polynomial by x (shifts coefficients by one position)."""
    return [0] + poly

def multiply_by_constant(poly, constant):
    """Multiplies each coefficient of the polynomial by a constant."""
    return [coef * constant for coef in poly]

def add_polynomials(poly1, poly2):
    """Adds two polynomials, ensuring zero padding for different degrees."""
    max_degree = max(len(poly1), len(poly2))
    result_poly = [0] * max_degree
    for i in range(len(poly1)):
        result_poly[i] += poly1[i]
    for i in range(len(poly2)):
        result_poly[i] += poly2[i]
    return result_poly

def legendre_polynomial(n):
    """Calculates the nth order Legendre polynomial using recurrence relation."""
    if n == 0:
        return [1.0]
    elif n == 1:
        return [0.0, 1.0]

    P_prev2 = [1.0]
    P_prev1 = [0.0, 1.0]

    for i in range(1, n):
        term1 = multiply_by_constant(multiply_by_x(P_prev1), (2 * i + 1) / (i + 1))
        term2 = multiply_by_constant(P_prev2, -i / (i + 1))
        P_current = add_polynomials(term1, term2)
        P_prev2 = P_prev1
        P_prev1 = P_current

    return P_current

def companion_matrix(coefficients):
    """Constructs the companion matrix for a polynomial given its coefficients."""
    degree = len(coefficients) - 1
    if degree < 1:
        return np.array([[0]])
    elif degree == 1:
        return np.array([[0, -coefficients[0]]])

    matrix = np.zeros((degree, degree))
    for i in range(degree - 1):
        matrix[i, i + 1] = 1
    for j in range(degree):
        matrix[degree - 1, j] = -coefficients[j] / coefficients[degree]

    return matrix
def fcompanion_matrix(coefficients):
    """Constructs the companion matrix for a polynomial given its coefficients in fractions."""
    degree = len(coefficients) - 1
    matrix = np.zeros((degree, degree), dtype=object)  # Initialize matrix with object type to store fractions

    for i in range(degree - 1):
        # Fill in the first column for the companion matrix
        matrix[i, i + 1] = Rational(1, 1)  # 1 in fraction form

    # Fill in the last row for the companion matrix
    for j in range(degree):
        matrix[degree - 1, j] = Rational(-coefficients[j], coefficients[degree])

    return matrix

def lagrange_basis_polynomial(i, nodes, x):
    """Compute the i-th Lagrange basis polynomial L_i(x) at points x."""
    L_i = np.ones_like(x)
    n = len(nodes)
    for j in range(n):
        if j != i:
            denominator = nodes[i] - nodes[j]
            if denominator != 0:
                L_i *= (x - nodes[j]) / denominator
    return L_i

def integrate_lagrange_basis(i, nodes, num_points=1000):
    """Numerically integrate the i-th Lagrange basis polynomial over [-1, 1]."""
    x_values = np.linspace(-1, 1, num_points)
    L_i_values = lagrange_basis_polynomial(i, nodes, x_values)
    integral_value = np.trapz(L_i_values, x=x_values)  # Updated from np.trapz
    return integral_value 

def calculate_weights(nodes):
    """Calculate the weights for Gauss-Legendre quadrature using Lagrangian interpolation."""
    n = len(nodes)
    weights = np.zeros(n)
    for i in range(n):
        weights[i] = integrate_lagrange_basis(i, nodes)
    return weights


    



