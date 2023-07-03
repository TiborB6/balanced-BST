function mergeSort(arr) {
  if (arr.length < 2) return arr

  const firstHalf = arr.slice(0, Math.floor(arr.length / 2))
  const secondHalf = arr.slice(Math.floor(arr.length / 2))

  const sortedFirstHalf = mergeSort(firstHalf)
  const sortedSecondHalf = mergeSort(secondHalf)

  arr = []
  let i = 0
  let j = 0
  while (sortedFirstHalf.length > i || sortedSecondHalf.length > j) {
    if (
      j === sortedSecondHalf.length ||
      (i < sortedFirstHalf.length && sortedFirstHalf[i] <= sortedSecondHalf[j])
    ) {
      arr.push(sortedFirstHalf[i])
      i++
    } else {
      arr.push(sortedSecondHalf[j])
      j++
    }
  }

  return arr
}

function createBST(arr) {
  const start = 0
  const end = arr.length - 1
  const mid = Math.floor((start + end) / 2)

  if (start > end) return null

  return {
    root: arr[mid],
    left: createBST(arr.slice(start, mid)),
    right: createBST(arr.slice(mid + 1, end + 1)),


    // Methods
    insert (value) {
      const neededArr = [value]
      const newTree = createBST(neededArr)
      let currentTree = this
      while (currentTree != null) {
        if (value <= currentTree.root) {
          if (currentTree.left === null) {
            currentTree.left = newTree
            return
          }
          currentTree = currentTree.left
        }
        if (value > currentTree.root) {
          if (currentTree.right === null) {
            currentTree.right = newTree
            return
          }
          currentTree = currentTree.right
        }
      }
    },

    delete () {
      // implement
    },

    find (value) {
      let currentTree = this
      while (currentTree != null) {
        if (value < currentTree.root) {
          currentTree = currentTree.left
        } else if (value > currentTree.root) {
          currentTree = currentTree.right
        } else if (value === currentTree.root) {
          return currentTree
        } else {
          console.log('not found')
          return
        }
      }
    },

    levelOrder (fn) {
      if (this.root === null) return

      const queue = []
      const result = []

      queue.push(this)

      while (queue.length > 0) {
        const tree = queue.shift()
        result.push(tree.root)

        if (tree.left !== null) {
          queue.push(tree.left)
        }
        if (tree.right !== null) {
          queue.push(tree.right)
        }
      }

      if (typeof fn === 'function') {
        return fn(result)
      } else {
        return result
      }
    },

    preorder () {
      const arr = []
      function addValues (tree) {
        if (tree === null) return
        arr.push(tree.root)
        addValues(tree.left)
        addValues(tree.right)
      }
      addValues(this)
      return arr
    },

    inorder () {
      const arr = []
      function addValues (tree) {
        if (tree === null) return
        addValues(tree.left)
        arr.push(tree.root)
        addValues(tree.right)
      }
      addValues(this)
      return arr
    },

    postorder () {
      const arr = []
      function addValues (tree) {
        if (tree === null) return
        addValues(tree.left)
        addValues(tree.right)
        arr.push(tree.root)
      }
      addValues(this)
      return arr
    },

    height () {
      let arr = []
      function path (tree, count) {
        if (count === undefined) count = 0

        if (tree === null) {
          arr.push(count - 1)
          return
        } 

        path(tree.right, count + 1)
        path(tree.left, count + 1)
      }
      path(this)

      let highest = arr[0]
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] > highest) {
          highest = arr[i]
        }
      }
      return highest
    },

    depth (value) {
      let count = -1
      if (this.root !== null) count++ 
      let currentTree = this
      while (currentTree != null) {
        if (value < currentTree.root) {
          currentTree = currentTree.left
          count++
        } else if (value > currentTree.root) {
          currentTree = currentTree.right
          count++
        } else if (value === currentTree.root) {
          return count
        } else {
          console.log('not found')
          return
        }
      }
    },

    isBalanced() {
      function getHeight(tree) {
        if (tree === null) return 0
        const leftHeight = getHeight(tree.left)
        const rightHeight = getHeight(tree.right)
        return Math.max(leftHeight, rightHeight) + 1
      }
    
      function checkBalance(tree) {
        if (tree === null) return true
        const leftHeight = getHeight(tree.left)
        const rightHeight = getHeight(tree.right)
        if (Math.abs(leftHeight - rightHeight) > 1) {
          return false;
        }
        return checkBalance(tree.left) && checkBalance(tree.right)
      }
    
      return checkBalance(this)
    },

    rebalance () {
      const arr = this.inorder()
      const newTree = createBST(arr)

      this.root = newTree.root;
      this.left = newTree.left;
      this.right = newTree.right;
    }
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.root}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function createNumberArray(length) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    arr.push(randomNumber);
  }
  return arr;
}


function program() {
  const numberArray = createNumberArray(100)
  console.log(numberArray)

  const sortedArr = mergeSort(numberArray)
  console.log(sortedArr)

  const BBST = createBST(sortedArr)
  prettyPrint(BBST)

  const addedArr = createNumberArray(20)
  console.log(addedArr)

  addedArr.forEach(value => BBST.insert(value))
  prettyPrint(BBST)

  if (BBST.isBalanced() === false) BBST.rebalance()
  prettyPrint(BBST)

  console.log(BBST.isBalanced())
  console.log(BBST.inorder())
}

program()