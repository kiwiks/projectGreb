import e from 'express';
import React, { useRef, useEffect, useState } from 'react';

const url = 'https://bba8j8o9f1bqbkbqbda4.containers.yandexcloud.net/api/images/add';

export const AddPhoto = () => {
    const filePicker = useRef< HTMLInputElement >(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploaded, setUploaded] = useState(null);

    const handleChange = async (event : React.ChangeEvent<any>) => {
        console.log(event.target.files);
        setSelectedFile(event.target.files[0]);
       
        console.log(event.target.files[0]);
        //console.log(selectedFile);

        const files = event.target.files;
        const reader = new FileReader();
        
        reader.onload = async function (event) {
            const data = event.target?.result;
            //console.log(data);
            const response = await fetch(url, {
            method: 'POST',
            body: data
            }).then(response => response.text().then(result => console.log(result)));
        };
        reader.readAsDataURL(files[0]);

        

        //setUploaded(data);
    }

    /* console.log(event.target.files[0]);
        //console.log(selectedFile);

        const formData = new FormData();
        formData.append('file', event.target.files[0]);

        //console.log(formData);

        const res = await fetch(url, {
            method: 'POST', 
            body: formData,

        });   
        const data = await res.json();

        console.log(data)*/ 

        //сева

        /*const files = event.target.files;
        const reader = new FileReader();
        
        reader.onload = async function (event) {
            const data = event.target?.result;
            //console.log(data);
            const response = await fetch(url, {
            method: 'POST',
            body: data
            }).then(response => response.text().then(result => console.log(result)));
        };
        reader.readAsDataURL(files[0]);*/

    // const handleUpload = async (event : React.ChangeEvent<any>) => {
    //     if(!selectedFile) {
    //         alert("Выберите фото");
    //         return;
    //     }

    //     //console.log(setSelectedFile(event.target.files));

    //     console.log(selectedFile);

    //     const formData = new FormData();
    //     formData.append('file', selectedFile);

    //     console.log(formData);

    //     const res = await fetch(hostUrl, {
    //         method: 'POST', 
    //         body: formData,

    //     });   
    //     const data = await res.json();

    //     console.log(data)

    //     setUploaded(data);
    // }

    

    const handlePick = async (event: React.ChangeEvent<any>) => {
        if (filePicker && filePicker.current) {
            filePicker.current.click();
        }
        //console.log(document.getElementById('input-btn'))
        
    }
 
    return (
        <div>

            <button onClick={handlePick} id='btn'> Выбрать фото</button>
            
            <input
                type='file'
                name='buttonPick'
                className='hidden'
                multiple
                onChange={handleChange}
                ref={filePicker}
                accept=".png,"
                id='input-btn'
            />

            
            
            {uploaded && (
                <div>
                    <h2>{uploaded}</h2>
                    <img alt='' src={uploaded} width = "200"></img>
                </div>
            )}

        </div>

);

    
};

export default AddPhoto;

