import Tree from "./app.js";
import prettyPrint from "./prettyPrint.js";

function randomArray(size) {
    return Array.from({length: size}, () => Math.floor(Math.random() * 100));
}


let bst = new Tree(randomArray(5));
console.log("-------------Tree-------------")
console.log(prettyPrint(bst.root))
console.log("------------------------------")
console.log(`Is balanced?: ${bst.isBalanced()}`);
console.log(`Level Order: ${bst.levelOrder()}`);
console.log(`Preorder: ${bst.preorder()}`);
console.log(`Postorder: ${bst.postorder()}`);
console.log(`Inorder: ${bst.inorder()}`);
console.log("-------------------------------")
bst.insert(120);
bst.insert(101);
bst.insert(150);
bst.insert(155);
console.log("-------------Tree with 4 new nodes-------------")
console.log(prettyPrint(bst.root))
console.log("-----------------------------------------------")
console.log(`Is balanced?: ${bst.isBalanced()}`);
console.log("Rebalancing...");
bst.rebalance();
console.log("-------------Tree with 4 new nodes (rebalanced)-------------")
console.log(prettyPrint(bst.root))
console.log("------------------------------------------------------------")
console.log(`Is balanced?: ${bst.isBalanced()}`);
console.log(`Level Order: ${bst.levelOrder()}`);
console.log(`Preorder: ${bst.preorder()}`);
console.log(`Postorder: ${bst.postorder()}`);
console.log(`Inorder: ${bst.inorder()}`);
console.log("------------------------------------------------------------")