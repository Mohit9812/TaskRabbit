'use client'
import React, { useState } from "react";
import axios from 'axios';

const ImageUploadForm: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');
    const [imagePath, setImagePath] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target);
        if (e.target.files && e.target.files.length > 0){
            setFile(e.target.files[0]);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setMessage('Please select a file to upload');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        try{
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            setMessage(response.data.message);
            setImagePath(response.data.path);
        }
        catch (err) {
            setMessage('File Upload failed')
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="">Select Image</label>
                <br />
                <input type='file' onChange={handleFileChange}/>
            </div>
            <button type="submit">Upload</button>
            {message && <p>{message}</p>}
            {imagePath && <img src={imagePath} alt='Uploaded Image'/>}
        </form>
    )
}

export default ImageUploadForm