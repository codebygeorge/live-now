import React, {useCallback, useContext, useState, useRef} from 'react';
import { Modal } from 'react-bootstrap';
import {useDropzone} from 'react-dropzone';
import Cropper from 'react-cropper';
import {
    STATIC_AVATAR_PATH,
    UPLOAD_IMAGES_PATH,
    IMAGE_MAX_SIZE,
    IMAGE_ACCEPTED_EXT,
    getAuthToken,
} from '../../utils';
import API, {catchAxiosError} from "../../utils/axiosEnv";
import UserContext from '../../components/UserContext';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

const cropperDefaultValue = {
    style: {height: 350, width: '100%'},
    minCropBoxWidth: 150,
    viewMode: 1,
    aspectRatio: 4 / 4,
    width: 30,
};

const selectMultiple = false;
const acceptedExtArray = IMAGE_ACCEPTED_EXT.split(',').map((item) => item.trim());

const ImageUpload = (props) => {

    const {userState, userDispatch} = useContext(UserContext);
    const [imageSrc, setImageSrc] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [blobik, setBlobik] = useState(null);

    const [submitted, setSubmitted] = useState(false);
    const [resError, setError] = useState('');

    const [fileError, setFileError] = useState('');

    const cropper = useRef(null);

    const resetCropper = () => {
        setImageSrc('');
    };

    const changeProfilePic = async (blob) => {
        const fd = new FormData();
        (blob) ? fd.append('profile_image', blob) : fd.append('profile_image', blob);
        fd.append('background_image', null);
        const {response, error} = await API
            .post('/account/uploadimage', fd,
                {
                    headers: {
                        'Authorization': 'Bearer ' + getAuthToken()
                    }
                }).catch(catchAxiosError);
        if (response) {
            console.log(response)
            // userState.photo = response.userState.photo;
            // userDispatch(userState);
            // setShowModal(false);
            // setError('');
        } else if (error) {
            console.log(error);
            // setError(error);
        }
    };

    const getDropZoneError = (currentFile) => {
        const {size, type} = currentFile;
        if (size > IMAGE_MAX_SIZE) {
            return `This file is not allowed. ${Math.floor(IMAGE_MAX_SIZE / 1000000)} MB is allowed`;
        }
        if (!acceptedExtArray.includes(type)) {
            return 'This file type is not allowed';
        }
        return 'Error occurred!';
    };

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles && acceptedFiles.length) {
            // Do something with the files
            const reader = new FileReader();

            reader.onload = () => {
                // Do whatever you want with the file contents
                // const binaryStr = reader.result;
                setImageSrc(reader.result);
                setShowModal(true);
            };
            reader.readAsDataURL(acceptedFiles[0]);
            setFileError('');
        } else if (rejectedFiles && rejectedFiles.length) {
            setFileError(getDropZoneError(rejectedFiles[0]));
        }
    }, [setImageSrc, setShowModal]);
    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        maxSize: IMAGE_MAX_SIZE,
        accept: acceptedExtArray,
        multiple: selectMultiple
    });

    const saveCroppedImage = async () => {
        if (submitted) return;

        setSubmitted(true);
        await cropper.current.getCroppedCanvas().toBlob(async (blob) => {
            await changeProfilePic(blob);
            setSubmitted(false);
        });
    };

    const deletePhoto = async () => {
        if (submitted) return;

        setSubmitted(true);
        await changeProfilePic();
        setSubmitted(false);
    };

    const handleClose = () => {
        setShowModal(false);
        resetCropper();
    };

    return (
        <>
            <div>
                <div>
                    <div
                        {...getRootProps()}
                    >
                        <Avatar alt={userState.name} src={userState.photo ? (UPLOAD_IMAGES_PATH + userState.photo) : STATIC_AVATAR_PATH} />
                    </div>
                    <button style={{backgroundColor: 'rgb(204, 204, 204)', color: 'wheat', cursor: 'initial'}}>Delete</button>
                    <input {...getInputProps()} id="avatarImg" />
                </div>
                <div >
                    <div>
                        <div >
                            <h4>{userState.name}</h4>
                        </div>
                        <p >{userState.email}</p>
                    </div>
                </div>
                <input type="file" onChange={(e) => setBlobik(e.target.files[0])} />
            </div>
            <h1 style={{marginTop: '10px'}}>{fileError}</h1>
            <Modal
                show={showModal}
                centered
                onHide={() => {
                    setError('');
                    setShowModal(false);
                }}
            >
                <Modal.Header closeButton closeLabel="">
                    <Modal.Title>Crop your Profile Image</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0">
                    {imageSrc
                    && <Cropper
                        ref={cropper}
                        src={imageSrc}
                        style={cropperDefaultValue.style}
                        minCropBoxWidth={cropperDefaultValue.minCropBoxWidth}
                        viewMode={cropperDefaultValue.viewMode}
                        aspectRatio={cropperDefaultValue.aspectRatio}
                        guides={false}
                    />}
                    <span>{resError}</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="outlined"
                        size="medium"
                        className="mt-0 mr-0"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                    <Button
                        variant="outlined"
                        size="medium"
                        className="mt-0"
                        onClick={saveCroppedImage}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ImageUpload;