import Node from "./node.js";


class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr)
    }

    rebuildArray(arr) {
        let sorted = [...new Set(arr)].sort((a, b) => a - b);
        return sorted;
    }

    buildTree(arr) {
        let sorted = this.rebuildArray(arr);
        if(sorted.length === 0) return null;

        let mid = parseInt((sorted.length)/2);
        let node = new Node(sorted[mid]);
        node.left = this.buildTree(sorted.slice(0, mid));
        node.right = this.buildTree(sorted.slice(mid + 1));
        return node;
    }

    insert(value) {
        return this.insertFn(value, this.root);
    }

    insertFn(value, root) {
        if (root == null) {
            root = new Node(value);
        }
        if(root.data === value) return null;
        if(root.data > value) {
            if(root.left !== null) {
                this.insertFn(value, root.left);
            } else {
                let node = new Node(value);
                root.left = node;
            }
        }

        if(root.data < value) {
            if(root.right !== null) {
                this.insertFn(value, root.right);
            } else {
                let node = new Node(value);
                root.right = node;
            }
        }
    }

    delete(value) {
        this.root = this.deleteFn(value, this.root);
    }

    deleteFn(value, root) {
        if(root === null) return root;

        if(root.data > value) {
            root.left = this.deleteFn(value, root.left);
        }

        if(root.data < value) {
            root.right = this.deleteFn(value, root.right);
        }

        if(root.data === value) {
            if(root.left === null) {
                return root.right;
            }

            if(root.right === null) {
                return root.left;
            }

            let parent = root;
            let succ = root.right;

            while(succ.left !== null) {
                parent = succ;
                succ = succ.left;
            }

            if(parent !== root) {
                parent.left = succ.right;
            } else {
                parent.right = succ.right;
            }

            root.data = succ.data;
        }
        return root;
    }

    find(value, root = this.root) {
        if(root === null) return null;
        if(root.data > value) {
            return this.find(value, root.left);
        }

        if(root.data < value) {
            return this.find(value, root.right);
        }

        if(root.data === value) {
            return root;
        }
    }

    levelOrder(arr = [], queue = [], root = this.root) {
        if(root === null) return;
        arr.push(root.data);

        queue.push(root.left);
        queue.push(root.right);

        while(queue.length) {
            let next = queue[0];
            queue.shift();
            this.levelOrder(arr, queue, next);
        }

        return arr;
    }

    inorder(arr = [], root = this.root) {
        if(root === null) return;

        if(root.left) this.inorder(arr, root.left);
        arr.push(root.data);
        if(root.right) this.inorder(arr, root.right);
        return arr;
    }

    preorder(arr = [], root = this.root) {
        if(root === null) return;

        arr.push(root.data);
        if(root.left) this.inorder(arr, root.left);
        if(root.right) this.inorder(arr, root.right);
        return arr;
    }

    postorder(arr = [], root = this.root) {
        if(root === null) return;

        if(root.left) this.inorder(arr, root.left);
        if(root.right) this.inorder(arr, root.right);
        arr.push(root.data);
        return arr;
    }

    height(node = this.root) {
        if(node === null) return -1;
        
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node, root = this.root, count = 0) {
        if(root === null) return 0;
        if(root.data === node.data) return count;
        if(root.data > node.data) {
            return this.depth(node, root.left, count + 1);
        } else {
            return this.depth(node, root.right, count + 1);
        }
    }

    isBalanced(node = this.root) {
        if(node === null) return true;
        let difference = Math.abs(this.height(node.left) - this.height(node.right));
        if(difference <= 1) {
            return true;
        } else {
            return false;
        }
    }

    rebalance() {
        if(this.root === null) return;
        let sortedArray = this.rebuildArray(this.inorder());
        this.root = this.buildTree(sortedArray);
    }
}

export default Tree;
