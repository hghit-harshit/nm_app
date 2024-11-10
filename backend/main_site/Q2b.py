import numpy as np
import equilibria
import matplotlib.pyplot as plt

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

# Main function
def main():
    flag = 1
    
        
    order = int(input("Enter the order of the Legendre polynomial (1 to 44): "))
    if order < 1 or order > 44:
        flag = 0
        #print("Please enter a number between 1 and 44.")
        
    

    coefficients = legendre_polynomial(order)

    companion_mat = companion_matrix(coefficients)

    eigenvalues = np.linalg.eigvals(companion_mat)
    weights = calculate_weights(eigenvalues)
    if flag == 1:
        print(f"\nCompanion Matrix for P_{order}(x):\n{companion_mat}\n")
    print(f"Nodes and Weights for Legendre Polynomial of Order {order}:\n")
    print(f"{'Node #':<10}{'Node Value':<20}{'Weight':<20}")
    print("-" * 50)
    for i, (node, weight) in enumerate(zip(eigenvalues, weights), start=1):
        print(f"{i:<10}{node:<20.6f}{weight:<20.6f}")

    print(f"\nSum of Weights: {np.sum(weights):.6f}")
    if flag == 1:
        plot_weights_vs_nodes(eigenvalues, weights)

def plot_weights_vs_nodes(nodes, weights):
    """Plots the weights against the  part of the nodes."""
    nodes = [node for node in nodes]
    plt.figure(figsize=(10, 6))
    plt.scatter(nodes, weights, color='blue', marker='o')
    plt.title('Weights vs Nodes using Companion Matrix and Lagrangian Interpolation')
    plt.xlabel('Roots (Nodes)')
    plt.ylabel('Weights')
    plt.axhline(0, color='black', linewidth=0.5, ls='--')
    plt.axvline(0, color='black', linewidth=0.5, ls='--')
    plt.grid()
    plt.show()

if __name__ == "__main__":
    main()
