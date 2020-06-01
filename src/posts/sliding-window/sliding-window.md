---
title: "The Sliding Window Technique"
date: "2020-05-31"
---

## Topics Covered

1. Fixed Window
2. Dynamic Window
3. Dynamic Window with a Hashmap  

Solving leetcode/hackerrank problems quickly and efficiently in order to prepare for a technical interview can seem like a daunting task. What a relief to find out many of these problems can be solved relatively easily by applying certain algorithms or techniques. Enter the sliding window, a pattern or technique to efficiently solve coding problems related to finding max/min substrings or other problems solved with the help of visualizing a sliding window across an array.

Although it may not always be straightforward to recognize, a solution normally has the following conditions/keywords in the question:


- longest substring/subsequence/subarray
- shortest substring/subsequence/subarray
- max/min substring/subsequence/subarray

If a question includes these keywords or can be rephrased to include them, then there’s a very good chance the sliding window approach is in order.  

Complexity: typically O(n) time and O(1) space  

There are three variations to be aware of and it’s up to you to figure out which one to choose, although there should be enough clues to make it clear.
In all cases though, envision a window “sliding” through a sequence of elements while recording data in each step of the movement. When the window has reached the end of the sequence, the slide halts and the appropriate data is displayed. NOTE: sometimes reaching the end may mean the end of the window must reach the end of the sequence, and sometimes the start must as well.

// pseudocode-ish example
windowStartIndex, windowEndIndex, runningTotal = 0  
returnValue //often will be the min or max of some data.

Handle base cases <br/> 
“Slide” the window until the end of the window reaches the end of the sequence (loop)
Update runningTotal – normally based on arithmetic on the element at windowEndIndex
Conditionally adjust returnValue after comparing runningTotal to returnValue
//this is often condensed as a max or min call
Slide the window by incrementing the end
Conditionally increment start index based on problem requirement
//this should also include discarding the old value at windowStartIndex from runningTotal
Return returnValue

This solution uses more variables than necessary as the window movement can be calculated simply by using the ‘i’ variable in a for loop; however, for clarity and flexibility, I prefer a while loop while managing variables for the window start and end index.
The above solution structure can broken down into two main chunks:

Chunk 1: Calculate the return value
Chunk 2: Move the window

Although the pseudocode may seem simple, extra care should be taken when moving the window as all variables have to be accounted for, while also adhering to the conditions set out in the problem.

####Case 1: FIXED WINDOW LENGTH

Given an array of positive numbers and a positive number ‘k’, find the maximum sum of any contiguous subarray of size ‘k’.

```javascript
function largestSum(k) {
    // initialize variables
    windowStartIndx = 0
    windowEndIndx = 0
    maxValue = Number.MIN_VALUE
    currValue = 0

    while (windowEndIndx < arr.length ) {
        currValue += arr[windowEndIndx]
        maxValue = Math.max(currValue, maxValue)

        if (windowEndIndx – windowStartIndx + 1 < k) {
        windowEndIndx++
        }
        else {
        currValue -= arr[windowStartIndx]
        windowStartIndx++
        windowEndIndx++
        }
    }
    return maxValue
}
```

Hopefully a little brevity doesn’t cause any lack of clarity:

```javascript
if (windowEndIndx – windowStartIndx + 1 < k) {
windowEndIndx++
}
else {
currValue -= arr[windowStartIndx]
windowStartIndx++
windowEndIndx++
}

Refactors into ….
if !(windowEndIndx – windowStartIndx + 1 < k) {
currValue -= arr[windowStartIndx]
windowStartIndx++
}
windowEndIndx++

```

####Case 2: VARIABLE WINDOW LENGTH
It is sometimes the case that we are asked not to look for an optimal sum or measurement based on the elements within the window, but rather the window itself, namely it’s size as it meets certain conditions based on the elements within. These set of problems require the window size to be dynamic: the window start/end indices won’t always move in unison. The result will be a dynamically shrinking/growing window.  
The main change to our code occurs in “chunk 2” where the window “moves”. Here is the revised pseudo-ish code:

windowStartIndex, windowEndIndex = 0  
bestWindowSize = ? //set to really high number to find min window size and low num for max size
currWindowValue = 0 //based on question, this could be the sum of the window’s elements’ values or some other metric  
currWindowSize() //helper function for clarity that simply computes current window size
Handle base cases
“Slide” the window until the end of the window reaches the end of the sequence (loop)
Update currWindowValue based on windowEndIndex value
While the currentWindowValue meets some predefined criteria:
Conditionally update bestWindowSize by comparing currWindowSize
//moving up the start index is a two step process:
Subtract value at windowStartIndx from currWindowValue since it’s moving ahead
Increment start index //window size is now smaller
Increment windowEndIndx

Return bestWindowSize

The biggest difference between the two variations is that implementing a dynamically sized window involves a second loop to move ahead the start index. Moving the start / end indices both constitute progression and because each element is iterated over no more than two times, the complexity remains O(n).
This variation is applied to problems that reference the smallest/largest subset of a sequence/substring, or, as already stated, problems that relate to the size of the window. Here is an example:

//find the smallest subarray with sum of values >= k

```javascript
function smallestSubarray(k, arr) {
  let windowStartIndex = 0
  let windowEndIndex = 0
  let bestWindowSize = Number.MAX_VALUE
  let currWindowValue = 0
  let matchFound = false //handle the case of no matches
  function currWindowSize() {
    return windowEndIndex - windowStartIndex + 1
  }
  if (arr.length === 0) return 0
  while (windowEndIndex < arr.length) {
    currWindowValue += arr[windowEndIndex]
    while (currWindowValue >= k) {
      matchFound = true
      bestWindowSize = Math.min(bestWindowSize, currWindowSize())
      currWindowValue -= arr[windowStartIndex]
      windowStartIndex++
    }
    windowEndIndex++
  }
  return matchFound ? bestWindowSize : null
}
```

Lastly, let’s look at the case where we are asked to adhere to an extra condition, usually one that requires us to keep track of the number of occurrences of each element.
Problem: find the longest substring with k distinct characters
Questions that require us to keep track of the number of occurrences of a character almost always warrant an extra data structure, normally a hashmap, be added to our typical solution.
Let str be the string to traverse:

Initialize variables representing indices and max size to zero
charOccurences = {} //the extra data structure needed to track occurrences //JS version of hashmap
“Slide” the window until the end of the window reaches the end of the sequence (loop)
Record the element, e, at windowEndIndex in str
If e is not in charOccurences, set it as a key with the value of 0
Increment the value associated with e in charOccurences
While the window has more than k distinct chars…
“Remove” the element at windowStartIndex
//done by decrementing the value associated with it in charOccurences
If the hashmap value of the element at windowStartIndex is now zero, remove it from charOccurences
Increment the windowStartIndex
Set maxLength to the highest number between currWindowSize and previous maxLength
Increment windowEndIndx
Return maxLength

The main difference between this solution compared to the others is obviously the use of the the hashmap. It’s particularly useful in this case because the number of keys in the map represents the number of distinct values, hence the need to remove any element whose value in the map is zero.
The implementation:

```javascript
function longestSubstringWithKdistinct(str, k) {
  let windowStartIndex = 0
  let windowEndIndex = 0
  let maxLength = 0
  const charOccurences = {}

  const windowLen = () => windowEndIndex - windowStartIndex + 1
  while (windowEndIndex < str.length) {
    const lastChar = str[windowEndIndex]
    if (!(lastChar in charOccurences)) {
      charOccurences[lastChar] = 0
    }
    charOccurences[lastChar] += 1
    // shrink window if neccessary
    while (Object.keys(charOccurences).length > k) {
      const firstChar = str[windowStartIndex]
      charOccurences[firstChar] -= 1
      if (charOccurences[firstChar] === 0) {
        delete charOccurences[firstChar]
      }
      windowStartIndex += 1 // shrink the window
    }
    // remember the maximum length so far
    maxLength = Math.max(maxLength, windowLen())
    windowEndIndex++
  }

  return maxLength
}
```

There you have it. If you can understand and implement these solutions yourself, then you have the tools needed to quickly and efficiently find the solutions to many other similiar problems.
