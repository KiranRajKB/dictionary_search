import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'
import Meanings from './components/Meanings';
import Trie from './Trie';
import Suggestions from './components/Suggestions';
import raw from './wordsList.txt';


function App() {

    const [ words, setWords ] = useState([])
    const [ suggestions, setSuggestions ] = useState([])
    const [ trie, setTrie ] = useState(new Trie())
    const [ searchWord, setSearchWord ] = useState("")
    const [ meanings, setMeanings ] = useState([])
    const [ loading, setLoading ] = useState(false)


    useEffect( () => {const getWords = async() => {
        try {
            let res = []
            let tempTrie = new Trie()

            fetch(raw)
            .then(r => r.text())
            .then(text => {
                console.log(text)
                res = text.split(/\r?\n/);
                for (let i = 0; i < res.length; i++) {
                    tempTrie.insert(res[i], i)
                }
                setWords(res)
            });            
        

            setTrie(tempTrie)
            console.log("DONE CREATING TRIE")
        } catch (error) {
            console.log("ERROR IN GETTING WORDS : ", error)
        }
    } ; getWords() }     , [] )


    


    const dictionaryApi = async() => {
        setLoading(true)
        try {
            let data = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${ searchWord }`)   
            data = data.data[0].meanings
            let temp = []
            for (let x of data) {
                for (let y of x.definitions) {
                    temp.push(y.definition)
                }
            }
            setMeanings(temp)
        } 
        catch (error) {
            setMeanings( [] )
            console.log(error)
        }
        setLoading(false)
    }


    useEffect( () => { 
        dictionaryApi()
        setSuggestions( trie.search( searchWord ).map( index => words[index] ) )
    }, [searchWord] )


    if (words.length === 0) {
        return ( 
        <div className = "loader-parent" >
            <div className= "loader" ></div>
        </div>
        )
    }

  return (
    <div className="App">
        <hr width = "100%" color = "black" />
        <div className = "title"> DICTIONARY - SEARCH </div>
        <hr width = "100%" color = "black" />
        <input className = "inputbox" type = "text" spellCheck = "false" placeholder = "Enter any word" value = { searchWord }  onChange = { e => { setSearchWord(e.target.value) }  } />
        { loading && <div className= "loader" ></div> }
        { !loading && searchWord && suggestions.length !== 0 && <Suggestions suggestions = { suggestions } setSearchWord = { setSearchWord } /> }
        { !loading && searchWord && <Meanings meanings = { meanings } /> } 
    </div>
  );
}

export default App;
