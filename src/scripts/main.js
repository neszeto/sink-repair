import { SinkRepair } from "./SinkRepair.js"
import {fetchCompletions, fetchPlumbers, fetchRequests} from "./dataAccess.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    
    fetchRequests().then( //fetchRequests() has taken the external api and placed it in application State
        () => fetchPlumbers()//fetchPlumbers takes the external api and places it in application state
        ) 
        .then(
            () => fetchCompletions() //places completions in application state
        )
        .then(
            () => mainContainer.innerHTML = SinkRepair()// this function has the main html
        )
}
       
render()


mainContainer.addEventListener("stateChanged", CustomEvent => {
    console.log("State of data has changed. Regenerating HTML...")
    render()
   
})

