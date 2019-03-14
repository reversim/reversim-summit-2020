const cloudinaryPrefix = "https://res.cloudinary.com/dtltonc5g/image/upload/";

export const image = (url, width, height) => {
  if (isCloudinary(url)) {
    let scaleCode = `f_auto,fl_lossy,q_auto,c_thumb,h_${height},w_${width}/`;
    url = url.replace(cloudinaryPrefix, cloudinaryPrefix + scaleCode);
  }
  return url;
};

// checks if this is a cloudinary URL
function isCloudinary(url) {
  return url && url.startsWith(cloudinaryPrefix);
}
