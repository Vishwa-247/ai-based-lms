export interface DSAProblem {
  name: string;
  url: string;
  completed?: boolean;
}

export interface DSATopic {
  id: string;
  title: string;
  icon: string;
  problems: DSAProblem[];
  totalProblems: number;
  solvedProblems: number;
}

export const dsaTopics: DSATopic[] = [
  {
    id: "string-basics",
    title: "String Basics",
    icon: "⚡",
    totalProblems: 32,
    solvedProblems: 0,
    problems: [
      { name: "Reverse String", url: "https://leetcode.com/problems/reverse-string" },
      { name: "Valid Palindrome", url: "https://leetcode.com/problems/valid-palindrome" },
      { name: "Length of Last Word", url: "https://leetcode.com/problems/length-of-last-word/" },
      { name: "Find the Index of the First Occurrence in a String", url: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/" },
      { name: "Longest Substring Without Repeating Characters", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters" },
      { name: "String to Integer (atoi)", url: "https://leetcode.com/problems/string-to-integer-atoi" },
      { name: "Valid Parentheses", url: "https://leetcode.com/problems/valid-parentheses" },
      { name: "Reverse Words in a String", url: "https://leetcode.com/problems/reverse-words-in-a-string" },
      { name: "Reverse Vowels of a String", url: "https://leetcode.com/problems/reverse-vowels-of-a-string/" },
      { name: "Minimum Window Substring", url: "https://leetcode.com/problems/minimum-window-substring" },
      { name: "Longest Palindromic Substring", url: "https://leetcode.com/problems/longest-palindromic-substring" },
      { name: "Group Anagrams", url: "https://leetcode.com/problems/group-anagrams" },
      { name: "Permutation in String", url: "https://leetcode.com/problems/permutation-in-string" },
      { name: "Regular Expression Matching", url: "https://leetcode.com/problems/regular-expression-matching" },
      { name: "Word Break", url: "https://leetcode.com/problems/word-break" },
      { name: "Wildcard Matching", url: "https://leetcode.com/problems/wildcard-matching" },
      { name: "Longest Valid Parentheses", url: "https://leetcode.com/problems/longest-valid-parentheses" },
      { name: "Substring with Concatenation of All Words", url: "https://leetcode.com/problems/substring-with-concatenation-of-all-words" },
      { name: "Remove Duplicates from String", url: "https://leetcode.com/problems/remove-duplicates-from-string" },
      { name: "Minimum Number of Deletions to Make a String Palindrome", url: "https://leetcode.com/problems/minimum-deletion-to-make-string-palindrome/" },
      { name: "Compare Version Numbers", url: "https://leetcode.com/problems/compare-version-numbers/" },
      { name: "Roman to Integer", url: "https://leetcode.com/problems/roman-to-integer/" },
      { name: "Integer to Roman", url: "https://leetcode.com/problems/integer-to-roman/" },
      { name: "Valid Number", url: "https://leetcode.com/problems/valid-number/" },
      { name: "Encode and Decode Strings", url: "https://leetcode.com/problems/encode-and-decode-strings/" },
      { name: "Find the Closest Palindrome", url: "https://leetcode.com/problems/find-the-closest-palindrome/" },
      { name: "Text Justification", url: "https://leetcode.com/problems/text-justification/" },
      { name: "Word Ladder", url: "https://leetcode.com/problems/word-ladder/" }
    ]
  },
  {
    id: "array-basics",
    title: "Array Basics",
    icon: "📊",
    totalProblems: 12,
    solvedProblems: 0,
    problems: [
      { name: "Two Sum", url: "https://leetcode.com/problems/two-sum" },
      { name: "Squares of a Sorted Array", url: "https://leetcode.com/problems/squares-of-a-sorted-array/" },
      { name: "Best Time to Buy and Sell Stock", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock" },
      { name: "Contains Duplicate", url: "https://leetcode.com/problems/contains-duplicate" },
      { name: "Product of Array Except Self", url: "https://leetcode.com/problems/product-of-array-except-self" },
      { name: "Rotate Array", url: "https://leetcode.com/problems/rotate-array" },
      { name: "Maximum Subarray", url: "https://leetcode.com/problems/maximum-subarray" },
      { name: "Valid Sudoku", url: "https://leetcode.com/problems/valid-sudoku" },
      { name: "Merge Intervals", url: "https://leetcode.com/problems/merge-intervals" },
      { name: "3Sum", url: "https://leetcode.com/problems/3sum" },
      { name: "Move Zeroes", url: "https://leetcode.com/problems/move-zeroes" },
      { name: "Find All Numbers Disappeared in an Array", url: "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array" }
    ]
  },
  {
    id: "two-pointers",
    title: "Two Pointers Approach",
    icon: "👆",
    totalProblems: 6,
    solvedProblems: 0,
    problems: [
      { name: "Find the Closest Pair from Two Arrays", url: "https://www.geeksforgeeks.org/problems/find-the-closest-pair-from-two-arrays4215/1" },
      { name: "Find All Triplets with Zero Sum", url: "https://www.geeksforgeeks.org/problems/find-the-closest-pair-from-two-arrays4215/1" },
      { name: "Triplet Sum in Array", url: "https://www.geeksforgeeks.org/problems/triplet-sum-in-array-1587115621/1" },
      { name: "Triplet Family", url: "https://www.geeksforgeeks.org/problems/triplet-family/1" },
      { name: "4 Sum - Count quadruplets with given sum", url: "https://www.geeksforgeeks.org/problems/count-quadruplets-with-given-sum/1" },
      { name: "Trapping Rain Water", url: "https://www.geeksforgeeks.org/problems/trapping-rain-water-1587115621/1" }
    ]
  },
  {
    id: "sliding-window",
    title: "Sliding Window",
    icon: "🪟",
    totalProblems: 11,
    solvedProblems: 0,
    problems: [
      { name: "Indexes of Subarray Sum", url: "https://www.geeksforgeeks.org/problems/subarray-with-given-sum-1587115621/1" },
      { name: "K Sized Subarray Maximum", url: "https://www.geeksforgeeks.org/problems/maximum-of-all-subarrays-of-size-k3101/1" },
      { name: "Longest Subarray with Sum K", url: "https://www.geeksforgeeks.org/problems/longest-sub-array-with-sum-k0809/1" },
      { name: "Max Sum Subarray of size K", url: "https://www.geeksforgeeks.org/problems/max-sum-subarray-of-size-k5313/1" },
      { name: "Smallest window containing all characters of another string", url: "https://www.geeksforgeeks.org/problems/smallest-window-in-a-string-containing-all-the-characters-of-another-string-1587115621/1" },
      { name: "Length of the longest substring", url: "https://www.geeksforgeeks.org/problems/length-of-the-longest-substring3036/1" },
      { name: "First negative in every window of size k", url: "https://www.geeksforgeeks.org/problems/first-negative-integer-in-every-window-of-size-k3345/1" },
      { name: "Count distinct elements in every window", url: "https://www.geeksforgeeks.org/problems/count-distinct-elements-in-every-window/1" },
      { name: "Smallest distinct window", url: "https://www.geeksforgeeks.org/problems/smallest-distant-window3132/1" },
      { name: "Largest Sum Subarray of Size at least K", url: "https://www.geeksforgeeks.org/problems/largest-sum-subarray-of-size-at-least-k3121/1" },
      { name: "Check if Permutation is Substring", url: "https://www.geeksforgeeks.org/problems/check-if-permutation-is-substring/1" }
    ]
  },
  {
    id: "matrices",
    title: "Matrices",
    icon: "🔢",
    totalProblems: 9,
    solvedProblems: 0,
    problems: [
      { name: "Spiral Matrix", url: "https://leetcode.com/problems/spiral-matrix/" },
      { name: "Search a 2D Matrix", url: "https://leetcode.com/problems/search-a-2d-matrix/" },
      { name: "Median in a row-wise sorted Matrix", url: "https://practice.geeksforgeeks.org/problems/median-in-a-row-wise-sorted-matrix1527/1" },
      { name: "Row with max 1s", url: "https://practice.geeksforgeeks.org/problems/row-with-max-1s0023/1" },
      { name: "Sorted matrix", url: "https://www.geeksforgeeks.org/problems/sorted-matrix2333/1" },
      { name: "Find a specific pair in Matrix", url: "https://www.geeksforgeeks.org/find-a-specific-pair-in-matrix/" },
      { name: "Rotate an Image 90 Degree Clockwise", url: "https://www.geeksforgeeks.org/rotate-a-matrix-by-90-degree-in-clockwise-direction-without-using-any-extra-space/" },
      { name: "Kth element in Matrix", url: "https://www.geeksforgeeks.org/problems/kth-element-in-matrix/1" },
      { name: "Common elements in all rows of a given matrix", url: "https://www.geeksforgeeks.org/common-elements-in-all-rows-of-a-given-matrix/" }
    ]
  },
  {
    id: "bit-manipulation",
    title: "Bit Manipulation",
    icon: "🔢",
    totalProblems: 12,
    solvedProblems: 0,
    problems: [
      { name: "Count Set Bits in an Integer", url: "https://leetcode.com/problems/number-of-1-bits/" },
      { name: "Reverse Bits", url: "https://leetcode.com/problems/reverse-bits/" },
      { name: "Find the Two Non-Repeating Elements in an Array of Repeating Elements", url: "https://practice.geeksforgeeks.org/problems/finding-the-numbers0215/1" },
      { name: "Count Number of Bits to be Flipped to Convert A to B", url: "https://practice.geeksforgeeks.org/problems/bit-difference/0" },
      { name: "Program to Find Whether a Number is Power of Two", url: "https://leetcode.com/problems/power-of-two/" },
      { name: "Copy Set Bits in a Range", url: "https://www.geeksforgeeks.org/copy-set-bits-in-a-range/" },
      { name: "Single Number II", url: "https://leetcode.com/problems/single-number-iii/" },
      { name: "Hamming Distance", url: "https://leetcode.com/problems/total-hamming-distance/" },
      { name: "Bitwise ORs of Subarrays", url: "https://leetcode.com/problems/bitwise-ors-of-subarrays/" },
      { name: "Divide Integers", url: "https://leetcode.com/problems/divide-two-integers/" },
      { name: "Minimum Xor Value", url: "https://www.interviewbit.com/problems/min-xor-value/" },
      { name: "Max Xor In a Range [L,R]", url: "https://www.geeksforgeeks.org/maximum-xor-value-of-a-pair-from-a-range/" }
    ]
  }
];