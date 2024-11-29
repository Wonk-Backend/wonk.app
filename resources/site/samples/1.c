#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// Define constants for Mandelbrot
#define WIDTH 80
#define HEIGHT 40
#define MAX_ITER 1000

// Function prototypes
void generate_mandelbrot(double x_center, double y_center, double scale, int max_iter);
void display_parameters(double x_center, double y_center, double scale, int max_iter);

int main() {
    double x_center = -0.5, y_center = 0.0;  // Initial center coordinates
    double scale = 4.0;                     // Initial scale (zoom level)
    int max_iter = MAX_ITER;                // Maximum iterations for detail

    char input;

    while (1) {
        // Clear the terminal
        system("clear");

        // Display the Mandelbrot set
        generate_mandelbrot(x_center, y_center, scale, max_iter);

        // Display the parameters
        display_parameters(x_center, y_center, scale, max_iter);

        // Get user input for zooming and navigation
        printf("\nCommands: \n");
        printf("[WASD] Move | [+/-] Zoom In/Out | [Q] Quit\n");
        printf("Enter command: ");
        input = getchar();
        getchar();  // Consume the newline character

        // Adjust parameters based on input
        switch (input) {
        case 'w': y_center -= scale * 0.1; break;  // Move up
        case 's': y_center += scale * 0.1; break;  // Move down
        case 'a': x_center -= scale * 0.1; break;  // Move left
        case 'd': x_center += scale * 0.1; break;  // Move right
        case '+': scale /= 2; break;              // Zoom in
        case '-': scale *= 2; break;              // Zoom out
        case 'q': return 0;                       // Quit
        default: break;                           // Ignore invalid input
        }
    }

    return 0;
}

// Generate the Mandelbrot set
void generate_mandelbrot(double x_center, double y_center, double scale, int max_iter) {
    for (int y = 0; y < HEIGHT; y++) {
        for (int x = 0; x < WIDTH; x++) {
            double c_re = x_center + (x - WIDTH / 2) * scale / WIDTH;
            double c_im = y_center + (y - HEIGHT / 2) * scale / HEIGHT;
            double z_re = 0, z_im = 0;
            int iter = 0;

            while (z_re * z_re + z_im * z_im < 4.0 && iter < max_iter) {
                double z_re_temp = z_re * z_re - z_im * z_im + c_re;
                z_im = 2 * z_re * z_im + c_im;
                z_re = z_re_temp;
                iter++;
            }

            // Print a character based on the number of iterations
            if (iter == max_iter)
                putchar('#');  // In set
            else if (iter > max_iter / 2)
                putchar('*');  // Close to the set
            else
                putchar(' ');  // Far from the set
        }
        putchar('\n');
    }
}

// Display parameters in the corner of the output
void display_parameters(double x_center, double y_center, double scale, int max_iter) {
    printf("\n");
    printf("Mandelbrot Parameters:\n");
    printf("Center: (%.6f, %.6f)\n", x_center, y_center);
    printf("Zoom Level: %.6f\n", 4.0 / scale);  // Higher value means closer zoom
    printf("Max Iterations: %d\n", max_iter);
}
