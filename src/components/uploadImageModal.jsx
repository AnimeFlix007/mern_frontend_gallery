import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Container } from '@mui/system';
import { Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllImages, uploadImage } from '../context/slices/gallery/gallerySlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UploadImageModal({ openModal, setOpenModal }) {
  const handleClose = () => setOpenModal(false);
  const [file, setFile] = React.useState(null)
  const dispatch = useDispatch()
  const { image, error, loading } = useSelector(store => store.gallery)
  const fileSelectedHandler = (e) => {
    setFile(e.target.files[0])
  }
  const fileUploadHandler = (e) => {
    e.preventDefault()
    const formdata = new FormData()
    if (!file) {
      return
    }
    formdata.append("image", file)
    dispatch(uploadImage(formdata))
    handleClose()
    setFile(null)
  }

  React.useEffect(() => {
    dispatch(getAllImages())
  }, [image])

  // console.log("--->",image,"///////////" ,file,"********",error);
  console.log("loading ", loading);
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload New Images
          </Typography>
          <Container>
            <form onSubmit={fileUploadHandler}>
              <Input type='file' onChange={fileSelectedHandler} />
              <button type='submit'>Upload</button>
            </form>
          </Container>
        </Box>
      </Modal>
    </div>
  );
}