from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import main_siteSerializer
from .models import main_site
from django.http import JsonResponse
from django.middleware.csrf import get_token
import json
#from .Q3a import plot_results
from .equilibria import *
import logging
from django.views.decorators.csrf import csrf_exempt
import base64
import io
from .Q2a import *
from .Q2b import *
from .Q3a import *
from .Q3b import *


# Create your views here.

class main_siteView(viewsets.ModelViewSet):
    serializer_class = main_siteSerializer
    queryset = main_site.objects.all()
    
def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})

@csrf_exempt
def assignment1_view(request):
    if request.method == 'POST':
        # Handle CSV file upload
        uploaded_file = request.FILES.get('file')
        if not uploaded_file:
            return JsonResponse({"error": "No file uploaded"}, status=400)
        
        # Save file temporarily or read directly
        file_content = uploaded_file.read().decode('utf-8')

        # Process CSV data
        A, b1, b2 = read_matrix_and_vectors(file_content)  # Adjust this function to work with file content
        
        # 1. LU Decomposition
        P_matrix, L, U = lu(A)
        
        # 2. Eigenvalue Calculation using QR method
        eigenvalues_A, iter = eigenvalues_via_qr(A)
        
        # 3. Determinant and Uniqueness
        det_A = np.prod(eigenvalues_A)
        
        # 4. Condition Number of A and Hilbert Comparison
        cond_A = np.max(eigenvalues_A) / np.min(eigenvalues_A)
        hilbert_5 = hilbert(5)
        cond_hilbert = cond(hilbert_5)
        
        # 5. Solve Ax = b for two b vectors
        if abs(det_A) > 10e-5:
            unique = 1
            x1 = solve(A, b1)
            x2 = solve(A, b2)
        else:
            unique = 0
            x1, x2 = None, None
        
        largest_eigenval_A = power_method(A)
        largest_eigenval_A_inv = power_method(inv(A))
        # Prepare results to send back
        results = {
            "matrix": A.tolist(),
            "b1": b1.tolist(),
            "b2": b2.tolist(),
            "eigenvalues_A": eigenvalues_A.tolist(),
            "iterations": iter,
            "determinant": det_A,
            "is_unique" : unique,
            "largest_eigenval_A" : largest_eigenval_A,
            "largest_eigenval_A_inv" : largest_eigenval_A_inv,
            "condition_number": cond_A,
            "condition_number_hilbert": cond_hilbert,
            "solution_x1": x1.tolist() if x1 is not None else [],
            "solution_x2": x2.tolist() if x2 is not None else [],
        }

        return JsonResponse(results)

    return JsonResponse({"error": "Invalid request method."}, status=405)

def generate_plot(nodes, weights, method=1):
    plt.figure(figsize=(8, 6))
    plt.scatter(nodes, weights, color='blue', marker='o')
    plt.title(f'Weights vs Nodes {method}')
    plt.xlabel('Nodes')
    plt.ylabel('Weights')
    plt.grid(True)
    img_io = io.BytesIO()
    plt.savefig(img_io, format='png')
    img_io.seek(0)
    img_b64 = base64.b64encode(img_io.getvalue()).decode('utf-8')
    plt.close()
    return img_b64

# View for calculating and returning results
@csrf_exempt
def assignment2_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            n = int(data.get('n'))
        except ValueError:
            return JsonResponse({"error": "Invalid input for 'n'. Please provide a number."}, status=400)

        # Method 1: Using Gauss-Legendre quadrature (companion matrix, roots, and weights)
        nodes_method1, weights_method1 = gauss_legendre_quadrature(n)

        # Plot for Method 1
        plot_url_method1 = generate_plot(nodes_method1, weights_method1, method='for Gauss-Legendre Quadrature')

        # Method 2: Using another method for weights calculation (as described above)
        coeffiecient = legendre_polynomial(n)
        companion_mat = companion_matrix(coeffiecient)
        nodes_method2 = np.linalg.eigvals(companion_mat)
        weights_method2 = calculate_weights(nodes_method2)  # Method 2 placeholder (you can modify as needed)
        plot_url_method2 = generate_plot(nodes_method2, weights_method2,method = 'using Companion Matrix and Lagrangian Interpolation')

        # Return results as JSON
        return JsonResponse({
            'method1': {
                'nodes': nodes_method1.tolist(),
                'weights': weights_method1,
                'plot_url': plot_url_method1
            },
            'method2': {
                'nodes': nodes_method1.tolist(),
                'weights': weights_method2.tolist(),
                'plot_url': plot_url_method2,
                'comp_mat' : companion_mat.tolist()
            },
        })
    return JsonResponse({"error": "Invalid request method."}, status=405)


def plot_method_graphs(P, y0, y_end, step_size):
    # Solve the BVP using finite differences
    y_values_bvp, u_values_bvp = solve_bvp(P,0,1,y0,y_end,step_size)

    # Solve using Explicit Euler
    v0 = shooting_method(P,y0,y_end,step_size)
    y_values_explicit, u_values_explicit = explicit_euler(y0, v0, step_size, y_end, P)

    # Solve using Implicit Euler
    y_values_implicit, u_values_implicit = implicit_euler(y0, v0, step_size, y_end, P)

    # Analytical Solution: For simplicity, assume it's a linear function u(y) = P*y
    y_values_analytical = np.linspace(0, 1, 100)
    u_values_analytical =  [u_y(y, P) for y in y_values_analytical]  # Assuming u(y) = P*y as an example

    # Create plots for each method and save as images
    def plot_and_save(y_vals, u_vals, method_name):
        plt.figure(figsize=(10, 6))
        plt.plot(y_vals, u_vals, label=method_name, linestyle='-', color='blue')
        plt.xlabel('y')
        plt.ylabel('u(y)')
        plt.title(f'{method_name} Solution for P = {P}')
        plt.grid()
        plt.legend()

        buf = io.BytesIO()
        plt.savefig(buf, format='png')
        buf.seek(0)
        img_str = base64.b64encode(buf.read()).decode('utf-8')
        buf.close()
        return img_str

    plt.figure(figsize=(10, 6))
    plt.plot(y_values_bvp, u_values_bvp, label="Finilte Difference", linestyle='-', color='blue')
    plt.plot(y_values_explicit, u_values_explicit, label="Explicit Euler", linestyle='--', color='orange')
    plt.plot(y_values_implicit, u_values_implicit, label="Implicit Euler", linestyle=':', color='green')
    plt.plot(y_values_analytical, u_values_analytical, label="Analytical", linestyle='-.', color='red')
    plt.xlabel('y')
    plt.ylabel('u(y)')
    plt.title(f'All graphs for P = {P}')
    plt.grid()
    plt.legend()

    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    img_all = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()
    
    # Plot for Explicit Euler
    explicit_image = plot_and_save(y_values_explicit, u_values_explicit, "Explicit Euler")
    
    # Plot for Implicit Euler
    implicit_image = plot_and_save(y_values_implicit, u_values_implicit, "Implicit Euler")
    
    # Plot for Finite Difference (BVP)
    finite_difference_image = plot_and_save(y_values_bvp, u_values_bvp, "Finite Difference")
    
    # Plot for Analytical Solution
    analytical_image = plot_and_save(y_values_analytical, u_values_analytical, "Analytical Solution")

    return explicit_image, implicit_image, finite_difference_image, analytical_image,img_all

# View to handle the frontend display
@csrf_exempt
def assignment3_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        P = float(data.get('P'))
        y0 = float(data.get('u0'))
        y_end = float(data.get('uEnd')) 
        #step_size = float(data.get('step_size'))
        #n = int(request.POST.get('n'))
        step_size = 0.001
        # Get the plots as base64 strings
        explicit_img, implicit_img, finite_diff_img, analytical_img,img_all = plot_method_graphs(P, y0, y_end, step_size)

        # Return the results as JSON response
        return JsonResponse({
            'explicit': explicit_img,
            'implicit': implicit_img,
            'finite_difference': finite_diff_img,
            'analytical': analytical_img,
            'all_graphs' : img_all
        })

    # For GET request, simply render the HTML page
    return render(request, 'assignment3.html')
'''
@csrf_exempt
def calculate_gauss_legendre(request):
    if request.method == 'POST':
        # Get the degree (n) from the request
        try:
            data = json.loads(request.body)
            n = int(data.get("n"))
        except ValueError:
            return JsonResponse({"error": "Invalid input."}, status=400)

        # Calculate roots and weights for both methods
        method1_roots, method1_weights = gauss_legendre_quadrature(n)
        method2_roots, method2_weights = calculate_method2(n)

        # Generate companion matrix for the second method
        companion_matrix = gauss_legendre_companion_matrix(n)

        # Generate the plot image for both methods
        plot_image = generate_plot(method1_roots, method1_weights, method2_roots, method2_weights)

        # Return the results along with the plot
        return JsonResponse({
            "roots_and_weights_method1": {"roots": method1_roots.tolist(), "weights": method1_weights.tolist()},
            "roots_and_weights_method2": {"roots": method2_roots.tolist(), "weights": method2_weights.tolist()},
            "companion_matrix": companion_matrix.tolist(),
            "plot_image": plot_image,
            "paper_link": "https://linktothepaper.com"  # Paper link for first method
        })

    return JsonResponse({"error": "Invalid request method."}, status=405)


def generate_plot(roots1, weights1, roots2, weights2):
    """Generate the plot and return it as a base64-encoded string"""
    fig, ax = plt.subplots(figsize=(8, 6))

    ax.scatter(roots1, weights1, color='green', label='Method 1', alpha=0.7)
    ax.scatter(roots2, weights2, color='white', label='Method 2', alpha=0.7)
    ax.set_title("Weights vs Roots for Gauss-Legendre Quadrature", fontsize=14)
    ax.set_xlabel("Roots", fontsize=12)
    ax.set_ylabel("Weights", fontsize=12)
    ax.legend(loc='best')

    # Save plot to a BytesIO object and encode it in base64
    buf = BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    img_str = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()

    return img_str

'''