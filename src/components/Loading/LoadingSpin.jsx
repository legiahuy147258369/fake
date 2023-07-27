import HashLoader from 'react-spinners/HashLoader';
const LoadingSnip = () => {
    const style = { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 'z-index': '11111' };
    return (
        <div style={style}>
            <HashLoader color="#7843E6" />
        </div>
    );
};

export default LoadingSnip;