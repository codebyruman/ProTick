import { Question, StudentProfile } from '../types/exam';

export const initialStudentProfile: StudentProfile = {
  name: 'Aarav Sharma',
  usn: '1RV21CS089',
  dob: '2003-05-14',
  department: 'Dept. of Computer Science',
  semester: 'Sem VI',
  courseCode: 'CS602',
  courseName: 'Advanced Algorithms & Data Structures',
  qpCode: 'CS602-VER-C4',
  slot: 'Slot 1',
  terminalId: 'LAB-B4-WS19',
  terminalIp: '192.168.4.119',
  labName: 'WS-19 • Hall B (Computer Center 2)',
  proctorName: 'Prof. K. Venkatesh',
  proctorId: 'INV-8820',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
};

export const examQuestions: Question[] = [
  {
    id: 1,
    questionNumber: 1,
    text: "Which asymptotic notation represents the tight bound of an algorithm's growth rate?",
    options: [
      { key: 'A', text: 'Big-O (O)' },
      { key: 'B', text: 'Big-Theta (Θ)' },
      { key: 'C', text: 'Big-Omega (Ω)' },
      { key: 'D', text: 'Little-o (o)' }
    ],
    correctAnswer: 'B',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 2,
    questionNumber: 2,
    text: "What is the worst-case time complexity of QuickSort when using deterministic pivot selection on a sorted array?",
    options: [
      { key: 'A', text: 'O(n log n)' },
      { key: 'B', text: 'O(n)' },
      { key: 'C', text: 'O(n²)' },
      { key: 'D', text: 'O(log n)' }
    ],
    correctAnswer: 'C',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 3,
    questionNumber: 3,
    text: "Which algorithmic paradigm is employed in the solution to the Fractional Knapsack problem?",
    options: [
      { key: 'A', text: 'Greedy Method' },
      { key: 'B', text: 'Dynamic Programming' },
      { key: 'C', text: 'Divide and Conquer' },
      { key: 'D', text: 'Backtracking' }
    ],
    correctAnswer: 'A',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 4,
    questionNumber: 4,
    text: "In Dijkstra's algorithm implemented with a Min-Heap/Fibonacci heap, what is the optimal running time?",
    options: [
      { key: 'A', text: 'O(V²)' },
      { key: 'B', text: 'O(E + V log V)' },
      { key: 'C', text: 'O(V • E)' },
      { key: 'D', text: 'O(E log E)' }
    ],
    correctAnswer: 'B',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 5,
    questionNumber: 5,
    text: "Which graph representation is most space-efficient for sparse graphs where E << V²?",
    options: [
      { key: 'A', text: 'Adjacency Matrix' },
      { key: 'B', text: 'Incidence Matrix' },
      { key: 'C', text: 'Adjacency List' },
      { key: 'D', text: 'Laplacian Matrix' }
    ],
    correctAnswer: 'C',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 6,
    questionNumber: 6,
    text: "What is the maximum height of a Red-Black tree containing n internal keys?",
    options: [
      { key: 'A', text: 'log₂(n + 1)' },
      { key: 'B', text: '2 • log₂(n + 1)' },
      { key: 'C', text: '1.44 • log₂(n)' },
      { key: 'D', text: 'n / 2' }
    ],
    correctAnswer: 'B',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 7,
    questionNumber: 7,
    text: "In Bellman-Ford shortest path algorithm, how many relaxation passes over all edges are required?",
    options: [
      { key: 'A', text: 'V' },
      { key: 'B', text: 'V - 1' },
      { key: 'C', text: 'E - 1' },
      { key: 'D', text: 'log V' }
    ],
    correctAnswer: 'B',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 8,
    questionNumber: 8,
    text: "What is the primary condition required for a graph to permit a valid Topological Sort?",
    options: [
      { key: 'A', text: 'Connected and Undirected' },
      { key: 'B', text: 'Directed Acyclic Graph (DAG)' },
      { key: 'C', text: 'Strongly Connected' },
      { key: 'D', text: 'Bipartite' }
    ],
    correctAnswer: 'B',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 9,
    questionNumber: 9,
    text: "Which data structure is primarily utilized to detect cycles in Kruskal's Minimum Spanning Tree algorithm?",
    options: [
      { key: 'A', text: 'Priority Queue' },
      { key: 'B', text: 'Disjoint-Set Union (Union-Find)' },
      { key: 'C', text: 'Stack' },
      { key: 'D', text: 'Binary Search Tree' }
    ],
    correctAnswer: 'B',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 10,
    questionNumber: 10,
    text: "What is the recurrence relation for the Strassen matrix multiplication algorithm?",
    options: [
      { key: 'A', text: 'T(n) = 8T(n/2) + O(n²)' },
      { key: 'B', text: 'T(n) = 7T(n/2) + O(n²)' },
      { key: 'C', text: 'T(n) = 4T(n/2) + O(n)' },
      { key: 'D', text: 'T(n) = 2T(n/2) + O(n log n)' }
    ],
    correctAnswer: 'B',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 11,
    questionNumber: 11,
    text: "Which theorem is applied to solve recurrence relations of the form T(n) = aT(n/b) + f(n)?",
    options: [
      { key: 'A', text: 'Akra-Bazzi Theorem' },
      { key: 'B', text: 'Master Theorem' },
      { key: 'C', text: 'Cook-Levin Theorem' },
      { key: 'D', text: 'Euler-Fermat Theorem' }
    ],
    correctAnswer: 'B',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 12,
    questionNumber: 12,
    text: "In the 0/1 Knapsack dynamic programming formulation with n items and capacity W, what is the space complexity?",
    options: [
      { key: 'A', text: 'O(n)' },
      { key: 'B', text: 'O(W)' },
      { key: 'C', text: 'O(n • W)' },
      { key: 'D', text: 'O(2^n)' }
    ],
    correctAnswer: 'C',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 13,
    questionNumber: 13,
    text: "What is the amortized cost per operation in a splay tree of size n?",
    options: [
      { key: 'A', text: 'O(1)' },
      { key: 'B', text: 'O(log n)' },
      { key: 'C', text: 'O(√n)' },
      { key: 'D', text: 'O(n)' }
    ],
    correctAnswer: 'B',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 14,
    questionNumber: 14,
    text: "What is the time complexity of the Floyd-Warshall algorithm for finding all-pairs shortest paths in a directed weighted graph with V vertices?",
    contextHeader: "Dynamic Programming Formulation Context",
    contextFormula: "d^(k)[i][j] = min(d^(k-1)[i][j], d^(k-1)[i][k] + d^(k-1)[k][j])",
    contextFormulaNote: "k ∈ {1..V}",
    options: [
      { key: 'A', text: 'O(V²)' },
      { key: 'B', text: 'O(V³)' },
      { key: 'C', text: 'O(V • E • log V)' },
      { key: 'D', text: 'O(E²)' }
    ],
    correctAnswer: 'B',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 15,
    questionNumber: 15,
    text: "In Tarjan's strongly connected components algorithm, which vertex attribute marks the earliest visited vertex reachable from the subtree?",
    options: [
      { key: 'A', text: 'disc[u]' },
      { key: 'B', text: 'low[u]' },
      { key: 'C', text: 'color[u]' },
      { key: 'D', text: 'rank[u]' }
    ],
    correctAnswer: 'B',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 16,
    questionNumber: 16,
    text: "What is the maximum network flow achievable equivalent to, according to the Max-Flow Min-Cut theorem?",
    options: [
      { key: 'A', text: 'Sum of all augmenting paths' },
      { key: 'B', text: 'Capacity of the minimum cut separating source and sink' },
      { key: 'C', text: 'Product of edge capacities' },
      { key: 'D', text: 'Total in-degree of the sink' }
    ],
    correctAnswer: 'B',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 17,
    questionNumber: 17,
    text: "Which string matching algorithm precomputes a Longest Proper Prefix which is also a Suffix (LPS) array?",
    options: [
      { key: 'A', text: 'Rabin-Karp Algorithm' },
      { key: 'B', text: 'Knuth-Morris-Pratt (KMP) Algorithm' },
      { key: 'C', text: 'Boyer-Moore Algorithm' },
      { key: 'D', text: 'Aho-Corasick Algorithm' }
    ],
    correctAnswer: 'B',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 18,
    questionNumber: 18,
    text: "What is the optimal substructure property in Matrix Chain Multiplication?",
    options: [
      { key: 'A', text: 'm[i,j] = min_{i≤k<j} { m[i,k] + m[k+1,j] + p_{i-1}p_k p_j }' },
      { key: 'B', text: 'm[i,j] = m[i-1,j-1] + p_i p_j' },
      { key: 'C', text: 'm[i,j] = max_{i≤k<j} { m[i,k] * m[k+1,j] }' },
      { key: 'D', text: 'm[i,j] = m[i+1,j-1] + (p_i + p_j)' }
    ],
    correctAnswer: 'A',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 19,
    questionNumber: 19,
    text: "Which complexity class contains problems solvable in polynomial time by a deterministic Turing machine?",
    options: [
      { key: 'A', text: 'NP' },
      { key: 'B', text: 'P' },
      { key: 'C', text: 'NP-Complete' },
      { key: 'D', text: 'PSPACE' }
    ],
    correctAnswer: 'B',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 20,
    questionNumber: 20,
    text: "What is the primary condition for a problem to be classified as NP-Complete?",
    options: [
      { key: 'A', text: 'Must belong to NP and every problem in NP must be polynomial-time reducible to it' },
      { key: 'B', text: 'Must be solvable in O(n!) time only' },
      { key: 'C', text: 'Must be undecidable like the Halting Problem' },
      { key: 'D', text: 'Must have exponential verifier time' }
    ],
    correctAnswer: 'A',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 21,
    questionNumber: 21,
    text: "In Huffman Coding, what type of prefix code is constructed for lossless data compression?",
    options: [
      { key: 'A', text: 'Fixed-length optimal code' },
      { key: 'B', text: 'Variable-length optimal prefix-free binary code' },
      { key: 'C', text: 'Run-length encoded code' },
      { key: 'D', text: 'Arithmetic universal code' }
    ],
    correctAnswer: 'B',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 22,
    questionNumber: 22,
    text: "Which algorithm finds the Convex Hull of a set of 2D points in O(n log n) time using a radial polar angle sweep?",
    options: [
      { key: 'A', text: 'Jarvis March (Gift Wrapping)' },
      { key: 'B', text: 'Graham Scan' },
      { key: 'C', text: 'Quickhull' },
      { key: 'D', text: "Chan's Algorithm" }
    ],
    correctAnswer: 'B',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 23,
    questionNumber: 23,
    text: "In randomized QuickSelect, what is the expected time complexity to locate the k-th smallest element?",
    options: [
      { key: 'A', text: 'O(log n)' },
      { key: 'B', text: 'O(n)' },
      { key: 'C', text: 'O(n log n)' },
      { key: 'D', text: 'O(n²)' }
    ],
    correctAnswer: 'B',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 24,
    questionNumber: 24,
    text: "What property distinguishes an AVL Tree from an arbitrary Binary Search Tree?",
    options: [
      { key: 'A', text: 'Every leaf is black' },
      { key: 'B', text: 'Height difference between left and right subtrees is at most 1 for every node' },
      { key: 'C', text: 'All leaves are at the exact same depth' },
      { key: 'D', text: 'Nodes have at most 3 children' }
    ],
    correctAnswer: 'B',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 25,
    questionNumber: 25,
    text: "In B-Trees of order m, what is the minimum number of keys that every non-root internal node must contain?",
    options: [
      { key: 'A', text: '⌈m/2⌉ - 1' },
      { key: 'B', text: 'm - 1' },
      { key: 'C', text: '⌈m/2⌉' },
      { key: 'D', text: 'm / 2' }
    ],
    correctAnswer: 'A',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 26,
    questionNumber: 26,
    text: "What is the time complexity of building a binary Max-Heap from an unsorted array of n elements?",
    options: [
      { key: 'A', text: 'O(n log n)' },
      { key: 'B', text: 'O(n)' },
      { key: 'C', text: 'O(n²)' },
      { key: 'D', text: 'O(log n)' }
    ],
    correctAnswer: 'B',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 27,
    questionNumber: 27,
    text: "Which algorithm finds the longest path in a Directed Acyclic Graph (DAG) in linear O(V + E) time?",
    options: [
      { key: 'A', text: "Dijkstra's with negated weights" },
      { key: 'B', text: 'Topological sort followed by single-source edge relaxation' },
      { key: 'C', text: 'Floyd-Warshall' },
      { key: 'D', text: 'Ford-Fulkerson' }
    ],
    correctAnswer: 'B',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 28,
    questionNumber: 28,
    text: "What is the worst-case lookup time in a Cuckoo Hashing table with two independent hash functions?",
    options: [
      { key: 'A', text: 'O(1)' },
      { key: 'B', text: 'O(log n)' },
      { key: 'C', text: 'O(n)' },
      { key: 'D', text: 'O(α) where α is load factor' }
    ],
    correctAnswer: 'A',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 29,
    questionNumber: 29,
    text: "In the Ford-Fulkerson method using the Edmonds-Karp implementation (BFS for shortest augmenting path), what is the time complexity?",
    options: [
      { key: 'A', text: 'O(V • E²)' },
      { key: 'B', text: 'O(V² • E)' },
      { key: 'C', text: 'O(E • f_max)' },
      { key: 'D', text: 'O(V³)' }
    ],
    correctAnswer: 'A',
    marksPositive: 2.0,
    marksNegative: 0.5
  },
  {
    id: 30,
    questionNumber: 30,
    text: "Which randomized data structure offers O(log n) average time for search, insertion, and deletion using probabilistic layered linked lists?",
    options: [
      { key: 'A', text: 'Treap' },
      { key: 'B', text: 'Skip List' },
      { key: 'C', text: 'Bloom Filter' },
      { key: 'D', text: 'Fenwick Tree (BIT)' }
    ],
    correctAnswer: 'B',
    marksPositive: 2.0,
    marksNegative: 0.5
  }
];

// Pre-filled state representing the realistic snapshot from the Stitch design (22 Answered, 3 Review, 5 Unanswered)
export const initialAnswers: Record<number, 'A' | 'B' | 'C' | 'D'> = {
  1: 'B',
  2: 'C',
  3: 'A',
  4: 'B',
  6: 'B',
  7: 'B',
  9: 'B',
  10: 'B',
  11: 'B',
  12: 'C',
  13: 'B',
  14: 'B', // Active in View 3
  15: 'B', // Review
  18: 'A', // Review
  21: 'B',
  22: 'B', // Review
  23: 'B',
  24: 'B',
  25: 'A',
  26: 'B',
  27: 'B',
  29: 'A'
};

export const initialFlags: Record<number, boolean> = {
  3: true,
  8: true,
  15: true,
  18: true,
  22: true,
  27: true
};

