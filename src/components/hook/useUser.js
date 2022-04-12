import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../context/user.context'

export function useUser() {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  const { userData, setUserData, open, setOpen, editData, setEditData, openDeleteModal, setOpenDeleteModal,deleteID,setDeleteId } = context


  const fetchUserData = () => {
    axios.get("http://localhost:3000/users").then(resp => {
      setUserData(resp.data)
    })
  }

  const deleteData = () => {
    axios.delete(`http://localhost:3000/users/${deleteID}`).then(fetchUserData)
    setOpenDeleteModal(false)
  }

  const handleClose = () => {
    setOpen(false)
    setOpenDeleteModal(false)
  }
  const handleOpen = (id) => {
    setOpen(true)
    setEditData(userData.find(i => i.id === id))
  }

  const deleteModalOpen = (id) => {
    setOpenDeleteModal(true)
    setDeleteId(id)
  }

  const editUserData = (payload) => {
    axios.put(`http://localhost:3000/users/${payload.id}`, payload).then(fetchUserData)
    setOpen(false)
  }

  const addUserData = (payload) => {
    axios.post("http://localhost:3000/users", payload).then(fetchUserData)
    setOpen(false)
  }

  return {
    userData, setUserData, deleteData, handleClose, open, setOpen, handleOpen, editData,
    setEditData, editUserData, addUserData, openDeleteModal, setOpenDeleteModal, deleteModalOpen
  }
}
