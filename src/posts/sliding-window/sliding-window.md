---
title: "The Sliding Window Technique"
date: "2020-05-31"
---

## Topics Covered

1. Fixed Window
2. Dynamic Window
3. Dynamic Window with a Hashmap  

Solving leetcode/hackerrank problems quickly and efficiently in order to prepare for a technical interview can seem like a daunting task. What a relief to find out many of these problems can be solved relatively easily by applying certain algorithms or techniques. Enter the sliding window, a pattern or technique to efficiently solve coding problems related to finding max/min substrings or other problems solved with the help of visualizing a sliding window across an array.

Although it may not always be straightforward to recognize when to apply this technique, a good hint is noting whether or not the solution requires us to find the **longest, shortest, or max/min** contiguous subsection of a given string, sequence or array. If it does, then slide that window!

**Complexity**: typically O(n) time and O(1) space  

There are three sliding window variations to be aware of, but hopefully there's enough clues in the problem description to make it clear which one to choose.

In all cases though, envision a window “sliding” through a sequence of elements while recording data in each step of the movement. When the window has reached the end of the sequence, the slide halts and the appropriate data is displayed. NOTE: sometimes reaching the end may mean the end of the window must reach the end of the sequence, and sometimes the start must as well.

####Pseudocode-ish Example

- Track both ends of the window, the running total, and the final return value, or optimum
- Loop until the end of the window reaches the end of the sequence 
- Update the running total – normally based on arithmetic using the value at window's end element 
- Conditionally update optimum value 
- Slide the window by incrementing it's end
- Conditionally increment the start end of the window based on problem requirement
- On loop termination, return the optimum value 

This solution uses more variables than necessary as the window movement can be calculated simply by using the ‘i’ variable in a for loop; however, for clarity and flexibility, I prefer a while loop while managing variables for the window start/end index.
The above solution structure can be thought of as being composed of two main chunks: the first chunk calculates the optimal value and the second, moves the window. 

Although the pseudocode may seem simple, extra care should be taken when moving the window as all variables have to be accounted for, while also adhering to the conditions set out in the problem. ***NOTE:*** when "sliding" the front end of the window forward, remember to discard the old value at window's start and modify the running total!

###Case 1: FIXED WINDOW LENGTH

*Given an array of positive numbers and a positive number ‘k’, find the maximum sum of any contiguous subarray of size ‘k’.*

```javascript
function largestSum(k) {
  // initialize variables
  windowStartIndx = 0
  windowEndIndx = 0
  // set the optimum to a value that MUST be overridden 
  maxValue = Number.MIN_VALUE
  currValue = 0 // the running total

  while (windowEndIndx < arr.length ) {
    currValue += arr[windowEndIndx]
    // compare the running total to the current optimum
    maxValue = Math.max(currValue, maxValue)
    // update running total conditionally based on problem specs
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

Hopefully a little brevity doesn’t cause any lack of clarity (inside the while loop):

```javascript
  if (windowEndIndx – windowStartIndx + 1 < k) {
    windowEndIndx++
  }
  else {
    currValue -= arr[windowStartIndx]
    windowStartIndx++
    windowEndIndx++
  }
  // Refactors into ….
  if !(windowEndIndx – windowStartIndx + 1 < k) {
    currValue -= arr[windowStartIndx]
    windowStartIndx++
  }
  windowEndIndx++

```

###Case 2: VARIABLE WINDOW LENGTH
Sometimes we're asked not to look for an optimal sum or measurement based on the elements within the window, but rather the window itself, namely it’s size as it meets certain conditions based on the elements within. These set of problems require the window size to be dynamic: the window start/end indices won’t always move in unison. The result will be a dynamically shrinking/growing window.  
The main change to our code occurs in “chunk 2” where the window “moves”. Let's look at a concrete example....

*find the smallest subarray with sum of values >= k*

```javascript
function smallestSubarray(k, arr) {
  // initialize variables
  let windowStartIndex = 0
  let windowEndIndex = 0
  let bestWindowSize = Number.MAX_VALUE 
  // currenly window 'value' depends on the problem spec
  let currWindowValue = 0 
  let matchFound = false //handle the case of no matches
  // for clarity, this simple helper function returns current window size 
  function currWindowSize() {
    return windowEndIndex - windowStartIndex + 1
  }
  // handle base case
  if (arr.length === 0) return 0
  while (windowEndIndex < arr.length) {
    currWindowValue += arr[windowEndIndex]
    // the while loop below is largely question specific
    // shrink the window based on condition
    while (currWindowValue >= k) {
      matchFound = true // optional variable
      // conditionally update current optimal answer
      bestWindowSize = Math.min(bestWindowSize, currWindowSize())
      // remove window start value from running total
      currWindowValue -= arr[windowStartIndex]
      windowStartIndex++
    }
    windowEndIndex++ // prevent infinite loop!
  }
  // return null for no match is better than returning Number.MAX_VALUE
  return matchFound ? bestWindowSize : null
}
```

The biggest difference between the two variations thus far is that implementing a dynamically sized window involves a second loop to move ahead the start index. Moving the start / end indices both constitute progression and because each element is iterated over no more than two times, the complexity remains O(n).
This variation is applied to problems that reference the smallest/largest subset of a sequence/substring, or, as already stated, problems that relate to the size of the window.

###Case 3: VARIABLE WINDOW LENGTH w/ HASHMAP 

Lastly, let’s look at the case where we are asked to adhere to an extra condition, usually one that requires us to keep track of the number of occurrences of each element. Questions like this almost always warrant an extra data structure, normally a hashmap, be added to our typical solution.



*Find the longest substring with k distinct characters*

```javascript
// let str be the string to traverse 
function longestSubstringWithKdistinct(str, k) {
  let windowStartIndex = 0
  let windowEndIndex = 0
  let maxLength = 0 // current optimal solution
  const charOccurences = {} // JS version of hashmap is a simple object
  // once again with the helper function
  const windowLen = () => windowEndIndex - windowStartIndex + 1
  while (windowEndIndex < str.length) {
    // If value at window end is not in our map, set it as a key with the value of 0
    const lastChar = str[windowEndIndex]
    if (!(lastChar in charOccurences)) {
      charOccurences[lastChar] = 0
    }
    // update the 'occurence' value associated with the key
    charOccurences[lastChar] += 1
    // shrink window if neccessary
    while (Object.keys(charOccurences).length > k) {
      const firstChar = str[windowStartIndex]
      // “Remove” the element at windowStartIndex
      charOccurences[firstChar] -= 1
      // important to remove any entry with zero value
      if (charOccurences[firstChar] === 0) {
        delete charOccurences[firstChar]
      }
      // the current value of window start doesn't imapact our hashmap state 
      // hence, we can safely increment the start index
      windowStartIndex += 1 // shrink the window
    }
    // update the maximum length so far
    maxLength = Math.max(maxLength, windowLen())
    windowEndIndex++
  }
  return maxLength
}
```

The main difference between this solution compared to the others is obviously the use of the the hashmap. ***NOTE:*** It’s useful in this case because the number of keys in the map represents the number of distinct values, hence the need to remove any element whose value in the map is zero.

There you have it. If you can understand and implement these solutions yourself, then you have the tools needed to quickly and efficiently find the solutions to the plethora of similiar problems.
