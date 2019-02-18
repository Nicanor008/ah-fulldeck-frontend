const launchToast = (toastmessage, toastId, descId, status) => {
  const toast = document.getElementById(toastId);
  const desc = document.getElementById(descId);
  if (status === 'success') {
    toast.classList.add('show', 'toastSuccess');
    desc.innerHTML = toastmessage;
  } else if (status === 'fail') {
    toast.classList.add('show', 'toastFail');
    desc.innerHTML = toastmessage;
  }


  setTimeout(() => { toast.className = toast.className.replace('show', ''); }, 5000);
};
export default launchToast;
