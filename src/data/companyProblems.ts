export interface CompanyProblem {
  name: string;
  url: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed?: boolean;
}

export interface Company {
  id: string;
  title: string;
  icon: string;
  problems: CompanyProblem[];
  totalProblems: number;
  solvedProblems: number;
}

export const companies: Company[] = [
  {
    id: "adobe",
    title: "Adobe",
    icon: "🅰️",
    totalProblems: 59,
    solvedProblems: 0,
    problems: [
      { name: "Two Sum", url: "https://leetcode.com/problems/two-sum", difficulty: "Easy" },
      { name: "Reverse Integer", url: "https://leetcode.com/problems/reverse-integer", difficulty: "Easy" },
      { name: "Combine Two Tables", url: "https://leetcode.com/problems/combine-two-tables", difficulty: "Easy" },
      { name: "Merge Two Sorted Lists", url: "https://leetcode.com/problems/merge-two-sorted-lists", difficulty: "Easy" },
      { name: "Roman to Integer", url: "https://leetcode.com/problems/roman-to-integer", difficulty: "Easy" },
      { name: "Tenth Line", url: "https://leetcode.com/problems/tenth-line", difficulty: "Easy" },
      { name: "Maximum Subarray", url: "https://leetcode.com/problems/maximum-subarray", difficulty: "Easy" },
      { name: "Longest Common Prefix", url: "https://leetcode.com/problems/longest-common-prefix", difficulty: "Easy" },
      { name: "Palindrome Number", url: "https://leetcode.com/problems/palindrome-number", difficulty: "Easy" },
      { name: "Nim Game", url: "https://leetcode.com/problems/nim-game", difficulty: "Easy" },
      { name: "Reverse Linked List", url: "https://leetcode.com/problems/reverse-linked-list", difficulty: "Easy" },
      { name: "Jewels and Stones", url: "https://leetcode.com/problems/jewels-and-stones", difficulty: "Easy" },
      { name: "Reverse String", url: "https://leetcode.com/problems/reverse-string", difficulty: "Easy" },
      { name: "Valid Parentheses", url: "https://leetcode.com/problems/valid-parentheses", difficulty: "Easy" },
      { name: "Big Countries", url: "https://leetcode.com/problems/big-countries", difficulty: "Easy" },
      { name: "Array Partition I", url: "https://leetcode.com/problems/array-partition-i", difficulty: "Easy" },
      { name: "Merge Sorted Array", url: "https://leetcode.com/problems/merge-sorted-array", difficulty: "Easy" },
      { name: "Second Highest Salary", url: "https://leetcode.com/problems/second-highest-salary", difficulty: "Easy" },
      { name: "Remove Duplicates from Sorted Array", url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array", difficulty: "Easy" },
      { name: "Majority Element", url: "https://leetcode.com/problems/majority-element", difficulty: "Easy" },
      { name: "Add Two Numbers", url: "https://leetcode.com/problems/add-two-numbers", difficulty: "Medium" },
      { name: "Longest Substring Without Repeating Characters", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters", difficulty: "Medium" },
      { name: "Longest Palindromic Substring", url: "https://leetcode.com/problems/longest-palindromic-substring", difficulty: "Medium" },
      { name: "3Sum", url: "https://leetcode.com/problems/3sum", difficulty: "Medium" },
      { name: "ZigZag Conversion", url: "https://leetcode.com/problems/zigzag-conversion", difficulty: "Medium" },
      { name: "Word Frequency", url: "https://leetcode.com/problems/word-frequency", difficulty: "Medium" },
      { name: "Container With Most Water", url: "https://leetcode.com/problems/container-with-most-water", difficulty: "Medium" },
      { name: "LRU Cache", url: "https://leetcode.com/problems/lru-cache", difficulty: "Medium" },
      { name: "Generate Parentheses", url: "https://leetcode.com/problems/generate-parentheses", difficulty: "Medium" },
      { name: "4Sum", url: "https://leetcode.com/problems/4sum", difficulty: "Medium" },
      { name: "H-Index", url: "https://leetcode.com/problems/h-index", difficulty: "Medium" },
      { name: "Lexicographical Numbers", url: "https://leetcode.com/problems/lexicographical-numbers", difficulty: "Medium" },
      { name: "Integer to Roman", url: "https://leetcode.com/problems/integer-to-roman", difficulty: "Medium" },
      { name: "Nth Highest Salary", url: "https://leetcode.com/problems/nth-highest-salary", difficulty: "Medium" },
      { name: "String to Integer (atoi)", url: "https://leetcode.com/problems/string-to-integer-atoi", difficulty: "Medium" },
      { name: "Permutations", url: "https://leetcode.com/problems/permutations", difficulty: "Medium" },
      { name: "Bitwise AND of Numbers Range", url: "https://leetcode.com/problems/bitwise-and-of-numbers-range", difficulty: "Medium" },
      { name: "Spiral Matrix", url: "https://leetcode.com/problems/spiral-matrix", difficulty: "Medium" },
      { name: "Product of Array Except Self", url: "https://leetcode.com/problems/product-of-array-except-self", difficulty: "Medium" },
      { name: "Maximum Product Subarray", url: "https://leetcode.com/problems/maximum-product-subarray", difficulty: "Medium" },
      { name: "Median of Two Sorted Arrays", url: "https://leetcode.com/problems/median-of-two-sorted-arrays", difficulty: "Hard" },
      { name: "Cherry Pickup", url: "https://leetcode.com/problems/cherry-pickup", difficulty: "Hard" },
      { name: "Burst Balloons", url: "https://leetcode.com/problems/burst-balloons", difficulty: "Hard" },
      { name: "Merge k Sorted Lists", url: "https://leetcode.com/problems/merge-k-sorted-lists", difficulty: "Hard" },
      { name: "Trapping Rain Water", url: "https://leetcode.com/problems/trapping-rain-water", difficulty: "Hard" },
      { name: "Minimum Window Substring", url: "https://leetcode.com/problems/minimum-window-substring", difficulty: "Hard" },
      { name: "Regular Expression Matching", url: "https://leetcode.com/problems/regular-expression-matching", difficulty: "Hard" },
      { name: "Shortest Palindrome", url: "https://leetcode.com/problems/shortest-palindrome", difficulty: "Hard" },
      { name: "Count of Smaller Numbers After Self", url: "https://leetcode.com/problems/count-of-smaller-numbers-after-self", difficulty: "Hard" },
      { name: "Maximal Rectangle", url: "https://leetcode.com/problems/maximal-rectangle", difficulty: "Hard" },
      { name: "First Missing Positive", url: "https://leetcode.com/problems/first-missing-positive", difficulty: "Hard" },
      { name: "Wildcard Matching", url: "https://leetcode.com/problems/wildcard-matching", difficulty: "Hard" },
      { name: "Longest Valid Parentheses", url: "https://leetcode.com/problems/longest-valid-parentheses", difficulty: "Hard" },
      { name: "Strong Password Checker", url: "https://leetcode.com/problems/strong-password-checker", difficulty: "Hard" },
      { name: "Substring with Concatenation of All Words", url: "https://leetcode.com/problems/substring-with-concatenation-of-all-words", difficulty: "Hard" },
      { name: "Sudoku Solver", url: "https://leetcode.com/problems/sudoku-solver", difficulty: "Hard" },
      { name: "Rotate Image", url: "https://leetcode.com/problems/rotate-image", difficulty: "Hard" },
      { name: "Distinct Subsequences", url: "https://leetcode.com/problems/distinct-subsequences", difficulty: "Hard" },
      { name: "Subsets", url: "https://leetcode.com/problems/subsets", difficulty: "Hard" },
      { name: "Reverse Nodes in k-Group", url: "https://leetcode.com/problems/reverse-nodes-in-k-group", difficulty: "Hard" },
    ]
  }
];