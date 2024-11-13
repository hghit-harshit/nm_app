export const multiDimMatrixToLatex = (matrix: number[][]) => {
  const rows = matrix.map((row) => row.join(" & ")).join(" \\\\ ");
  return `\\begin{bmatrix} ${rows} \\end{bmatrix}`;
};

export const singleDimMatrixToLatex = (matrix: number[]) => {
  return `\\begin{bmatrix} ${matrix.join(" \\\\ ")} \\end{bmatrix}`;
};
