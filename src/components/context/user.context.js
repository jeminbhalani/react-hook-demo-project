import {
  createContext,
  useEffect,
  useState,
} from 'react'
import axios from "axios";
export const UserContext = createContext(
  undefined,
)

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [open, setOpen] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [editData, setEditData] = useState()
  const [deleteID, setDeleteId] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get('http://localhost:3000/users');
        setUserData(response);
      } catch (error) {
        console.error("error", error.message);
      }
    }

    fetchData();

  }, [])

  const value = {
    userData,
    setUserData,
    open,
    setOpen,
    editData,
    setEditData,
    openDeleteModal,
    setOpenDeleteModal,
    deleteID,
    setDeleteId
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
