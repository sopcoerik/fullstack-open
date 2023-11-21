import { useDispatch, useSelector } from "react-redux"
import { change } from "../reducers/filterReducer"

export const Filter = () => {

  const filterValue = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleFilterInputValueChange = (e) => {
    dispatch(change(e.target.value))
  }

  return (
    <div>
      <label htmlFor="input">input</label>
      <input name="input" id="input" type="text" value={filterValue} onChange={handleFilterInputValueChange}/>
    </div>
  )
}