import React, { useEffect, useState } from "react";
import { AddPhoto } from './AddPhoto';
import axios from 'axios';
//import { response } from "express";
//import { error } from "console";
import { Fancybox } from '@fancyapps/ui/';
import '@fancyapps/ui/dist/fancybox/fancybox.css'; 


const App = () => {
  const [photos, setPhotos]  = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(true)
  const [totalCount,setTotalCount] = useState<any>(0)


  useEffect( () => {
    if(fetching) {
      console.log("fetching")
      axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=30&_page=${currentPage}`)
      .then(response => {
        setPhotos( [...photos, ...response.data] )
        setCurrentPage(prevState => prevState + 1)
        setTotalCount(response.headers['x-total-count'])
      })
      .finally(() => setFetching(false));
      
    } 
  }, [fetching])
 
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler)
    
    return function() {
      document.removeEventListener("scroll", scrollHandler);
    }
  }, [])

  const scrollHandler = (event: any) => {
    if(event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 100 ) {
      //console.log("photos.length",  photos.length, "totalCount", totalCount)   /* || photos.length < totalCount*/
      setFetching(true)
      console.log("scroll")
    }
    
  }

  //увеличение картинки при клике
  function openPhoto(photo: { [x: string]: string | undefined; }) {
    Fancybox.bind('[data-fancybox="gallery"]', { // .bind метод запуска с настраиваемыми параметрами при клике на элемент

      
      
    contentClick: "iterateZoom",
    Images: {
    // Отключить/включить анимацию при открытии картинки

     Panzoom: {
        maxScale: 3,
      }
    },

    keyboard: {
      Escape: "close",
      Delete: "close",
      Backspace: "close",
      PageUp: "next",
      PageDown: "prev",
      ArrowUp: "prev",
      ArrowDown: "next",
      ArrowRight: "next",
      ArrowLeft: "prev",
    }


  });
};

  return (
  <div id="photo">
       <AddPhoto />
       
       <div>
        {photos.map((photo: { [x: string]: string | undefined; }) =>   
                <img 
                  data-fancybox="gallery" 
                  data-caption = {photo['title']}
                  src={photo['thumbnailUrl']} 
                  alt="" 
                  onClick={() => openPhoto(photo)} 
                  key={photo['id']}
                  title = {photo['title']}      
                />        
        )}
      </div>
  </div>
  );
};

export default App; 