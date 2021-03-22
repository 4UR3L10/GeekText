import Spinner from 'react-bootstrap/Spinner';

function LoadingPage() {
    return (
        <div style={{ height: "200px" }}>
            <Spinner style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "200px",
                display: "block",
                width: "270px",
                height: "270px"
            }} animation="border" />
        </div>
    );
}

export default LoadingPage;