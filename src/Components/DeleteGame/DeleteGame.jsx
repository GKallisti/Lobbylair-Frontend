import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteGame, getAllGames } from "../../Redux/actions"

const DeleteGame = ({handleOnDelete})=>{    
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getAllGames())
    }, [])
    const allGames=useSelector(state=>state.games)

    const handleButton = (game)=>{
        const gameId=game.id
        dispatch(deleteGame(gameId))
        handleOnDelete()
    }


    return(<div>
        {allGames.map(game=>{
            return(

                <div>
                <ul>
                    <li>
                        <label htmlFor="Game name">{game.name}</label><button onClick={()=>handleButton(game)} className='ml-6 text-red-700'> Delete</button>
                    </li>
                </ul>
            </div>
            )
        })}
        
    </div>)
}

export default DeleteGame