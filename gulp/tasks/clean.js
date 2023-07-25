import del from 'del';
import {buildDir, config} from "./../config";

const clean = () => {
  return del(['./css/', './docs/', './js/', './pages/', './index.html']);
}

export default clean;
