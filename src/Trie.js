function Node(){
    this.suggestions = []
    this.children = {}
}

class Trie{
    constructor(){
      this.root = new Node()
    }
  
    insert(word, idx){

        let current = this.root

        for (let character of word) {

            if (current.suggestions.length < 9) {
                current.suggestions.push(idx)
            }

            if(current.children[character] === undefined){
                current.children[character] = new Node()
            }

            current = current.children[character]
        }

    }
  
    search(word){
        word = word.toLowerCase()
       let current = this.root
      for(let character of word){
           if(current.children[character] === undefined){
               return current.suggestions
           }
          current = current.children[character]  
      }
      return current.suggestions
    }
}

export default Trie;
