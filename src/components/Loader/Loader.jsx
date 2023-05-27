//Компонент спінера відображається, доки відбувається завантаження зображень. 

import { ProgressBar } from  'react-loader-spinner';


export const Loader = () => {
    return (
        <ProgressBar
            height="90"
            width="90"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{
                position: 'fixed',
                top: '20%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
            wrapperClass="progress-bar-wrapper"
            borderColor = '#f4e02e'
            barColor = '#515dff'
        />
    );
  };