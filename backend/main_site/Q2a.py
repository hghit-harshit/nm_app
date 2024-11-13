
from .equilibria import *
import math
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')



def gauss_legendre_companion_matrix(n):
    """
    Generate the companion matrix for the Legendre polynomial of degree n.
    
    Parameters:
        n (int): The degree of the Legendre polynomial.

    Returns:
        np.ndarray: Companion matrix for the Legendre polynomial of degree n.
    """
    if n <= 0:
        raise ValueError("Degree n must be a positive integer.")
    
    # Initialize the companion matrix
    companion_matrix = np.zeros((n, n))
    
    # Fill the subdiagonal and superdiagonal entries
    for j in range(1, n):
        value = j / math.sqrt(4 * j * j - 1)
        companion_matrix[j, j - 1] = value
        companion_matrix[j - 1, j] = value
    
    return companion_matrix




def legendre_polynomial_derivative(n, x):
    """
    Computes the derivative of the Legendre polynomial P_n at x.
    
    Parameters:
        n (int): Degree of the Legendre polynomial.
        x (float): Point at which to evaluate the derivative.
    
    Returns:
        float: The value of P'_n(x).
    """
    Pn_1, Pn = 1, x  # Initial values for P_0(x) and P_1(x)
    
    for k in range(2, n + 1):
        Pn_plus_1 = ((2 * k - 1) * x * Pn - (k - 1) * Pn_1) / k
        Pn_1, Pn = Pn, Pn_plus_1
    
    return n * (x * Pn - Pn_1) / (x**2 - 1)




def compute_weights(n, nodes):
    """
    Computes the Gauss-Legendre quadrature weights given the nodes.
    
    Parameters:
        n (int): Degree of the Legendre polynomial.
        nodes (list): List of nodes (roots of the Legendre polynomial).
    
    Returns:
        list: List of weights for each node.
    """
    weights = []
    for x in nodes:
        derivative = legendre_polynomial_derivative(n, x)
        weight = 2 / ((1 - x**2) * (derivative**2))
        weights.append(float(weight))
    return weights










import numpy as np
def gauss_legendre_quadrature(n):
    """
    Combines the creation of the companion matrix, computes nodes (roots),
    and calculates the weights for Gauss-Legendre quadrature.
    
    Parameters:
        n (int): Degree of the Legendre polynomial.
    
    Returns:
        tuple: A tuple containing a list of nodes and a list of weights.
    """
    companion_matrix = gauss_legendre_companion_matrix(n)
    nodes = np.linalg.eigvals(companion_matrix)
    weights = compute_weights(n, nodes)


    return nodes, weights





