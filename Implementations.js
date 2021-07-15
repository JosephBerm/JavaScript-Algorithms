/////////////////////////////////////////////////////////////////////
//TODO Algorithm 1 - QuickSort
/////////////////////////////////////////////////////////////////////
console.log("\nAlgorithm 1", "QuickSort");

function quickSort(list, left, right)
{
    let index;
    if (list.length > 1)
    {
        index = partition(list, left, right);
        if (left < index - 1)
        {
            quickSort(list, left, index - 1);
        }
        if (index < right)
        {
            quickSort(list, index, right);
        }
    }
    return list;
}

function swap(list, leftIndex, rightIndex)
{
    let temp = list[leftIndex];
    list[leftIndex] = list[rightIndex];
    list[rightIndex] = temp;
}

function partition(list, left, right)
{
    let pivot = list[Math.floor((right + left) / 2)];
    while (left <= right)
    {
        while (list[left] < pivot)
        {
            left++;
        }
        while (list[right] > pivot)
        {
            right--;
        }
        if (left <= right)
        {
            swap(list, left, right); //swapping two elements
            left++;
            right--;
        }
    }
    return left;
}

let unorganizedList = [5, 2, 8, 4, 6, 5, 10, 7, 3, 9, 1, -1, 0];
console.log("Original Array:", unorganizedList);
console.log("After QuickSort:", quickSort(unorganizedList, 0, unorganizedList.length - 1));

/////////////////////////////////////////////////////////////////////
//TODO Algorithm 2 - MergeSort
/////////////////////////////////////////////////////////////////////
console.log("\nAlgorithm 2", "MergeSort");

function merge(left, right)
{
    let arr = [];
    //Break out of loop if any of the arrays gets emptied
    while (left.length && right.length)
    {
        //Pick the small between the left and right subarrays
        if (left[0] < right[0])
        {
            arr.push(left.shift());
        }
        else
        {
            arr.push(right.shift());
        }
    }

    return [...arr, ...left, ...right];
}

function mergeSort(array)
{
    const half = array.length / 2;

    if (array.length < 2)
    {
        return array;
    }

    const left = array.splice(0, half);
    return merge(mergeSort(left), mergeSort(array));
}

let unorganizedArray = [19, 13, 15, 16, 11, 14, 18, 17, 12, 20];
console.log("Original Array:", unorganizedArray);
console.log("After MergeSort:", mergeSort(unorganizedArray));

/////////////////////////////////////////////////////////////////////
//TODO Algorithm 3 - Egg Dropping
/////////////////////////////////////////////////////////////////////
console.log("\nAlgorithm 3", "Egg Dropping");

function eggDrop(numberOfEggs, numberOfFloors)
{
    if (numberOfFloors == 1 || numberOfFloors == 0)
    {
        return numberOfFloors;
    }
    if (numberOfEggs == 1)
    {
        return numberOfFloors;
    }

    let min = Number.MAX_VALUE;
    let res, x;

    for (x = 1; x <= numberOfFloors; x++)
    {
        res = Math.max(eggDrop(numberOfEggs - 1, x - 1),
            eggDrop(numberOfEggs, numberOfFloors - x));
        if (res < min)
        {
            min = res;
        }
    }
    return min + 1;
}

const eggCount = 3, floorsCount = 18;
console.log("The minimum number of trials in worst case\nwith " + eggCount + " eggs and "
    + floorsCount + " floors is " + eggDrop(eggCount, floorsCount));

/////////////////////////////////////////////////////////////////////
//TODO Algorithm 4 - Coin Change
/////////////////////////////////////////////////////////////////////
console.log("\nAlgorithm 4", "Coin Change");

function coinChange(coins, amount)
{
    let finalResult = FindMinCount(coins, 0, 0, amount, 0, amount + 1);
    function FindMinCount(coins, i, currentSum, amount, count, result)
    {
        if (amount == 0)
        {
            return 0;
        }
        if (currentSum > amount)
        {
            return result;
        }
        if (currentSum == amount)
        {
            result = Math.min(count, result);
            return result;
        }
        if (i <= coins.length - 1)
        {
            count++;
            result = FindMinCount(coins, i, currentSum + coins[i], amount, count, result);
            count--;
            result = FindMinCount(coins, i + 1, currentSum, amount, count, result);
        }
        return result;
    }

    return finalResult;
}

let coinDenominations = [1, 2, 5],
    amountDesired = 11;
let output =
    `Coin Denominations Included: ${ coinDenominations }
Amount In Value Desired: ${ amountDesired }
Minimum Amount Of Coins Possible: ${ (coinChange([1, 2, 5], 11)) }\n`;

console.log(output);

/////////////////////////////////////////////////////////////////////
//TODO Algorithm 5 - Longest Common Subsequence
/////////////////////////////////////////////////////////////////////
console.log("\nAlgorithm 5", "Longest Common Sequence");

const LongestCommonSubsequence =
{
    LCS: function (x, y, m, n) 
    {
        if (m == 0 || n == 0)
        {
            return 0;
        }
        if (x[m - 1] == y[n - 1])
        {
            return 1 + this.LCS(x, y, m - 1, n - 1);
        }
        else
        {
            return this.max(this.LCS(x, y, m, n - 1), this.LCS(x, y, m - 1, n));
        }
    },
    max: function (a, b)
    {
        return (a > b) ? a : b;
    },
    main: function ()
    {
        const string1 = 'AGGTAB';
        const string2 = 'GXTXAYB';
        const substring1 = string1.split('');
        const substring2 = string2.split('');
        let m = substring1.length;
        let n = substring2.length;

        console.log("Sequence 1", string1);
        console.log("Sequence 2", string2);
        console.log('Length of LCS is ' + LongestCommonSubsequence.LCS(substring1, substring2, m, n));
    }
};

LongestCommonSubsequence.main();

/////////////////////////////////////////////////////////////////////
//TODO Algorithm 6 - Longest Increasing Subsequence
/////////////////////////////////////////////////////////////////////
console.log("\nAlgorithm 6", "Longest Increasing Sequence");

function LIS(arr)
{
    const lengthsArr = Array(arr.length).fill(1);

    let previousElemIndx = 0;
    let currentElemIndx = 1;

    while (currentElemIndx < arr.length)
    {
        if (arr[previousElemIndx] < arr[currentElemIndx])
        {
            const newLength = lengthsArr[previousElemIndx] + 1;
            if (newLength > lengthsArr[currentElemIndx])
            {
                lengthsArr[currentElemIndx] = newLength;
            }
        }
        previousElemIndx += 1;
        if (previousElemIndx === currentElemIndx)
        {
            currentElemIndx += 1;
            previousElemIndx = 0;
        }
    }

    let longestIncreasingLength = 0;

    for (let i = 0; i < lengthsArr.length; i += 1)
    {
        if (lengthsArr[i] > longestIncreasingLength)
        {
            longestIncreasingLength = lengthsArr[i];
        }
    }

    return longestIncreasingLength;
}

const seqencedArray = [13, 1, 3, 4, 8, 4]; //[1, 3, 4, 8] = 4

console.log("The Longest Increasing Sequence (LIS): " + LIS(seqencedArray));


/////////////////////////////////////////////////////////////////////
//TODO Algorithm 7 - Heap Sort
/////////////////////////////////////////////////////////////////////
console.log("\nAlgorithm 7", "HeapSort");

const heapsort = arr =>
{
    const a = [...arr];
    let len = a.length;

    const heapify = (a, i) =>
    {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        let max = i;
        if (left < len && a[left] > a[max]) max = left;
        if (right < len && a[right] > a[max]) max = right;
        if (max !== i)
        {
            [a[max], a[i]] = [a[i], a[max]];
            heapify(a, max);
        }
    };

    for (let i = Math.floor(len / 2); i >= 0; i -= 1)
    {
        heapify(a, i);
    }
    for (i = a.length - 1; i > 0; i--)
    {
        [a[0], a[i]] = [a[i], a[0]];
        len--;
        heapify(a, 0);
    }
    return a;
};

let arrToSort = [6, 3, 4, 1];
console.log(`HeapSort -> ${ arrToSort }`, heapsort(arrToSort));


/////////////////////////////////////////////////////////////////////
//TODO Algorithm 8 - Breadth First Search
/////////////////////////////////////////////////////////////////////
console.log("\nAlgorithm 8", "Breadth First Search");

let BreadthFirstSearch = (tree, rootNode, searchFor) =>
{
    let queue = [];
    queue.push(rootNode);

    while (queue.length > 0)
    {
        let currentNode = queue[0];

        if (currentNode.value === searchFor)
        {
            console.log(`Found ${ searchFor }!`);
            return;
        }

        if (currentNode.left !== null)
        {
            queue.push(tree[currentNode.left]);
        }

        if (currentNode.right !== null)
        {
            queue.push(tree[currentNode.right]);
        }
        queue.shift();
    }
    console.log("Sorry, no such node found :(");
};
let tree = {
    "10": {
        value: "10",
        left: "4",
        right: "17",
    },
    "4": {
        value: "4",
        left: "1",
        right: "9",
    },
    "17": {
        value: "17",
        left: "12",
        right: "18",
    },
    "1": {
        value: "1",
        left: null,
        right: null,
    },
    "9": {
        value: "9",
        left: null,
        right: null,
    },
    "12": {
        value: "12",
        left: null,
        right: null,
    },
    "18": {
        value: "18",
        left: null,
        right: null,
    },
};

const valueToSearchFor = "12";
console.log(`Searching for ${ valueToSearchFor }...`);
BreadthFirstSearch(tree, tree[10], valueToSearchFor);

/////////////////////////////////////////////////////////////////////
//TODO Algorithm 9 - Depth First Search
/////////////////////////////////////////////////////////////////////
console.log("\nAlgorithm 9", "Depth First Search");

class TreeNode
{
    constructor(value)
    {
        this.value = value;
        this.children = [];
    }
}

class Tree
{
    constructor()
    {
        this.root = null;
    }

    traverseBFS()
    {
        if (!this.root)
        {
            return false;
        }
        const queue = new Queue();
        const treeValues = [];
        queue.enqueue(this.root);
        while (queue.size !== 0)
        {
            const nodeChildren = queue.first.value.children;
            if (nodeChildren.length !== 0)
            {
                nodeChildren.forEach(child => queue.enqueue(child));
            }
            treeValues.push(queue.first.value);
            queue.dequeue();
        }
        return treeValues;
    }

    traverseDFS(type)
    {
        if (!this.root)
        {
            return false;
        }
        const treeValues = [];
        let current = this.root;

        const preOrderHelper = node =>
        {
            treeValues.push(node.value);
            if (node.children.length !== 0)
            {
                node.children.forEach(child =>
                {
                    preOrderHelper(child);
                });
            }
            return true;
        };

        const postOrderHelper = node =>
        {
            if (node.children.length !== 0)
            {
                node.children.forEach(child =>
                {
                    postOrderHelper(child);
                });
            }
            treeValues.push(node.value);
            return true;
        };

        const inOrderHelper = node =>
        {
            if (node.children.length !== 0)
            {
                const halfway = Math.floor(node.children.length / 2);
                for (let i = 0; i < halfway; i++)
                {
                    inOrderHelper(node.children[i]);
                }
                treeValues.push(node.value);
                for (let i = halfway; i < node.children.length; i++)
                {
                    inOrderHelper(node.children[i]);
                }
            } else
            {
                treeValues.push(node.value);
            }
            return true;
        };
        switch (type)
        {
            case "pre":
                preOrderHelper(current);
                break;
            case "post":
                postOrderHelper(current);
                break;
            case "in":
                inOrderHelper(current);
                break;
        }
        //return array
        return treeValues;
    }
}

class QueueNode
{
    constructor(value)
    {
        this.value = value;
        this.next = null;
    }
}

class Queue
{
    constructor()
    {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    enqueue(value)
    {
        const newNode = new QueueNode(value);
        if (this.size === 0)
        {
            this.first = newNode;
            this.last = newNode;
        } else
        {
            this.last.next = newNode;
            this.last = newNode;
        }
        this.size++;

        return this;
    }
    dequeue()
    {
        if (this.size === 0) return false;
        const dequeuedNode = this.first;
        const newFirst = this.first.next;
        if (!newFirst)
        {
            this.last = newFirst;
        }
        this.first = newFirst;
        dequeuedNode.next = null;
        this.size--;
        return dequeuedNode;
    }

    log()
    {
        let currentNode = this.first;
        let i = 0;
        while (currentNode)
        {
            console.log(i, currentNode.value);
            i++;
            currentNode = currentNode.next;
        }
    }
}

const testTree2 = new Tree();

testTree2.root = new TreeNode(10);
testTree2.root.children.push(new TreeNode(6));
testTree2.root.children.push(new TreeNode(15));
testTree2.root.children[0].children.push(new TreeNode(3));
testTree2.root.children[0].children.push(new TreeNode(8));
testTree2.root.children[0].children.push(new TreeNode(7));
testTree2.root.children[1].children.push(new TreeNode(20));

console.log(testTree2.traverseDFS("in"));

/////////////////////////////////////////////////////////////////////
//TODO Algorithm 10 - Kruskal's Algorithm
/////////////////////////////////////////////////////////////////////
console.log("\nAlgorithm 10", "Kruskal's Algorithm");

//vertex names
let vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
// Edge and weight [0, 1, 12] means that the weight of A to B is 12
let edges = [
    [0, 1, 12],
    [0, 5, 16],
    [0, 6, 14],
    [1, 2, 10],
    [1, 5, 7],
    [2, 3, 3],
    [2, 4, 5],
    [2, 5, 6],
    [3, 4, 4],
    [4, 5, 2],
    [4, 6, 8],
    [5, 6, 9]
];

function findMinEdge(edges)
{
    let min = null;
    for (const edge of edges)
    {
        min = min ? edge[2] < min[2] ? edge : min : edge;
    }
    return min;
}

function findEdgesIn(srcs, objs, edges, vertices)
{
    let edgesBetweenSrcObj = [];
    for (const edge of edges)
    {
        for (const src of srcs)
        {
            srcIndex = vertices.indexOf(src);
            for (const obj of objs)
            {
                objIndex = vertices.indexOf(obj);
                if (edge[0] === srcIndex && edge[1] === objIndex || edge[0] === objIndex && edge[1] === srcIndex)
                { // no direction
                    edgesBetweenSrcObj.push(edge);
                }
            }
        }
    }
    return edgesBetweenSrcObj;
}

function DisjoinSet()
{
    this.items = {};
    this.makeSet = function (vertices)
    {
        for (const vertex of vertices)
        {
            this.items[vertex] = {
                parent: null,
                value: vertex
            };
        }
    };
    this.unionSet = function (vertex_1, vertex_2)
    {
        const rootA = this.find(vertex_1);
        const rootB = this.find(vertex_2);
        if (rootA === null || rootB === null)
        {
            throw new Error('no exist vertex');
        }

        if (rootA !== rootB)
        {
            rootA.parent = rootB;
            return true;
        }
        return false;
    };
    this.find = function (vertex)
    {
        let p = this.items[vertex];
        if (p)
        {
            return p.parent === null ? p : this.find(p.parent.value);
        }
        throw new Error('not exist vertex');
    };
}

function kruskal(edges, vertices)
{
    let MSTtree1 = [];
    let edgesCopy = edges.slice(0);
    let disjoinSet = new DisjoinSet();
    disjoinSet.makeSet(vertices);
    while (MSTtree1.length < vertices.length - 1)
    {
        let min = findMinEdge(edgesCopy);
        if (disjoinSet.unionSet(vertices[min[0]], vertices[min[1]]))
        {
            MSTtree1.push(min);
        }
        edgesCopy.splice(edgesCopy.indexOf(min), 1);
    }
    return MSTtree1;
}


let MSTtree1 = kruskal(edges, vertices);
console.log(MSTtree1);
console.log("[Edge1, Edge2, Weight]");

/////////////////////////////////////////////////////////////////////
//TODO Algorithm 11 - Binary Search
/////////////////////////////////////////////////////////////////////
console.log("\nAlgorithm 11", "Binary Search");

let binarySearch = function (arr, searchFor, startIndx, endIndx)
{
    if (startIndx > endIndx)
        return false;

    let mid = Math.floor((startIndx + endIndx) / 2);

    if (arr[mid] === searchFor)
        return true;

    if (arr[mid] > searchFor)
        return binarySearch(arr, searchFor, startIndx, mid - 1);
    else
        return binarySearch(arr, searchFor, mid + 1, endIndx);
};

let arr = [1, 3, 5, 7, 8, 9];
let searchFor = 5;
console.log(`Searching for ${ searchFor } in array ${ arr }`);
if (binarySearch(arr, searchFor, 0, arr.length - 1))
    console.log('Element found!');
else console.log('Element not found!');

searchFor = 6;
console.log(`Searching for ${ searchFor } in array ${ arr }`);

if (binarySearch(arr, searchFor, 0, arr.length - 1))
    console.log('Element found!');
else console.log('Element not found!');

/////////////////////////////////////////////////////////////////////
//TODO Algorithm 12 - Prim's Algorithm
/////////////////////////////////////////////////////////////////////
console.log("\nAlgorithm 12", "Prim's Algorithm");

function prim(edges, vertices, startVertex)
{
    let visited = [];
    let remaining = vertices.slice(0);
    let MSTtree2 = [];
    let cur = startVertex;
    while (remaining.length !== 1)
    {
        visited.push(cur);
        remaining.splice(remaining.indexOf(cur), 1);
        let min = findMinEdge(findEdgesIn(visited, remaining, edges, vertices));
        MSTtree2.push(min);
        cur = visited.indexOf(vertices[min[0]]) === -1 ? vertices[min[0]] : vertices[min[1]]; // Update
    }
    return MSTtree2;
}

let MSTtree2 = prim(edges, vertices, 'A');
console.log(MSTtree2);
console.log("[Edge1, Edge2, Weight]");

/////////////////////////////////////////////////////////////////////
//TODO Algorithm 13 - Bellman Ford Algorithm
/////////////////////////////////////////////////////////////////////
console.log("\nAlgorithm 13", "Bellman Ford Algorithm");

function BellmanFord(graph, vert, E, src)
{
    let dis = Array(vert).fill(1000000000);
    dis[src] = 0;
    for (let i = 0; i < vert - 1; i++)
    {
        for (let j = 0; j < E; j++)
        {
            if ((dis[graph[j][0]] + graph[j][2]) < dis[graph[j][1]])
                dis[graph[j][1]] = dis[graph[j][0]] + graph[j][2];
        }
    }
    for (let i = 0; i < E; i++)
    {
        let x = graph[i][0];
        let y = graph[i][1];
        let weight = graph[i][2];
        if ((dis[x] != 1000000000) &&
            (dis[x] + weight < dis[y]))
            console.log("Graph contains negative" +
                " weight cycle\t");
    }

    console.log("Vertex Distance from Source\t");
    for (let i = 0; i < vert; i++)
        console.log(i + "   " + dis[i] + "\t");
}

let vert = 5;
let E = 8;

let graph = [[0, 1, -1], [0, 2, 4],
[1, 2, 3], [1, 3, 2],
[1, 4, 2], [3, 2, 5],
[3, 1, 1], [4, 3, -3]];
BellmanFord(graph, vert, E, 0);

//Time Complexity: O(VE)

/////////////////////////////////////////////////////////////////////
//TODO Algorithm 14 - Dijkstra's Algorithm
/////////////////////////////////////////////////////////////////////
console.log("\nAlgorithm 14", "Dijkstra's Algorithm");

//Vertexes
let V = 9;
//dist = distance + SPTset = Shortest Path Tree Set
function minDistance(dist, SPTset)
{
    let min = Number.MAX_VALUE;
    let minIndx = -1;

    for (let v = 0; v < V; v++)
    {
        if (SPTset[v] == false && dist[v] <= min)
        {
            min = dist[v];
            minIndx = v;
        }
    }
    return minIndx;
}
function printSolution(dist)
{
    console.log("Vertex\tDistance from Source\n");
    for (let value in dist)
    {
        console.log(value, `\t\t${ dist[value] }`);
    }
}

function dijkstra(graph, src)
{
    let dist = new Array(V);
    let SPTset = new Array(V);

    for (let i = 0; i < V; i++)
    {
        dist[i] = Number.MAX_VALUE;
        SPTset[i] = false;
    }
    dist[src] = 0;

    for (let count = 0; count < V - 1; count++)
    {
        let u = minDistance(dist, SPTset);

        SPTset[u] = true;

        for (let v = 0; v < V; v++)
        {
            if (!SPTset[v] && graph[u][v] != 0 &&
                dist[u] != Number.MAX_VALUE &&
                dist[u] + graph[u][v] < dist[v])
            {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }

    printSolution(dist);
}

let graph2 =
    [[0, 4, 0, 0, 0, 0, 0, 8, 0],
    [4, 0, 8, 0, 0, 0, 0, 11, 0],
    [0, 8, 0, 7, 0, 4, 0, 0, 2],
    [0, 0, 7, 0, 9, 14, 0, 0, 0],
    [0, 0, 0, 9, 0, 10, 0, 0, 0],
    [0, 0, 4, 14, 10, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 1, 6],
    [8, 11, 0, 0, 0, 0, 1, 0, 7],
    [0, 0, 2, 0, 0, 0, 6, 7, 0]];
dijkstra(graph2, 0);

//Time Complexity: O(V^2)

/////////////////////////////////////////////////////////////////////
//TODO Algorithm 15 - Secure Hash Algorithm
/////////////////////////////////////////////////////////////////////
console.log("\nAlgorithm 15", "Secure Hash Algorithm");



/////////////////////////////////////////////////////////////////////
//TODO Algorithm 16 - Integer Factorization
/////////////////////////////////////////////////////////////////////
console.log("\nAlgorithm 16", "Integer Factorization");

function modular_pow(base, exponent, modulus)
{
    let result = 1;

    while (exponent > 0)
    {
        if (exponent % 2 == 1)
            result = (result * base) % modulus;
        exponent = exponent >> 1;
        base = (base * base) % modulus;
    }
    return result;
}

function PollardRho(num)
{
    if (num == 1)
        return num;
    if (num % 2 == 0)
        return 2;

    //range[2, N)
    let x = (Math.floor(Math.random() * (-num + 1)));
    let y = x;
    //composite
    let c = (Math.floor(Math.random() * (-num + 1)));
    //potential divisor
    let d = 1;
    while (d == 1)
    {
        x = (modular_pow(x, 2, num) + c + num) % num;
        y = (modular_pow(y, 2, num) + c + num) % num;
        y = (modular_pow(y, 2, num) + c + num) % num;
        d = GCD(Math.abs(x - y), num);

        if (d == num)
            return PollardRho(num);
    }

    return d;
}
function GCD(a, b)
{
    return b == 0 ? a : GCD(b, a % b);
}

let num = 187;
console.log(`One of the divisors for ${ num } is ${ PollardRho(num) }`);


/////////////////////////////////////////////////////////////////////
//TODO Algorithm 17 - Selection Sort
/////////////////////////////////////////////////////////////////////
console.log("\nAlgorithm 17", "Selection Sort");

//array named arr_17 because it's an array in problem 17
function swap(arr_17, xp, yp)
{
    let temp = arr_17[xp];
    arr_17[xp] = arr_17[yp];
    arr_17[yp] = temp;
}

function selectionSort(arr_17)
{
    let n = arr_17.length;
    let i, j, min_idx;

    for (i = 0; i < n - 1; i++)
    {
        min_idx = i;
        for (j = i + 1; j < n; j++)
            if (arr_17[j] < arr_17[min_idx])
                min_idx = j;

        swap(arr_17, min_idx, i);
    }
}

// function printArray(arr_17)
// {
//     for (let value in arr_17)
//     {
//         console.log(arr_17[value]);
//     }
// }

let arr_17 = [15, 50, 1000, 80, 52, 40, 2, 1, 99, 20, 30, 115];
console.log("Original Array", arr_17);
// printArray(arr_17);

selectionSort(arr_17);
console.log("Sorted Array:", arr_17);
// printArray(arr_17);