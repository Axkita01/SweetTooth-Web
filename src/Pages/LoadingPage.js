import Spinner from "../Components/Spinner";

export default function LoadingPage() {
    return (
        <div style = {{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',width: '100vw', backgroundColor: '#FFDDDD'}}>
            <Spinner/>
        </div>
    );
}