import { Textarea } from "flowbite-react"
import { useRef } from "react"

const AiQuiz = () => {

    const {ref} = useRef();
    const handle = (event) =>
    {
        event.preventDefault();
        console.log("HK: ", ref.current)
    }
    
    return (
        <div>
            <form ref={ref}>
            <Textarea name="text" className="rounded" type="text" placeholder="Quiz Text"></Textarea>
            <input name="subject" className="rounded" type="text" placeholder="Quiz Subject"></input>
            <input name="numberOfQuiz" className="rounded" type="text" placeholder="Number of Quiz"></input>
            <label for="cars">Choose a car:</label>

            <select name="options" id="cars">
                <option disabled value="volvo">Dificulty level</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Mercedes</option>
                <option value="Hard">Hard</option>
            </select>
            <button onClick ={handle} className="border rounded border-slate-950 px-4 py-2"  >Generate</button>
            </form>
        </div>
    )
}

export default AiQuiz