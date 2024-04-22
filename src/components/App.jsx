import { getImages } from "ApiService";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import appStyle from './style.module.css'
import { Modal } from "./Modal/Modal";
import { useEffect, useState } from "react";


const App = () => {
  
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [query, setQuery] = useState('');
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
  
    if (query === '') {
      return
    };

    async function searchImages() {

     setLoading(true);
    
    try {
      const response = await getImages(query, page);
    
      setImages(prevImages => [...prevImages, ...response.hits])
      setShowBtn(page < Math.ceil(response.totalHits / 12))
      
     } catch (error) {
      console.error('Error fetching images:', error);
      
     } finally {
       setLoading(false);
     }
    };

    searchImages()
}, [query, page])


  const loadMoreImages = (page) => {
    setPage(prevPage => page = prevPage + 1 );
  };

  const openModal = (imageUrl) => {
    setModalOpen(true);
    setSelectedImage(imageUrl)
  };
    

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage('')
  };
  

  const submitHandler = (query) => {
    setImages([]);
    setPage(1);
    setQuery(query)
  };

  return (
      <div className={appStyle.appDiv}>
        <Searchbar onSubmit={submitHandler} />
        {loading && <Loader />}
        <ImageGallery images={images} openModal={openModal} />
        {showBtn && (
          <Button onLoadMore={loadMoreImages} hasMore={!loading} />
        )}
        {modalOpen && <Modal
          isOpen={modalOpen}
          closeModal={closeModal}
          imageUrl={selectedImage}
        />}
      </div>
    )
};
export default App
