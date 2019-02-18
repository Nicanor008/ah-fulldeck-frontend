import uploader from '../assets/uploader';
import launchToast from './toaster';

const fileHandler = event => {
  const selectedFile = event.target.files[0];
  launchToast('Uploading Image....', 'toastSuccess', 'descSuccess', 'success');
  uploader({ image: selectedFile })
    .then(res => this.setState({ image_url: res.data.secure_url }))
    // eslint-disable-next-line no-console
    .catch(err => console.log(err.request));
};

export default fileHandler;
